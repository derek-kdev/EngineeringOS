// apps/web/next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
    ],
    qualities: [100, 75], // ✅ Allow quality 100 in addition to default 75
  },
};

export default nextConfig;