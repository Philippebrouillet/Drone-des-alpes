import { APP_NAME, Services } from "../constant";

export const formatHrefService = (service: Services) => {
  return `/prestation/${service
    .replace(/\s+/g, "-")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[ç]/g, "c")}`;
};

export const serviceLinks = Object.values(Services).map((service) => ({
  name: service,
  href: formatHrefService(service),
}));

export interface PrestationData {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  sections: {
    title: string;
    content: string;
    list?: string[];
  }[];
  advantages: string[];
}

export const prestationsData: Record<string, PrestationData> = {
  "nettoyage-de-toiture": {
    title: "Nettoyage de toiture par drone",
    subtitle: "Rapide, économique et écologique",
    description: `Souvent repoussé, le nettoyage de la toiture est pourtant essentiel à la longévité de votre maison. Avec ${APP_NAME}, profitez d'un nettoyage par drone plus rapide, moins coûteux et respectueux de l'environnement, aussi bien pour les particuliers que pour les professionnels.`,
    image: "/Nettoyage toiture.jpg",
    sections: [
      {
        title: "Pourquoi entretenir sa toiture régulièrement ?",
        content:
          "Votre toiture protège votre maison des intempéries. Sans entretien, la mousse et les lichens favorisent les infiltrations d'eau, la dégradation de la charpente, et diminuent les performances énergétiques de votre logement. Un toit propre, c'est aussi une valeur ajoutée pour votre bien immobilier.",
      },
      {
        title: "À quelle fréquence nettoyer son toit ?",
        content: "La fréquence dépend de plusieurs facteurs :",
        list: [
          "Le type de tuiles (terre cuite, ardoise, béton…)",
          "Le climat local",
          "L'exposition à l'humidité et à l'ombre",
        ],
      },
      {
        title: "Quelle est la meilleure saison ?",
        content: "Le printemps et l'automne sont les périodes idéales :",
        list: [
          "Au printemps, pour réparer les dégâts de l'hiver",
          "À l'automne, pour préparer le toit avant le froid et l'humidité",
        ],
      },
    ],
    advantages: [
      "Plus sûr et sans risque de casse",
      "Plus rapide que les méthodes traditionnelles",
      "Plus précis grâce à la technologie drone",
      "Respectueux de l'environnement",
    ],
  },
  "nettoyage-de-facade": {
    title: "Nettoyage de façade par drone",
    subtitle: "Protégez et sublimez votre maison par la voie des airs",
    description: `Avec le temps, la pollution, les intempéries et les mousses ternissent vos murs extérieurs et fragilisent vos revêtements. Grâce à la technologie drone, ${APP_NAME} propose un nettoyage de façade rapide, précis et sans échafaudage, pour redonner à votre maison tout son éclat tout en la protégeant durablement.`,
    image: "/Nettoyage facade.jpg",
    sections: [
      {
        title: "Pourquoi nettoyer sa façade ?",
        content: "Entretenir vos murs extérieurs est essentiel pour :",
        list: [
          "Préserver la solidité de vos façades face aux agressions extérieures (pluie, gel, pollution, lichens)",
          "Maintenir l'esthétique de votre logement",
          "Éviter les réparations coûteuses à long terme",
        ],
      },
      {
        title: "Valorisez votre maison",
        content:
          "Une façade propre améliore l'apparence générale de votre habitation et renforce sa valeur sur le marché immobilier. Que vous souhaitiez vendre ou simplement entretenir votre bien, un nettoyage par drone offre un résultat uniforme, rapide et à moindre coût.",
      },
      {
        title: "Le nettoyage par drone : la solution moderne et sûre",
        content:
          "Nos drones pulvérisent avec précision des solutions biodégradables et professionnelles, sans contact direct avec les murs. Résultat : un nettoyage homogène, sans risque pour votre façade, et sans avoir besoin d'échelle ou d'échafaudage.",
      },
    ],
    advantages: [
      "Aucune montée sur les murs",
      "Intervention rapide et sécurisée",
      "Coût réduit par rapport aux méthodes traditionnelles",
      "Respect de l'environnement",
      "Finition homogène et durable",
    ],
  },
  "nettoyage-de-panneaux-solaires": {
    title: "Nettoyage de panneaux solaires par drone",
    subtitle: "Optimisez le rendement de votre installation",
    description: `Vos panneaux solaires sont un investissement important et leur performance dépend directement de leur propreté. La poussière, les feuilles, la pollution ou les dépôts de pollen peuvent réduire leur rendement jusqu'à 20 %. ${APP_NAME} propose un nettoyage par drone rapide, précis et sécurisé, même sur des installations difficiles d'accès ou en hauteur.`,
    image: "/Nettoyage panneaux solaire.jpg",
    sections: [
      {
        title: "Pourquoi nettoyer régulièrement vos panneaux solaires ?",
        content:
          "Nos drones pulvérisent des solutions adaptées et biodégradables, assurant un nettoyage efficace sans risque pour vos panneaux ni pour votre toiture. Entretenir régulièrement vos panneaux solaires permet de maximiser votre production d'énergie, d'allonger leur durée de vie et d'éviter des réparations coûteuses.",
      },
    ],
    advantages: [
      "Performance optimale des panneaux grâce à une surface parfaitement propre",
      "Intervention rapide et sécurisée, sans échafaudage ni danger",
      "Respect des matériaux et des joints grâce à une méthode douce et précise",
      "Solution écologique utilisant des produits biodégradables",
      "Maximisation de votre production d'énergie",
    ],
  },
  "nettoyage-de-gouttieres": {
    title: "Nettoyage de gouttières",
    subtitle: "Prévention et protection de votre habitation",
    description:
      "Des gouttières encrassées ou bouchées peuvent provoquer des infiltrations, des dégâts sur la façade et des problèmes d'humidité dans votre maison. Les feuilles, mousses et débris s'accumulent rapidement, surtout en automne ou après de fortes pluies.",
    image: "/Nettoyage gouttières.jpg",
    sections: [
      {
        title: "Notre méthode professionnelle",
        content: `${APP_NAME} intervient avec un aspirateur à gouttière professionnel, vous évitant ainsi de monter sur votre toit et de prendre des risques inutiles. Cette méthode est rapide, sûre et efficace, adaptée à tous les types de gouttières, qu'elles soient hautes ou difficiles d'accès.`,
      },
      {
        title: "Protection durable",
        content: `Entretenir vos gouttières régulièrement permet de protéger votre toiture et vos façades, et d'éviter des réparations coûteuses. Faites confiance à ${APP_NAME} pour un service fiable et efficace, sans effort de votre part.`,
      },
    ],
    advantages: [
      "Élimination complète des débris, mousses et feuilles",
      "Prévention des infiltrations et des dommages structurels",
      "Intervention rapide et sécurisée, sans risque",
      "Maintenance régulière pour prolonger la durée de vie",
      "Protection de votre toiture et de vos façades",
    ],
  },
  "nettoyage-batiments": {
    title: "Nettoyage de bâtiments par drone",
    subtitle: "Solution professionnelle pour tous types de structures",
    description: `Chez ${APP_NAME}, nous assurons le nettoyage professionnel de tous types de bâtiments : toitures, façades, bardages, terrasses et panneaux solaires, mais aussi sites complexes, monuments historiques, ponts ou statues. Notre technologie par drone permet d'accéder à toutes les surfaces, même les plus difficiles d'accès, rapidement et en toute sécurité.`,
    image: "/Nettoyage facade.jpg",
    sections: [
      {
        title: "Polyvalence et expertise",
        content:
          "Nos drones utilisent des pulvérisations adaptées à chaque matériau (zinc, ardoise, béton, brique, verre, métal, PVC), garantissant un nettoyage précis et en profondeur sans risque d'endommager vos structures.",
      },
      {
        title: "Intervention professionnelle",
        content: `Pour un nettoyage sûr, rapide et performant de tous vos bâtiments, classiques ou exceptionnels, demandez dès maintenant votre devis gratuit avec ${APP_NAME}.`,
      },
    ],
    advantages: [
      "Sécurité maximale : opérations contrôlées depuis le sol",
      "Rapidité : jusqu'à 5 fois plus rapide qu'un nettoyage traditionnel",
      "Polyvalence totale : bâtiments industriels, monuments, ponts, statues",
      "Impact minimal sur vos activités",
      "Adapté à tous les matériaux",
    ],
  },
};

export function getPrestationByKey(slug: string): PrestationData | null {
  return prestationsData[slug] || null;
}
