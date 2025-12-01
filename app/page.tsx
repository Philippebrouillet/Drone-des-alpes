import { Metadata } from "next";
import HeroCarousel from "../lib/components/HeroCarousel";
import AboutSection from "../lib/components/sections/AboutSection";
import AdvantagesSection from "../lib/components/sections/AdvantagesSection";
import ServicesSection from "../lib/components/sections/ServicesSection";
import OffersSection from "../lib/components/sections/OffersSection";
import WhyChooseUs from "../lib/components/sections/WhyChooseUs";
import FoundersSection from "../lib/components/sections/FoundersSection";
import InterventionZone from "../lib/components/sections/InterventionZone";
import ContactForm from "../lib/components/sections/ContactForm";
import { Home as HomeIcon, Building2, Sun, Droplets } from "lucide-react";
import { APP_NAME, prodUrl, Services } from "@/lib/constant";
import { formatHrefService } from "@/lib/services/services";

export const metadata: Metadata = {
  title:
    "Nettoyage par Drone Rhône-Alpes | Toiture, Façade, Panneaux Solaires - Devis Gratuit",
  description:
    "Expert nettoyage par drone en Rhône-Alpes (Lyon, Grenoble, Annecy). Toiture, façade, panneaux solaires, gouttières. ✅ Sans échafaudage ✅ Écologique ✅ Rapide. Devis gratuit sous 24h.",
  keywords: [
    "nettoyage",
    "nettoyage par drone",
    "nettoyage toiture drone",
    "nettoyage drone",
    "nettoyage façade drone",
    "nettoyage panneaux solaires drone",
    "nettoyage gouttières drone",
    "nettoyage toiture",
    "nettoyage façade",
    "nettoyage panneaux solaires",
    "nettoyage gouttières",
    "nettoyage drone Rhône-Alpes",
    "nettoyage toiture drone Lyon",
    "nettoyage façade drone Grenoble",
    "nettoyage panneaux solaires Annecy",
    "démoussage toiture drone",
    "nettoyage gouttières Chambéry",
    "entreprise nettoyage drone",
    "nettoyage sans échafaudage",
    "nettoyage écologique drone",
    "drone nettoyage professionnel",
  ],
  authors: [{ name: APP_NAME }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: `${APP_NAME} - Expert Nettoyage par Drone en Rhône-Alpes`,
    description:
      "Nettoyage professionnel de toitures, façades et panneaux solaires par drone. Solution innovante sans échafaudage en Rhône-Alpes. Devis gratuit.",
    type: "website",
    locale: "fr_FR",
    url: prodUrl,
    siteName: APP_NAME,
    images: [
      {
        url: "/Nettoyage toiture.jpg",
        width: 1200,
        height: 630,
        alt: `Nettoyage de toiture par drone - ${APP_NAME}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} - Nettoyage par drone Rhône-Alpes`,
    description:
      "Expert en nettoyage par drone. Toiture, façade, panneaux solaires. Devis gratuit.",
    images: ["/Nettoyage toiture.jpg"],
  },
  alternates: {
    canonical: prodUrl,
  },
};

const mutualServicesData = {
  roofCleaning: {
    image: "/Nettoyage toiture.jpg",
    title: Services.NETTOYAGE_TOITURE,
    href: formatHrefService(Services.NETTOYAGE_TOITURE),
  },
  facadeCleaning: {
    image: "/Nettoyage facade.jpg",
    title: Services.NETTOYAGE_FACADE,
    href: formatHrefService(Services.NETTOYAGE_FACADE),
  },
  solarPannelCleaning: {
    image: "/Nettoyage panneaux solaire.jpg",
    title: Services.NETTOYAGE_PANNEAU_SOLAIRE,
    href: formatHrefService(Services.NETTOYAGE_PANNEAU_SOLAIRE),
  },
  gutterCleaning: {
    image: "/Nettoyage gouttières.jpg",
    title: Services.NETTOYAGE_GOUTTIERE,
    href: formatHrefService(Services.NETTOYAGE_GOUTTIERE),
  },
};
const slides = [
  {
    ...mutualServicesData.roofCleaning,
    subtitle:
      "Rapide, économique et écologique. Démoussage professionnel à l'aide de drone",
    alt: "Nettoyage de toiture par drone professionnel",
  },
  {
    ...mutualServicesData.facadeCleaning,
    subtitle:
      "Protégez et sublimez votre maison par la voie des airs, sans échafaudage",
    alt: "Nettoyage de facade par drone",
  },
  {
    ...mutualServicesData.solarPannelCleaning,
    subtitle:
      "Optimisez votre rendement énergétique jusqu'à +20% avec un nettoyage adapté",
    alt: "Nettoyage de panneaux solaires par drone",
  },
  {
    ...mutualServicesData.gutterCleaning,
    subtitle:
      "Prévenez les infiltrations avec notre aspirateur professionnel haute performance",
    alt: "Nettoyage de gouttières professionnel",
  },
];

const services = [
  {
    ...mutualServicesData.roofCleaning,
    icon: HomeIcon,
    shortDescription:
      "Nettoyage de toiture par drone : rapide, économique et écologique",
    description:
      "Souvent repoussé, le nettoyage de la toiture est pourtant essentiel à la longévité de votre maison. Votre toiture protège votre maison des intempéries. Sans entretien, la mousse et les lichens favorisent les infiltrations d'eau et diminuent les performances énergétiques.",
  },
  {
    ...mutualServicesData.facadeCleaning,
    icon: Building2,
    shortDescription: "Protégez et sublimez votre maison par la voie des airs",
    description:
      "Avec le temps, la pollution, les intempéries et les mousses ternissent vos murs extérieurs. Un nettoyage régulier permet de prévenir la dégradation des matériaux et de conserver une isolation optimale tout en valorisant votre bien immobilier.",
  },
  {
    ...mutualServicesData.solarPannelCleaning,
    icon: Sun,
    shortDescription: "Optimisez votre rendement énergétique jusqu'à +20%",
    description:
      "Vos panneaux solaires sont un investissement important. La poussière, les feuilles et la pollution peuvent réduire leur rendement jusqu'à 20%. Entretenir régulièrement vos panneaux permet de maximiser votre production d'énergie et d'allonger leur durée de vie.",
  },
  {
    ...mutualServicesData.gutterCleaning,
    icon: Droplets,
    shortDescription: "Prévenez les infiltrations et protégez votre façade",
    description:
      "Des gouttières encrassées peuvent provoquer des infiltrations et des problèmes d'humidité. Nous intervenons avec un aspirateur professionnel pour éliminer complètement les débris, mousses et feuilles, sans risque pour vous.",
  },
];

export default function Home() {
  return (
    <main>
      <HeroCarousel slides={slides} />
      <AboutSection />
      <AdvantagesSection />
      <ServicesSection services={services} />
      <OffersSection />
      <WhyChooseUs />
      <FoundersSection />
      <InterventionZone />
      <ContactForm />
    </main>
  );
}
