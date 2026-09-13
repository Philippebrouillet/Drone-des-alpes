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

/** Une comparaison avant/après affichée par le comparateur à curseur. */
export interface BeforeAfterComparison {
  caption: string;
  /** largeur / hauteur des photos : 3 / 4 en portrait, 4 / 3 en paysage. */
  ratio: number;
  beforeImage: string;
  beforeAlt: string;
  afterImage: string;
  afterAlt: string;
}

/** Vidéo d'intervention, affichée sous les comparaisons. */
export interface PrestationVideo {
  /** Fichier dans public/. Privilégier le .mp4 (H.264), lu par tous les navigateurs. */
  src: string;
  /** Image affichée avant lecture, fortement recommandée. */
  poster?: string;
  caption?: string;
}

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
  /** Comparaisons avant/après propres à la prestation (section masquée si absent). */
  comparisons?: BeforeAfterComparison[];
  /** Vidéo de l'intervention (bloc masqué si absent). */
  video?: PrestationVideo;
}

// Pour afficher une vidéo sur une prestation, ajouter à son entrée :
//   video: {
//     src: "/nettoyage-facade.mp4",      // MP4 H.264 dans public/ (pas de .MOV ni de HEVC)
//     poster: "/nettoyage-facade-poster.jpg",
//     caption: "Nettoyage de façade par drone, en conditions réelles",
//   },
export const prestationsData: Record<string, PrestationData> = {
  "nettoyage-de-toiture": {
    title: "Nettoyage de toiture",
    subtitle: "Rapide, économique et écologique",
    description: `Souvent repoussé, le nettoyage de la toiture est pourtant essentiel à la longévité de votre maison. Avec ${APP_NAME}, profitez d'un nettoyage par drone plus rapide, moins coûteux et respectueux de l'environnement, aussi bien pour les particuliers que pour les professionnels.`,
    image: "/nettoyage-toiture.jpg",
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
    video: {
      src: "/nettoyage-toiture.mp4",
      poster: "/nettoyage-toiture-poster.jpg",
      caption: "Nettoyage de toiture par drone, en conditions réelles",
    },
  },
  "nettoyage-de-facade": {
    title: "Nettoyage de façade",
    subtitle: "Protégez et sublimez votre maison par la voie des airs",
    description: `Avec le temps, la pollution, les intempéries et les mousses ternissent vos murs extérieurs et fragilisent vos revêtements. Grâce à la technologie drone, ${APP_NAME} propose un nettoyage de façade rapide, précis et sans échafaudage, pour redonner à votre maison tout son éclat tout en la protégeant durablement.`,
    image: "/nettoyage-facade.jpg",
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
    comparisons: [
      {
        caption: "Nettoyage de façade",
        ratio: 5 / 6,
        beforeImage: "/avant-facade.jpg",
        beforeAlt: "Façade envahie par la mousse avant nettoyage",
        afterImage: "/apres-facade.jpg",
        afterAlt: "Façade propre après nettoyage par drone",
      },
    ],
  },
  "nettoyage-de-batiment-industriel": {
    title: "Nettoyage de bâtiments industriels",
    subtitle:
      "Une solution innovante, rapide et sécurisée pour l'entretien de vos sites industriels",
    description: `${APP_NAME} intervient pour le nettoyage de bardages, silos et structures industrielles, y compris sur de grandes surfaces, en hauteur et dans les zones difficiles d'accès.`,
    image: "/nettoyage-batiment-industriel.jpg",
    sections: [
      {
        title: "Moins de travail en hauteur, plus de sécurité",
        content:
          "Grâce au nettoyage par drone, nous limitons le recours aux nacelles et aux échafaudages : moins de contraintes sur site, moins de personnel exposé au travail en hauteur et une sécurité renforcée.",
      },
      {
        title: "Votre activité continue pendant l'intervention",
        content:
          "Nos interventions sont pensées pour préserver la continuité de votre activité, en réduisant au maximum l'immobilisation des zones de travail et les perturbations liées au chantier.",
      },
      {
        title: "Une méthode adaptée à chaque structure",
        content:
          "Selon la configuration du site, le drone peut être complété par nos perches télescopiques professionnelles afin d'adapter notre méthode à chaque structure.",
        list: [
          "Bardages",
          "Silos",
          "Entrepôts",
          "Bâtiments de production",
          "Structures industrielles",
        ],
      },
    ],
    advantages: [
      "Traitement de grandes surfaces et des zones difficiles d'accès",
      "Recours aux nacelles et échafaudages fortement limité",
      "Moins de personnel exposé au travail en hauteur",
      "Immobilisation minimale de vos zones de travail",
      "Drone complété par perches télescopiques selon la structure",
    ],
    comparisons: [
      {
        caption: "Nettoyage de silo",
        ratio: 4 / 3,
        beforeImage: "/batiment-industriel-before2.JPG",
        beforeAlt: "Silo encrassée avant nettoyage",
        afterImage: "/batiment-industriel-after2.jpeg",
        afterAlt: "Silo propre après nettoyage par drone",
      },
      {
        caption: "Nettoyage de bâtiment industriel",
        ratio: 12 / 7,
        beforeImage: "/batiment-industriel-before.jpeg",
        beforeAlt: "Structure industrielle encrassée avant nettoyage",
        afterImage: "/batiment-industriel-after.jpeg",
        afterAlt: "Structure industrielle propre après nettoyage par drone",
      },
    ],
    video: {
      src: "/nettoyage-batiment-industriel.mp4",
      poster: "/nettoyage-batiment-industriel-poster.jpg",
      caption:
        "Nettoyage de batiment industriel par drone, en conditions réelles",
    },
  },
  "nettoyage-de-gouttieres": {
    title: "Nettoyage de gouttières",
    subtitle: "Prévention et protection de votre habitation",
    description:
      "Des gouttières encrassées ou bouchées peuvent provoquer des infiltrations, des dégâts sur la façade et des problèmes d'humidité dans votre maison. Les feuilles, mousses et débris s'accumulent rapidement, surtout en automne ou après de fortes pluies.",
    image: "/nettoyage-gouttieres.jpg",
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
};

export function getPrestationByKey(slug: string): PrestationData | null {
  return prestationsData[slug] || null;
}

/**
 * Toutes les pages prestations existantes, y compris celles absentes de l'enum
 * `Services` (qui ne sert qu'au carrousel de la page d'accueil). Sert de source
 * unique pour le sitemap et le maillage interne, afin de ne laisser aucune page
 * orpheline.
 */
export const allPrestationLinks = Object.entries(prestationsData).map(
  ([slug, data]) => ({
    slug,
    name: data.title,
    href: `/prestation/${slug}`,
  }),
);

/** Toutes les comparaisons avant/après du site, dans l'ordre des prestations. */
export const allComparisons = Object.values(prestationsData).flatMap(
  (prestation) => prestation.comparisons ?? [],
);
