/**
 * Custom next/image loader for static export. `unoptimized: true` bypasses the
 * loader entirely and drops the basePath, so on GitHub Pages (/game-of-forex)
 * every local image 404s. This loader re-applies the prefix at build time.
 */
export default function imageLoader({ src }: { src: string }) {
  // External URLs pass through untouched.
  if (src.startsWith("http")) return src;
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}`;
}
