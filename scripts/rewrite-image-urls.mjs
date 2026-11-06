/**
 * AURELIA — one-shot codemod: remote Unsplash URLs -> local image paths.
 *
 * For every source file under src/, replaces each
 *   https://images.unsplash.com/<id>?<any-params>
 * with the committed local path  /images/<file>  (from image-sources.mjs),
 * and swaps `next/image` default imports for the <SmartImage> blur wrapper.
 *
 * Run AFTER scripts/build-local-images.mjs:  node scripts/rewrite-image-urls.mjs
 */

import { readFile, writeFile, readdir } from "node:fs/promises";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
import { SOURCES } from "./image-sources.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC_DIR = resolve(__dirname, "../src");

/** id -> /images/<file> */
const MAP = new Map(SOURCES.map((s) => [s.id, `/images/${s.file}`]));

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (/\.(tsx?|jsx?)$/.test(entry.name)) yield full;
  }
}

let filesChanged = 0;
let urlsReplaced = 0;
let importsSwapped = 0;
const unmatched = new Set();

for await (const file of walk(SRC_DIR)) {
  let text = await readFile(file, "utf8");
  const before = text;

  // 1) Replace every Unsplash URL (any width/quality variant) with its local path.
  text = text.replace(
    /https:\/\/images\.unsplash\.com\/(photo-[0-9]+-[a-z0-9]+)[^"'`)\s]*/g,
    (full, id) => {
      const local = MAP.get(id);
      if (!local) {
        unmatched.add(id);
        return full;
      }
      urlsReplaced++;
      return local;
    }
  );

  // 2) Swap the next/image default import for the SmartImage blur wrapper.
  //    (SmartImage itself is the only file that should import next/image.)
  if (!file.endsWith(join("ui", "SmartImage.tsx"))) {
    text = text.replace(
      /^(\s*)import\s+Image\s+from\s+["']next\/image["'];?/m,
      (_m, indent) => {
        importsSwapped++;
        return `${indent}import Image from "@/components/ui/SmartImage";`;
      }
    );
  }

  if (text !== before) {
    await writeFile(file, text);
    filesChanged++;
  }
}

console.log(`Files changed:    ${filesChanged}`);
console.log(`URLs localised:   ${urlsReplaced}`);
console.log(`Imports swapped:  ${importsSwapped}`);
if (unmatched.size) {
  console.log(`\n⚠ Unmatched Unsplash ids (left untouched):`);
  for (const id of unmatched) console.log(`   ${id}`);
  process.exitCode = 1;
}
