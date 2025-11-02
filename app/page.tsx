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
import { Services } from "@/lib/constant";
import { formatHrefService } from "@/lib/services/services";

export const metadata: Metadata = {
  title:
    "Drone des Alpes | Nettoyage par drone - Toiture, Façade, Panneaux Solaires",
  description:
    "Nettoyage professionnel par drone : toitures, façades, panneaux solaires et gouttières. Solution rapide, économique et écologique. Devis gratuit en Rhône-Alpes.",
  keywords:
    "nettoyage drone, toiture, façade, panneaux solaires, gouttières, démoussage, Rhône-Alpes, sans échafaudage, écologique",
  authors: [{ name: "Drone des Alpes" }],
  robots: "index, follow",
  openGraph: {
    title: "Drone des Alpes - Nettoyage professionnel par drone",
    description:
      "Nettoyage de toitures, façades et panneaux solaires par drone. Solution innovante sans échafaudage en Rhône-Alpes.",
    type: "website",
    locale: "fr_FR",
    siteName: "Drone des Alpes",
  },
  twitter: {
    card: "summary_large_image",
    title: "Drone des Alpes - Nettoyage par drone",
    description:
      "Nettoyage professionnel par drone en Rhône-Alpes. Devis gratuit.",
  },
  alternates: {
    canonical: "https://www.dronedesalpes.fr",
  },
};

const mutualServicesData = {
  roofCleaning: {
    image: "/Nettoyage toiture.jpg",
    title: Services.NETTOYAGE_TOITURE,
  },
  facadeCleaning: {
    image: "/Nettoyage facade.jpg",
    title: Services.NETTOYAGE_FACADE,
  },
  solarPannelCleaning: {
    image: "/Nettoyage panneaux solaire.jpg",
    title: Services.NETTOYAGE_PANNEAU_SOLAIRE,
  },
  gutterCleaning: {
    image: "/Nettoyage gouttières.jpg",
    title: Services.NETTOYAGE_GOUTTIERE,
  },
};
const slides = [
  {
    ...mutualServicesData.roofCleaning,
    subtitle:
      "Rapide, économique et écologique. Démoussage professionnel sans échafaudage",
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

    href: formatHrefService(Services.NETTOYAGE_TOITURE),
  },
  {
    ...mutualServicesData.facadeCleaning,
    icon: Building2,
    shortDescription: "Protégez et sublimez votre maison par la voie des airs",
    description:
      "Avec le temps, la pollution, les intempéries et les mousses ternissent vos murs extérieurs. Un nettoyage régulier permet de prévenir la dégradation des matériaux et de conserver une isolation optimale tout en valorisant votre bien immobilier.",
    href: formatHrefService(Services.NETTOYAGE_FACADE),
  },
  {
    ...mutualServicesData.solarPannelCleaning,
    icon: Sun,
    shortDescription: "Optimisez votre rendement énergétique jusqu'à +20%",
    description:
      "Vos panneaux solaires sont un investissement important. La poussière, les feuilles et la pollution peuvent réduire leur rendement jusqu'à 20%. Entretenir régulièrement vos panneaux permet de maximiser votre production d'énergie et d'allonger leur durée de vie.",
    href: formatHrefService(Services.NETTOYAGE_PANNEAU_SOLAIRE),
  },
  {
    ...mutualServicesData.gutterCleaning,
    icon: Droplets,
    shortDescription: "Prévenez les infiltrations et protégez votre façade",
    description:
      "Des gouttières encrassées peuvent provoquer des infiltrations et des problèmes d'humidité. Nous intervenons avec un aspirateur professionnel pour éliminer complètement les débris, mousses et feuilles, sans risque pour vous.",
    href: formatHrefService(Services.NETTOYAGE_GOUTTIERE),
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
