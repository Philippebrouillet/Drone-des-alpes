import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/lib/components/Navbar";
import Footer from "@/lib/components/Footer";
import ScrollToTop from "@/lib/components/ScrollToTop";
import Script from "next/script";
import { organizationSchema, servicesSchema } from "@/lib/schema";
import { Metadata } from "next";
import { APP_NAME, prodUrl } from "@/lib/constant";

// const geistSans = Geist({
//   subsets: ["latin"],
// });

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

// const lexend = Lexend({
//   subsets: ["latin"],
//   weight: ["400"],
// });

// const inter = Inter({
//   subsets: ["latin"],
//   display: "swap",
// });

// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600"],
//   display: "swap",
// });

// const urbanist = Urbanist({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600"],
// });

// Métadonnées globales optimisées pour le SEO
export const metadata: Metadata = {
  metadataBase: new URL(prodUrl),
  title: {
    default: `${APP_NAME} | Nettoyage par drone en Rhône-Alpes`,
    template: `%s | ${APP_NAME}`,
  },
  description:
    "Expert en nettoyage par drone en Rhône-Alpes : toiture, façade, panneaux solaires, gouttières. Solution rapide, écologique et sans échafaudage. Devis gratuit.",
  keywords: [
    "nettoyage",
    "nettoyage toiture",
    "nettoyage façade",
    "nettoyage panneaux solaires",
    "nettoyage gouttières",
    "nettoyage drone",
    "toiture drone",
    "façade drone",
    "panneaux solaires",
    "nettoyage toiture Rhône-Alpes",
    "démoussage drone",
    "nettoyage écologique",
    "sans échafaudage",
    "Rhône-Alpes",
    "Grenoble",
    "Lyon",
    "Annecy",
    "Chambéry",
  ],
  authors: [{ name: APP_NAME }],
  creator: APP_NAME,
  publisher: APP_NAME,
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
    type: "website",
    locale: "fr_FR",
    url: prodUrl,
    siteName: APP_NAME,
    title: `${APP_NAME} - Nettoyage professionnel par drone`,
    description:
      "Expert en nettoyage par drone en Rhône-Alpes. Solution innovante pour toiture, façade et panneaux solaires.",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: `${APP_NAME} - Nettoyage par drone`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} - Nettoyage par drone`,
    description: "Expert en nettoyage par drone en Rhône-Alpes. Devis gratuit.",
    images: ["/logo.jpg"],
  },
  alternates: {
    canonical: prodUrl,
  },
  verification: {
    google: "f30T9EALMQEXLfIdCNEjg9HPiKqEH5LMmifSeI-Hy1g",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${montserrat.className}`}>
      <head>
        <meta
          name="google-site-verification"
          content="f30T9EALMQEXLfIdCNEjg9HPiKqEH5LMmifSeI-Hy1g"
        />
        {/* Données structurées JSON-LD pour le SEO */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <Script
          id="services-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(servicesSchema),
          }}
        />

        {/* Plausible Cloud script */}
        <Script
          strategy="afterInteractive"
          async
          src="https://plausible.io/js/pa-jjzjjkzlrC6g-cNxqEsZJ.js"
        />

        {/* Initialisation */}
        <Script id="plausible-init" strategy="afterInteractive">
          {`
            window.plausible = window.plausible || function(){ (plausible.q = plausible.q || []).push(arguments) };
            plausible.init = plausible.init || function(i){ plausible.o = i || {} };
            plausible.init();
          `}
        </Script>
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
