import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/lib/components/Navbar";
import Footer from "@/lib/components/Footer";
import ScrollToTop from "@/lib/components/ScrollToTop";
import Script from "next/script";
import { organizationSchema, servicesSchema } from "@/lib/schema";
import { Metadata } from "next";
import { APP_NAME, prodUrl } from "@/lib/constant";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

// Métadonnées globales optimisées pour le SEO
export const metadata: Metadata = {
  metadataBase: new URL(prodUrl),
  title: {
    default: `${APP_NAME} | Nettoyage par drone en Rhône-Alpes et Suisse`,
    template: `%s | ${APP_NAME}`,
  },
  description:
    "Expert en nettoyage par drone en Rhône-Alpes et en Suisse : toiture, façade, panneaux solaires, gouttières. Solution rapide, écologique et sans échafaudage.",
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
    "nettoyage toiture Suisse",
    "démoussage drone",
    "nettoyage écologique",
    "sans échafaudage",
    "drone",
    "nettoyage professionnel",
    "nettoyage par drone",
    "nettoyage par drone Rhône-Alpes",
    "Rhône-Alpes",
    "Suisse",
    "Vaud",
    "Genève",
    "Ain",
    "Jura",
    "Isère",
    "Savoie",
    "Haute-Savoie",
    "Lyon",
    "Grenoble",
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
      "Expert en nettoyage par drone en Rhône-Alpes et en Suisse. Solution innovante pour toiture, façade et panneaux solaires.",
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
    description: "Expert en nettoyage par drone en Rhône-Alpes et en Suisse.",
    images: ["/logo.jpg"],
  },
  alternates: {
    canonical: prodUrl,
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
        <meta name="apple-mobile-web-app-title" content="Dronedesalpes" />

        <script
          src="https://cdn.visitors.now/v.js"
          data-token="e37ea11d-4885-4246-a4b3-d9883487d5dd"
        />

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

        <Script
          strategy="afterInteractive"
          async
          src="https://plausible.io/js/pa-jjzjjkzlrC6g-cNxqEsZJ.js"
        />

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
