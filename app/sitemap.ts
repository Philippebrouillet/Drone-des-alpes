import { MetadataRoute } from "next";
import { prodUrl, Services } from "@/lib/constant";
import { formatHrefService } from "@/lib/services/services";
import {
  cityCoordinates,
  formatCityUrl,
} from "@/lib/services/interventionZone";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = prodUrl;
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() - 2);

  // Pages statiques principales
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/politique-de-confidentialite`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
  ];

  // Pages de prestations dynamiques
  const servicePages = Object.values(Services).map((service) => ({
    url: `${baseUrl}${formatHrefService(service)}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Pages de villes (SEO local)
  const cityPages = Object.keys(cityCoordinates).map((city) => ({
    url: `${baseUrl}/villes/${formatCityUrl(city)}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...cityPages];
}
