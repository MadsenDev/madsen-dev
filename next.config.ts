import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // prevent memory-heavy linting on build servers
    ignoreDuringBuilds: true,
  },
  typescript: {
    // skip type-checking in production builds (do it locally/CI instead)
    ignoreBuildErrors: true,
  },
};

export default nextConfig;