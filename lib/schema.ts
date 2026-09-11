import {
  APP_NAME,
  emailContact,
  phoneContactRaw,
  prodUrl,
  siegeCity,
  siegePostalCode,
  siegeStreet,
} from "./constant";

/** Identifiant stable de l'entreprise, réutilisé par les schémas des pages villes. */
export const businessId = `${prodUrl}/#business`;

// Coordonnées du siège : Thyez (74300), Haute-Savoie.
const siegeGeo = { latitude: 46.0833, longitude: 6.5333 };

const openingHours = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    opens: "09:00",
    closes: "19:00",
  },
];

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": businessId,
  name: APP_NAME,
  description:
    "Entreprise spécialisée dans le nettoyage par drone : toitures, façades, panneaux solaires et gouttières en Haute-Savoie, Savoie, Ain, Isère et Jura.",
  url: prodUrl,
  telephone: phoneContactRaw,
  email: emailContact,
  address: {
    "@type": "PostalAddress",
    streetAddress: siegeStreet,
    postalCode: siegePostalCode,
    addressLocality: siegeCity,
    addressRegion: "Auvergne-Rhône-Alpes",
    addressCountry: "FR",
  },
  geo: {
    "@type": "GeoCoordinates",
    ...siegeGeo,
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Haute-Savoie" },
    { "@type": "AdministrativeArea", name: "Savoie" },
    { "@type": "AdministrativeArea", name: "Ain" },
    { "@type": "AdministrativeArea", name: "Isère" },
    { "@type": "AdministrativeArea", name: "Jura" },
  ],
  priceRange: "€€",
  currenciesAccepted: "EUR",
  openingHoursSpecification: openingHours,
  sameAs: [
    "https://www.instagram.com/dronedesalpes",
    "https://www.linkedin.com/company/drones-des-alpes/",
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
    "@id": businessId,
    name: APP_NAME,
  },
  areaServed: organizationSchema.areaServed,
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

/**
 * Schéma de service local, spécifique à une ville (SEO local / pack Google Maps).
 * S'appuie sur les coordonnées réelles de la ville pour ancrer la zone desservie.
 */
export const citySchema = ({
  cityName,
  regionName,
  countryCode,
  url,
  lat,
  lng,
}: {
  cityName: string;
  regionName: string;
  countryCode: string;
  url: string;
  lat: number;
  lng: number;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: `Nettoyage par drone à ${cityName}`,
  serviceType: "Nettoyage par drone",
  description: `Nettoyage de toiture, façade, panneaux solaires et gouttières par drone à ${cityName} (${regionName}). Sans échafaudage, rapide et écologique.`,
  url,
  provider: {
    "@type": "LocalBusiness",
    "@id": businessId,
    name: APP_NAME,
    telephone: phoneContactRaw,
    email: emailContact,
    url: prodUrl,
    image: `${prodUrl}/logo.jpg`,
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: siegeStreet,
      postalCode: siegePostalCode,
      addressLocality: siegeCity,
      addressCountry: "FR",
    },
    openingHoursSpecification: openingHours,
  },
  areaServed: {
    "@type": "City",
    name: cityName,
    address: {
      "@type": "PostalAddress",
      addressLocality: cityName,
      addressRegion: regionName,
      addressCountry: countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: lat,
      longitude: lng,
    },
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: `Nettoyage par drone à ${cityName}`,
    itemListElement: [
      "Nettoyage de toiture",
      "Nettoyage de façade",
      "Nettoyage de panneaux solaires",
      "Nettoyage de gouttières",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: `${name} à ${cityName}`,
      },
    })),
  },
});

/** Schéma d'une prestation (page /prestation/[name]). */
export const prestationSchema = ({
  title,
  description,
  url,
  image,
}: {
  title: string;
  description: string;
  url: string;
  image: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: title,
  serviceType: "Nettoyage par drone",
  description,
  url,
  image: `${prodUrl}${image}`,
  provider: {
    "@type": "LocalBusiness",
    "@id": businessId,
    name: APP_NAME,
    telephone: phoneContactRaw,
    url: prodUrl,
  },
  areaServed: organizationSchema.areaServed,
});

