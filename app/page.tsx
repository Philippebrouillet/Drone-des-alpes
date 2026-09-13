import { Metadata } from "next";
import HeroCarousel from "../lib/components/HeroCarousel";
import AboutSection from "../lib/components/sections/AboutSection";
import AdvantagesSection from "../lib/components/sections/AdvantagesSection";
import ServicesSection from "../lib/components/sections/ServicesSection";
import BeforeAfterSection from "../lib/components/sections/BeforeAfterSection";
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
  title: "Nettoyage par drone en Haute-Savoie, Savoie et Isère",
  description:
    "Nettoyage par drone de toiture, façade, bâtiment industriel et gouttières en Haute-Savoie, Savoie, Ain, Isère et Jura. Sans échafaudage, devis gratuit sous 48h.",
  keywords: [
    "nettoyage par drone",
    "nettoyage toiture drone",
    "démoussage toiture drone",
    "nettoyage façade drone",
    "nettoyage bâtiment industriel drone",
    "nettoyage gouttières",
    "nettoyage drone Haute-Savoie",
    "nettoyage toiture Annecy",
    "nettoyage toiture Annemasse",
    "nettoyage façade Chambéry",
    "nettoyage industriel Grenoble",
    "nettoyage toiture Annemasse",
    "entreprise nettoyage drone",
    "nettoyage sans échafaudage",
    "nettoyage écologique drone",
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
    title: `${APP_NAME} - Expert du nettoyage par drone en Haute-Savoie et Savoie`,
    description:
      "Nettoyage professionnel de toitures, façades et bâtiments industriels par drone. Solution innovante sans échafaudage en Haute-Savoie, Savoie, Ain, Isère et Jura. Devis gratuit.",
    type: "website",
    locale: "fr_FR",
    url: prodUrl,
    siteName: APP_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} - Nettoyage par drone en Haute-Savoie et Savoie`,
    description:
      "Expert en nettoyage par drone. Toiture, façade, bâtiment industriel. Devis gratuit.",
  },
  alternates: {
    canonical: "/",
  },
};

const mutualServicesData = {
  roofCleaning: {
    image: "/nettoyage-toiture.jpg",
    title: Services.NETTOYAGE_TOITURE,
    href: formatHrefService(Services.NETTOYAGE_TOITURE),
  },
  facadeCleaning: {
    image: "/nettoyage-facade.jpg",
    title: Services.NETTOYAGE_FACADE,
    href: formatHrefService(Services.NETTOYAGE_FACADE),
  },
  industrialBuildingCleaning: {
    image: "/nettoyage-batiment-industriel.jpg",
    title: Services.NETTOYAGE_BATIMENT_INDUSTRIEL,
    href: formatHrefService(Services.NETTOYAGE_BATIMENT_INDUSTRIEL),
  },
  gutterCleaning: {
    image: "/nettoyage-gouttieres.jpg",
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
    ...mutualServicesData.industrialBuildingCleaning,
    subtitle:
      "Bardages, silos et structures industrielles nettoyés sans nacelle ni échafaudage",
    alt: "Nettoyage de bâtiment industriel par drone",
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
          <HeroCarousel
            slides={slides}
            heading="Nettoyage professionnel par drone"
          />
          <AboutSection />
          <BeforeAfterSection />
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
