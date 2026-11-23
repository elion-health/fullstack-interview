import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    // The Webpack production build must preserve MikroORM entity class names.
    serverMinification: false,
  },
};

export default nextConfig;
