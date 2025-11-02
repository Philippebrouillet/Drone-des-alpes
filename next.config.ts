import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    qualities: [70, 70, 70, 75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
        pathname: "/api/portraits/**",
      },
    ],
  },
};

export default nextConfig;
