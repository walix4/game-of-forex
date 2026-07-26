import type { NextConfig } from "next";

// Static export so the mockup can be hosted on GitHub Pages.
// DEPLOY_TARGET=pages adds the project-page basePath (walix4.github.io/game-of-forex).
const isPages = process.env.DEPLOY_TARGET === "pages";
const basePath = isPages ? "/game-of-forex" : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: basePath || undefined,
  env: {
    // Single source of truth for asset prefixing (lib/asset.ts, lib/image-loader.ts).
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    // Static export has no image server; the custom loader keeps basePath on
    // local srcs (plain `unoptimized` would drop it — images 404 on Pages).
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
  },
};

export default nextConfig;
