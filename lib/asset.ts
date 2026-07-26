/**
 * Prefix a /public asset path with the deploy basePath (GitHub Pages serves the
 * site under /game-of-forex). For plain <img>/CSS uses that bypass next/image.
 * NEXT_PUBLIC_BASE_PATH is inlined at build time (see next.config.ts).
 */
export const asset = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
