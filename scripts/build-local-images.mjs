/**
 * AURELIA — local image builder.
 *
 * Downloads each photograph listed in `image-sources.mjs` once, optimises it
 * with sharp into `public/images/`, derives the hero still + social card, and
 * emits:
 *   - src/lib/image-manifest.ts   (intrinsic width/height + blur placeholder)
 *   - public/images/CREDITS.md    (documented sources + license)
 *
 * Run with:  node scripts/build-local-images.mjs
 * Idempotent — safe to re-run. Requires network access to images.unsplash.com.
 */

import sharp from "sharp";
import { mkdir, writeFile, readFile, access } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  SOURCES,
  UNSPLASH_PARAMS,
  MASTER_MAX_WIDTH,
  MASTER_QUALITY,
  HERO_STILL_FROM,
  OG_FROM,
} from "./image-sources.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const IMAGES_DIR = resolve(ROOT, "public/images");
const CACHE_DIR = resolve(__dirname, ".cache");
const MANIFEST_PATH = resolve(ROOT, "src/lib/image-manifest.ts");
const CREDITS_PATH = resolve(IMAGES_DIR, "CREDITS.md");

const CONCURRENCY = 6;

const exists = (p) => access(p).then(() => true).catch(() => false);

/**
 * Fetch an Unsplash master as a Buffer, caching the raw download under
 * scripts/.cache (gitignored) so re-runs don't hit the network.
 */
async function fetchMaster(id) {
  const cached = resolve(CACHE_DIR, `${id}.bin`);
  if (await exists(cached)) return readFile(cached);

  const url = `https://images.unsplash.com/${id}?${UNSPLASH_PARAMS}`;
  let lastErr;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": "aurelia-image-builder" },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      await writeFile(cached, buf);
      return buf;
    } catch (err) {
      lastErr = err;
      await new Promise((r) => setTimeout(r, attempt * 800));
    }
  }
  throw new Error(`Failed to fetch ${id}: ${lastErr?.message}`);
}

/** A tiny, blurred JPEG data URL for use as a next/image blur placeholder. */
async function makeBlurDataURL(buffer) {
  const tiny = await sharp(buffer)
    .resize(20, 20, { fit: "inside" })
    .jpeg({ quality: 40 })
    .toBuffer();
  return `data:image/jpeg;base64,${tiny.toString("base64")}`;
}

/** Optimise a master buffer to a committed JPEG + return {width,height,blur}. */
async function writeOptimised(buffer, file) {
  const pipeline = sharp(buffer)
    .rotate()
    .resize({ width: MASTER_MAX_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: MASTER_QUALITY, mozjpeg: true, progressive: true });
  const out = await pipeline.toBuffer({ resolveWithObject: true });
  await writeFile(resolve(IMAGES_DIR, file), out.data);
  const blur = await makeBlurDataURL(out.data);
  return { width: out.info.width, height: out.info.height, blur };
}

async function run() {
  await mkdir(IMAGES_DIR, { recursive: true });
  await mkdir(CACHE_DIR, { recursive: true });
  console.log(`Building ${SOURCES.length} images into public/images …\n`);

  const manifest = {}; // "/images/x.jpg" -> { width, height, blur }
  const masters = new Map(); // id -> master buffer (for derived assets)

  // Download + optimise in small batches to stay polite to the CDN.
  for (let i = 0; i < SOURCES.length; i += CONCURRENCY) {
    const batch = SOURCES.slice(i, i + CONCURRENCY);
    await Promise.all(
      batch.map(async ({ id, file }) => {
        const master = await fetchMaster(id);
        masters.set(id, master);
        const meta = await writeOptimised(master, file);
        manifest[`/images/${file}`] = meta;
        console.log(`  ✓ ${file}  (${meta.width}×${meta.height})`);
      })
    );
  }

  // --- Derived: darkened hero still (keeps the overlaid headline legible). ---
  {
    const base = masters.get(HERO_STILL_FROM) ?? (await fetchMaster(HERO_STILL_FROM));
    const resized = await sharp(base)
      .rotate()
      .resize({ width: 1920, withoutEnlargement: true })
      .modulate({ brightness: 0.52, saturation: 0.85 })
      .tint({ r: 150, g: 180, b: 190 })
      .jpeg({ quality: 70, mozjpeg: true, progressive: true })
      .toBuffer({ resolveWithObject: true });
    await writeFile(resolve(IMAGES_DIR, "hero-still.jpg"), resized.data);
    manifest["/images/hero-still.jpg"] = {
      width: resized.info.width,
      height: resized.info.height,
      blur: await makeBlurDataURL(resized.data),
    };
    console.log(`  ✓ hero-still.jpg  (${resized.info.width}×${resized.info.height})`);
  }

  // --- Derived: 1200×630 social share card with wordmark overlay. ---
  {
    const base = masters.get(OG_FROM) ?? (await fetchMaster(OG_FROM));
    const bg = await sharp(base)
      .rotate()
      .resize(1200, 630, { fit: "cover", position: "centre" })
      .modulate({ brightness: 0.55 })
      .toBuffer();
    const overlay = Buffer.from(
      `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#0a0e12" stop-opacity="0.15"/>
            <stop offset="100%" stop-color="#0a0e12" stop-opacity="0.75"/>
          </linearGradient>
        </defs>
        <rect width="1200" height="630" fill="url(#g)"/>
        <text x="600" y="300" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif"
              font-size="128" letter-spacing="14" fill="#f3ead8">AURELIA</text>
        <text x="600" y="360" text-anchor="middle" font-family="Georgia, serif"
              font-size="26" letter-spacing="8" fill="#c9a961">PRIVATE ISLAND RESERVE</text>
        <text x="600" y="430" text-anchor="middle" font-family="Georgia, serif"
              font-style="italic" font-size="30" fill="#e8ddca" opacity="0.9">Where the horizon belongs to you.</text>
      </svg>`
    );
    await sharp(bg)
      .composite([{ input: overlay, top: 0, left: 0 }])
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(resolve(ROOT, "public/og.jpg"));
    console.log(`  ✓ public/og.jpg  (1200×630)`);
  }

  // --- Emit the typed manifest. ---
  const entries = Object.keys(manifest)
    .sort()
    .map((k) => {
      const m = manifest[k];
      return `  ${JSON.stringify(k)}: { width: ${m.width}, height: ${m.height}, blurDataURL: ${JSON.stringify(m.blur)} },`;
    })
    .join("\n");

  const ts = `/**
 * AUTO-GENERATED by scripts/build-local-images.mjs — do not edit by hand.
 *
 * Intrinsic dimensions + base64 blur placeholders for every local image,
 * keyed by its public path. Consumed by the <SmartImage> wrapper so that
 * next/image renders every photo with a width/height and a blur-up.
 */

export type ImageMeta = { width: number; height: number; blurDataURL: string };

export const IMAGES: Record<string, ImageMeta> = {
${entries}
};

/** blurDataURL by public path (convenience accessor for <SmartImage>). */
export const BLUR: Record<string, string> = Object.fromEntries(
  Object.entries(IMAGES).map(([k, v]) => [k, v.blurDataURL])
);
`;
  await writeFile(MANIFEST_PATH, ts);
  console.log(`\n  ✓ ${MANIFEST_PATH.replace(ROOT + "/", "")}`);

  // --- Emit CREDITS.md documenting every source. ---
  const rows = SOURCES.map(
    ({ id, file, credit }) =>
      `| \`${file}\` | ${credit} | [${id}](https://unsplash.com/photos/${id}) |`
  ).join("\n");
  const credits = `# Image credits

All photography in AURELIA is sourced from [Unsplash](https://unsplash.com) under the
[Unsplash License](https://unsplash.com/license) (free to use, no attribution required).
Each file below was downloaded once, optimised with \`sharp\` and committed locally so the
site has no runtime dependency on a remote image CDN.

Regenerate with:

\`\`\`bash
node scripts/build-local-images.mjs
\`\`\`

| File | Description | Source |
| --- | --- | --- |
${rows}

**Derived assets** (built from the masters above, not separate downloads):

- \`hero-still.jpg\` — darkened seascape, static hero fallback for reduced-motion / low-power devices.
- \`../og.png\` — 1200×630 social share card with the AURELIA wordmark.
`;
  await writeFile(CREDITS_PATH, credits);
  console.log(`  ✓ ${CREDITS_PATH.replace(ROOT + "/", "")}`);
  console.log(`\nDone. ${Object.keys(manifest).length} images in the manifest.`);
}

run().catch((err) => {
  console.error("\n✗ build-local-images failed:", err);
  process.exit(1);
});
