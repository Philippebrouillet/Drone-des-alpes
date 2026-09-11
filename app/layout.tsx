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
    default: `${APP_NAME} | Nettoyage par drone en Haute-Savoie et Savoie`,
    template: `%s | ${APP_NAME}`,
  },
  description:
    "Expert en nettoyage par drone en Haute-Savoie, Savoie, Ain, Isère et Jura : toiture, façade, panneaux solaires, gouttières. Rapide, écologique et sans échafaudage.",
  keywords: [
    "nettoyage toiture",
    "nettoyage toiture drone",
    "nettoyage par drone",
    "démoussage toiture drone",
    "nettoyage façade",
    "nettoyage façade drone",
    "nettoyage panneaux solaires",
    "nettoyage panneaux solaires drone",
    "nettoyage gouttières",
    "nettoyage sans échafaudage",
    "nettoyage toiture Haute-Savoie",
    "nettoyage toiture Annecy",
    "nettoyage toiture Bourg-en-Bresse",
    "nettoyage toiture Chambéry",
    "nettoyage toiture Grenoble",
    "nettoyage toiture Annemasse",
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
      "Expert en nettoyage par drone en Haute-Savoie, Savoie, Ain, Isère et Jura. Solution innovante pour toiture, façade et panneaux solaires.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} - Nettoyage par drone`,
    description:
      "Expert en nettoyage par drone en Haute-Savoie, Savoie, Ain, Isère et Jura.",
  },
  alternates: {
    canonical: "/",
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

        {/*
          Sans JavaScript, aucune animation ne viendra révéler les blocs
          `.reveal` : on les réaffiche pour que la page reste lisible.
        */}
        <noscript>
          <style>{`.reveal { opacity: 1 !important; }`}</style>
        </noscript>

        {/*
          Données structurées rendues côté serveur : une balise <script> native est
          présente dans le HTML livré, là où next/script les injecterait seulement
          après hydratation (donc invisibles pour un crawl sans exécution de JS).
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(servicesSchema),
          }}
        />
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
