import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure Turbopack uses this folder as the root to avoid lockfile detection warnings
  turbopack: {
    root: '.'
  }
};

export default nextConfig;
