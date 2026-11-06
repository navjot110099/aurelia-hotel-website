import NextImage, { type ImageProps } from "next/image";
import { BLUR } from "@/lib/image-manifest";

/**
 * Drop-in replacement for `next/image` that automatically attaches a
 * base64 blur-up placeholder for any local image present in the generated
 * image manifest. Every call site keeps its existing props (fill / width /
 * height / sizes / priority …); this wrapper only fills in
 * `placeholder="blur"` + `blurDataURL` when it can, and is otherwise a
 * transparent pass-through.
 *
 * It is a server-compatible component (no hooks / state), so it can be used
 * from both server and client components exactly like next/image.
 */
export default function Image(props: ImageProps) {
  const { src, placeholder } = props;

  if (typeof src === "string" && placeholder === undefined) {
    const blurDataURL = BLUR[src];
    if (blurDataURL) {
      return <NextImage {...props} placeholder="blur" blurDataURL={blurDataURL} />;
    }
  }

  return <NextImage {...props} />;
}
