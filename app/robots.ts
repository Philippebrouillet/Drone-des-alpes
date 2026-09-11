import { prodUrl } from "@/lib/constant";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Ne jamais bloquer /_next/static/ ni /_next/image/ :
        // Google a besoin du CSS, du JS et des images pour rendre et indexer les pages.
        disallow: ["/api/", "/admin/"],
      },
    ],

    sitemap: `${prodUrl}/sitemap.xml`,
    host: prodUrl,
  };
}
