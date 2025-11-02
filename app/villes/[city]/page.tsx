import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, MapPin, Phone, Mail } from "lucide-react";
import Image from "next/image";
import {
  cityCoordinates,
  departments,
  formatCityUrl,
} from "@/lib/services/interventionZone";
import { notFound } from "next/navigation";

// Fonction inverse pour retrouver le nom original
function getCityFromUrl(url: string): string | null {
  const allCities = Object.keys(cityCoordinates);
  return allCities.find((city) => formatCityUrl(city) === url) || null;
}

// Génération des routes statiques
export async function generateStaticParams() {
  const allCities = Object.keys(cityCoordinates);
  return allCities.map((city) => ({
    city: formatCityUrl(city),
  }));
}

// Métadonnées dynamiques pour chaque ville
export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const cityName = getCityFromUrl(city);
  if (!cityName) return {};

  const cityData = cityCoordinates[cityName];
  const dept = departments.find((d) => d.code === cityData.dept);

  return {
    title: `Nettoyage par Drone à ${cityName} (${cityData.dept}) | Drone des Alpes`,
    description: `Expert en nettoyage par drone à ${cityName} et ses environs. Toiture, façade, panneaux solaires, gouttières. ✅ Sans échafaudage ✅ Rapide ✅ Devis gratuit sous 24h.`,
    keywords: [
      `nettoyage drone ${cityName}`,
      `nettoyage toiture ${cityName}`,
      `nettoyage façade ${cityName}`,
      `panneaux solaires ${cityName}`,
      `démoussage ${cityName}`,
      `entreprise nettoyage drone ${dept?.name}`,
      cityData.dept,
    ],
    openGraph: {
      title: `Nettoyage par Drone à ${cityName} | Drone des Alpes`,
      description: `Service professionnel de nettoyage par drone à ${cityName}. Toiture, façade, panneaux solaires.`,
      type: "website",
    },
    alternates: {
      canonical: `https://www.dronedesalpes.fr/villes/${city}`,
    },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const cityName = getCityFromUrl(city);

  if (!cityName || !cityCoordinates[cityName]) {
    notFound();
  }

  const cityData = cityCoordinates[cityName];
  const dept = departments.find((d) => d.code === cityData.dept);
  const nearbyCities = Object.entries(cityCoordinates)
    .filter(([name, data]) => data.dept === cityData.dept && name !== cityName)
    .slice(0, 8)
    .map(([name]) => name);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px]">
        <Image
          src="/Nettoyage toiture.jpg"
          alt={`Nettoyage par drone à ${cityName}`}
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-black/40" />

        <div className="absolute inset-0 flex items-center">
          <div className="customContainer mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors duration-200 mb-6"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Retour à l'accueil</span>
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-10 h-10 text-blue-400" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                Nettoyage par Drone à {cityName}
              </h1>
            </div>

            <p className="text-xl md:text-2xl text-gray-200 mb-6">
              {dept?.name} ({cityData.dept}) - Service professionnel et rapide
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/#contact"
                className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Devis gratuit
              </Link>
              <a
                href="tel:+33XXXXXXXXX"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg"
              >
                <Phone className="w-5 h-5" />
                Appelez-nous
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services disponibles */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="customContainer mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Nos Services à {cityName}
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Drone des Alpes intervient à {cityName} et dans tout le département{" "}
            {dept?.name} pour tous vos besoins de nettoyage par drone.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Nettoyage de Toiture",
                description: `Démoussage et nettoyage professionnel de toiture à ${cityName}`,
                icon: "🏠",
              },
              {
                title: "Nettoyage de Façade",
                description: `Ravalement de façade par drone à ${cityName}`,
                icon: "🏢",
              },
              {
                title: "Panneaux Solaires",
                description: `Optimisation du rendement de vos panneaux à ${cityName}`,
                icon: "☀️",
              },
              {
                title: "Nettoyage Gouttières",
                description: `Débouchage et nettoyage de gouttières à ${cityName}`,
                icon: "💧",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi nous choisir à [Ville] */}
      <section className="py-16 md:py-20">
        <div className="customContainer mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Pourquoi Choisir Drone des Alpes à {cityName} ?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Intervention Rapide",
                description: `Nous intervenons rapidement à ${cityName} et ses environs. Devis sous 24h, intervention sous 72h.`,
                icon: "⚡",
              },
              {
                title: "Expertise Locale",
                description: `Nous connaissons parfaitement ${cityName} et le climat du ${dept?.name}. Nos méthodes sont adaptées.`,
                icon: "🎯",
              },
              {
                title: "Sans Échafaudage",
                description: `Pas besoin d'échafaudage à ${cityName}. Solution économique et rapide par drone.`,
                icon: "🚫",
              },
              {
                title: "Écologique",
                description: `Produits biodégradables et respectueux de l'environnement de ${cityName}.`,
                icon: "🌱",
              },
              {
                title: "Prix Compétitifs",
                description: `Tarifs transparents et compétitifs pour ${cityName}. 30-50% moins cher que les méthodes traditionnelles.`,
                icon: "💰",
              },
              {
                title: "Résultats Garantis",
                description: `Satisfaction garantie pour tous nos clients de ${cityName} et alentours.`,
                icon: "✅",
              },
            ].map((advantage, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-lg hover:bg-blue-50 transition-colors duration-200"
              >
                <div className="text-4xl mb-4">{advantage.icon}</div>
                <h3 className="text-xl font-bold mb-2">{advantage.title}</h3>
                <p className="text-gray-600">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Villes à proximité */}
      {nearbyCities.length > 0 && (
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="customContainer mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Nous intervenons aussi près de {cityName}
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12">
              Découvrez nos services dans les villes voisines du {dept?.name}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {nearbyCities.map((city) => (
                <Link
                  key={city}
                  href={`/villes/${formatCityUrl(city)}`}
                  className="bg-white p-4 rounded-lg text-center hover:bg-blue-50 hover:shadow-md transition-all duration-200"
                >
                  <MapPin className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <span className="font-semibold text-gray-800">{city}</span>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/#intervention-zone"
                className="text-blue-600 font-semibold hover:underline"
              >
                Voir toutes nos zones d'intervention →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Final */}
      <section className="py-16 md:py-20 bg-linear-to-br from-blue-600 to-blue-500">
        <div className="customContainer mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Besoin d'un Nettoyage par Drone à {cityName} ?
          </h2>
          <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto">
            Contactez-nous dès maintenant pour un devis gratuit et personnalisé.
            Intervention rapide à {cityName} et dans tout le {dept?.name}.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Mail className="w-5 h-5" />
              Demander un devis
            </Link>
            <a
              href="tel:+33XXXXXXXXX"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors duration-200"
            >
              <Phone className="w-5 h-5" />
              +33 X XX XX XX XX
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
