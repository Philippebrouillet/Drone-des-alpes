import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    formats: ["image/avif", "image/webp"], // Formats modernes pour de meilleures performances
  },

  // Compression pour améliorer les performances
  compress: true,

  // Génération de pages statiques pour un meilleur SEO
  output: "standalone",

  // Ancienne prestation « panneaux solaires », remplacée par le nettoyage
  // de bâtiment industriel : on conserve le référencement de l'URL indexée
  async redirects() {
    return [
      {
        source: "/prestation/nettoyage-de-panneaux-solaires",
        destination: "/prestation/nettoyage-de-batiment-industriel",
        permanent: true,
      },
    ];
  },

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
