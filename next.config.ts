import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    qualities: [70, 70, 70, 75, 90],
    formats: ["image/avif", "image/webp"], // Formats modernes pour de meilleures performances
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
        pathname: "/api/portraits/**",
      },
    ],
  },

  // Compression pour améliorer les performances
  compress: true,

  // Génération de pages statiques pour un meilleur SEO
  output: "standalone",

  // Headers pour la sécurité et le SEO
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
