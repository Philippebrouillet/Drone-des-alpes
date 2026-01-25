import { Metadata } from "next";
import HeroCarousel from "../lib/components/HeroCarousel";
import AboutSection from "../lib/components/sections/AboutSection";
import AdvantagesSection from "../lib/components/sections/AdvantagesSection";
import ServicesSection from "../lib/components/sections/ServicesSection";
import OffersSection from "../lib/components/sections/OffersSection";
import WhyChooseUs from "../lib/components/sections/WhyChooseUs";

import InterventionZone from "../lib/components/sections/InterventionZone";
import ContactForm from "../lib/components/sections/ContactForm";
import { APP_NAME, prodUrl, Services } from "@/lib/constant";
import { formatHrefService } from "@/lib/services/services";
import CertificationSection from "@/lib/components/sections/CertificationSection";
import FoundersSection from "@/lib/components/sections/FoundersSection";
import gsap from "@/lib/customGsap";

export const metadata: Metadata = {
  title: "Nettoyage par drone en Rhône-Alpes et Suisse",
  description:
    "Expert en nettoyage par drone en Rhône-Alpes (Lyon, Grenoble, Annecy) et en Suisse. Toitures, façades, panneaux solaires et gouttières.",
  keywords: [
    "nettoyage",
    "nettoyage toiture",
    "nettoyage par drone",
    "nettoyage toiture drone",
    "nettoyage drone",
    "nettoyage façade drone",
    "nettoyage panneaux solaires drone",
    "nettoyage gouttières drone",
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
    title: `${APP_NAME} - Expert Nettoyage par Drone en Rhône-Alpes et Suisse`,
    description:
      "Nettoyage professionnel de toitures, façades et panneaux solaires par drone. Solution innovante sans échafaudage en Rhône-Alpes et Suisse. Devis gratuit.",
    type: "website",
    locale: "fr_FR",
    url: prodUrl,
    siteName: APP_NAME,
    images: [
      {
        url: "/logo.jpg",
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
    images: ["/logo.jpg"],
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

export default function Home() {
  return (
    <main>
      {gsap && (
        <>
          <HeroCarousel slides={slides} />
          <AboutSection />
          <AdvantagesSection />
          <ServicesSection mutualServicesData={mutualServicesData} />
          <OffersSection />
          <WhyChooseUs />
          <CertificationSection />
          <FoundersSection />
          <InterventionZone />
          <ContactForm />
        </>
      )}
    </main>
  );
}
