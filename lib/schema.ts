import { APP_NAME, prodUrl } from "./constant";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: APP_NAME,
  description:
    "Entreprise spécialisée dans le nettoyage par drone : toitures, façades, panneaux solaires et gouttières en Rhône-Alpes.",
  url: prodUrl,
  telephone: "+33-XXX-XXX-XXX", // À remplacer par votre vrai numéro
  email: "contact@dronedesalpes.fr",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Rhône-Alpes",
    addressCountry: "FR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 45.764043, // Coordonnées approximatives Rhône-Alpes
    longitude: 4.835659,
  },
  areaServed: [
    {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 45.764043,
        longitude: 4.835659,
      },
      geoRadius: "100000", // 100km
    },
  ],
  priceRange: "€€",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
  ],
  sameAs: [
    // Ajoutez vos réseaux sociaux ici
    // 'https://www.facebook.com/dronedesalpes',
    // 'https://www.instagram.com/dronedesalpes',
    // 'https://www.linkedin.com/company/dronedesalpes',
  ],
  image: `${prodUrl}/logo.jpg`,
  logo: `${prodUrl}/logo.jpg`,
};

export const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Nettoyage par drone",
  provider: {
    "@type": "LocalBusiness",
    name: APP_NAME,
  },
  areaServed: {
    "@type": "State",
    name: "Rhône-Alpes",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services de nettoyage par drone",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Nettoyage de toiture par drone",
          description:
            "Démoussage et nettoyage professionnel de toiture sans échafaudage",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Nettoyage de façade par drone",
          description: "Nettoyage de façade rapide et écologique",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Nettoyage de panneaux solaires",
          description:
            "Optimisation du rendement énergétique de vos panneaux solaires",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Nettoyage de gouttières",
          description: "Débouchage et nettoyage professionnel de gouttières",
        },
      },
    ],
  },
};

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const faqSchema = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});
