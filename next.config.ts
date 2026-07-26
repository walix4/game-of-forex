import type { NextConfig } from "next";

// Static export so the mockup can be hosted on GitHub Pages.
// DEPLOY_TARGET=pages adds the project-page basePath (walix4.github.io/game-of-forex).
const isPages = process.env.DEPLOY_TARGET === "pages";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isPages ? "/game-of-forex" : undefined,
  images: {
    // next/image optimization needs a server; Pages is static-only.
    unoptimized: true,
  },
};

export default nextConfig;
