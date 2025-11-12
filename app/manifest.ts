import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Drone des Alpes - Nettoyage par Drone",
    short_name: "Drone des Alpes",
    description:
      "Expert en nettoyage par drone en Rhône-Alpes. Toiture, façade, panneaux solaires.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0070f3",
    icons: [
      {
        src: "/logo.jpg",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
