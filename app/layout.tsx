import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/lib/components/Navbar";
import Footer from "@/lib/components/Footer";
import ScrollToTop from "@/lib/components/ScrollToTop";
import Script from "next/script";
import { organizationSchema, servicesSchema } from "@/lib/schema";
import { Metadata } from "next";
import { prodUrl } from "@/lib/constant";

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
    default: "Drone des Alpes | Nettoyage par drone en Rhône-Alpes",
    template: "%s | Drone des Alpes",
  },
  description:
    "Expert en nettoyage par drone en Rhône-Alpes : toiture, façade, panneaux solaires, gouttières. Solution rapide, écologique et sans échafaudage. Devis gratuit.",
  keywords: [
    "nettoyage drone",
    "toiture drone",
    "façade drone",
    "panneaux solaires",
    "nettoyage toiture Rhône-Alpes",
    "démoussage drone",
    "nettoyage écologique",
    "sans échafaudage",
    "Grenoble",
    "Lyon",
    "Annecy",
    "Chambéry",
  ],
  authors: [{ name: "Drone des Alpes" }],
  creator: "Drone des Alpes",
  publisher: "Drone des Alpes",
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
    siteName: "Drone des Alpes",
    title: "Drone des Alpes - Nettoyage professionnel par drone",
    description:
      "Expert en nettoyage par drone en Rhône-Alpes. Solution innovante pour toiture, façade et panneaux solaires.",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Drone des Alpes - Nettoyage par drone",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Drone des Alpes - Nettoyage par drone",
    description: "Expert en nettoyage par drone en Rhône-Alpes. Devis gratuit.",
    images: ["/logo.jpg"],
  },
  alternates: {
    canonical: prodUrl,
  },
  verification: {
    google: "f30T9EALMQEXLfIdCNEjg9HPiKqEH5LMmifSeI-Hy1g",
    // yandex: 'votre-code-yandex',
    // bing: 'votre-code-bing',
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
