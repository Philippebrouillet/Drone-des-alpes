import { MetadataRoute } from "next";
import { prodUrl } from "@/lib/constant";
import { allPrestationLinks } from "@/lib/services/services";
import {
  cityCoordinates,
  formatCityUrl,
} from "@/lib/services/interventionZone";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = prodUrl;
  // Pages statiques principales
  const staticPages = [
    {
      url: baseUrl,
      changeFrequency: "monthly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/faq`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ];
  const servicePages = allPrestationLinks.map(({ href }) => ({
    url: `${baseUrl}${href}`,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  // Pages de villes (SEO local)
  const cityPages = Object.keys(cityCoordinates).map((city) => ({
    url: `${baseUrl}/villes/${formatCityUrl(city)}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...cityPages];
}
