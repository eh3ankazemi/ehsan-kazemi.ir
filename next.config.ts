import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // OpenNext needs the standalone server output. GitHub Pages sets STATIC_EXPORT
  // to keep producing the static `out` directory used by that workflow.
  output: process.env.STATIC_EXPORT === "1" ? "export" : "standalone",
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
  reactStrictMode: true,
}

export default nextConfig
