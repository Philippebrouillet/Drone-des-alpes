import { APP_NAME } from "@/lib/constant";
import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${APP_NAME} - Nettoyage par Drone`,
    short_name: `${APP_NAME}`,
    description:
      "Expert en nettoyage par drone en Rhône-Alpes et en Suisse. Toiture, façade, panneaux solaires.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0070f3",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
