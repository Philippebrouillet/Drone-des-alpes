import { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Check,
  Clock,
  ShieldCheck,
  Euro,
} from "lucide-react";
import Image from "next/image";
import {
  cityCoordinates,
  formatCityUrl,
  getDeptLabel,
} from "@/lib/services/interventionZone";
import { notFound } from "next/navigation";
import {
  APP_NAME,
  phoneContact,
  phoneContactRaw,
  prodUrl,
} from "@/lib/constant";
import { breadcrumbSchema, citySchema } from "@/lib/schema";
import { prestationsData } from "@/lib/services/services";

// Les quatre prestations mises en avant, avec leur visuel
const prestationsVedettes = [
  "nettoyage-de-toiture",
  "nettoyage-de-facade",
  "nettoyage-de-batiment-industriel",
  "nettoyage-de-gouttieres",
] as const;

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

export const dynamicParams = false;

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
  const dept = getDeptLabel(cityData.dept);

  return {
    // Le nom de marque est ajouté par le `template` du layout : ne pas le répéter ici.
    title: `Nettoyage par drone à ${cityName} (${cityData.dept})`,
    description: `Nettoyage par drone à ${cityName} : toiture, façade, bâtiment industriel et gouttières. Sans échafaudage, intervention rapide en ${dept.label}. Devis gratuit sous 24h.`,
    keywords: [
      `nettoyage drone ${cityName}`,
      `nettoyage toiture ${cityName}`,
      `démoussage toiture ${cityName}`,
      `nettoyage façade ${cityName}`,
      `nettoyage bâtiment industriel ${cityName}`,
      `nettoyage gouttières ${cityName}`,
      `entreprise nettoyage drone ${dept.label}`,
    ],
    openGraph: {
      title: `Nettoyage par drone à ${cityName} | ${APP_NAME}`,
      description: `Service professionnel de nettoyage par drone à ${cityName} : toiture, façade, bâtiment industriel.`,
      type: "website",
      url: `${prodUrl}/villes/${city}`,
    },
    alternates: {
      canonical: `/villes/${city}`,
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
  const dept = getDeptLabel(cityData.dept);
  const cityUrl = `${prodUrl}/villes/${city}`;
  const nearbyCities = Object.entries(cityCoordinates)
    .filter(([name, data]) => data.dept === cityData.dept && name !== cityName)
    .slice(0, 8)
    .map(([name]) => name);

  const jsonLd = [
    citySchema({
      cityName,
      regionName: dept.region,
      countryCode: dept.country,
      url: cityUrl,
      lat: cityData.lat,
      lng: cityData.lng,
    }),
    breadcrumbSchema([
      { name: "Accueil", url: prodUrl },
      { name: "Zones d'intervention", url: `${prodUrl}/#intervention-zone` },
      { name: cityName, url: cityUrl },
    ]),
  ];

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero : compact, aligné à gauche, avec les repères de la page d'accueil */}
      <section className="relative flex min-h-[560px] items-end overflow-hidden pt-45 pb-14">
        <Image
          src="/nettoyage-toiture.jpg"
          alt={`Nettoyage de toiture par drone à ${cityName}`}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/60 to-black/25" />

        <div className="relative flex w-full justify-center">
          <div className="customContainer">
            <nav aria-label="Fil d'Ariane" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-white/70">
                <li>
                  <Link href="/" className="hover:text-white hover:underline">
                    Accueil
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link
                    href="/#intervention-zone"
                    className="hover:text-white hover:underline"
                  >
                    Zones d&apos;intervention
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="font-medium text-white" aria-current="page">
                  {cityName}
                </li>
              </ol>
            </nav>

            <p className="mb-5 flex items-center gap-3 text-xs md:text-sm font-semibold uppercase tracking-widest md:tracking-[0.2em] text-white/85">
              <span className="h-px w-5 md:w-8 shrink-0 bg-secondary" />
              {dept.label} ({cityData.dept})
            </p>

            <h1 className="mb-6 max-w-3xl text-4xl leading-[1.1] font-bold text-white drop-shadow-lg md:text-5xl lg:text-6xl">
              Nettoyage par drone à {cityName}
            </h1>

            <p className="mb-10 max-w-2xl text-lg font-light text-gray-200 drop-shadow-md md:text-xl">
              Toiture, façade, bâtiment industriel et gouttières : un nettoyage
              réalisé depuis le sol, sans échafaudage ni intervention sur le
              toit.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-primary shadow-lg transition-all duration-300 hover:scale-105 hover:bg-primary-200 hover:text-white"
              >
                Devis gratuit sous 48h
                <ArrowRight size={16} />
              </Link>
              <a
                href={`tel:${phoneContactRaw}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/50 px-8 py-4 text-lg font-medium text-white transition-colors duration-300 hover:border-white hover:bg-white/10"
              >
                <Phone className="h-5 w-5" />
                {phoneContact}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Repères chiffrés : réponse immédiate aux questions de délai et de prix */}
      <section className="border-b border-gray-200 bg-white">
        <div className="flex justify-center">
          <div className="customContainer grid grid-cols-1 gap-8 py-10 sm:grid-cols-3">
            {[
              {
                icone: Clock,
                valeur: "24h",
                libelle: `Devis gratuit pour votre projet à ${cityName}`,
              },
              {
                icone: Euro,
                valeur: "30 à 50%",
                libelle: "moins cher qu'un nettoyage traditionnel",
              },
              {
                icone: ShieldCheck,
                valeur: "0",
                libelle: "échafaudage, nacelle ou passage sur le toit",
              },
            ].map(({ icone: Icone, valeur, libelle }) => (
              <div key={valeur} className="flex items-start gap-4">
                <Icone className="mt-1 h-6 w-6 shrink-0 text-secondary" />
                <div>
                  <p className="text-2xl font-bold text-primary">{valeur}</p>
                  <p className="text-sm text-gray-600">{libelle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prestations : de vraies photos plutôt que des pictogrammes */}
      <section className="section flex justify-center bg-white">
        <div className="customContainer">
          <div className="mb-12 max-w-2xl">
            <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-secondary">
              <span className="h-px w-8 shrink-0 bg-secondary" />
              Nos prestations
            </p>
            <h2 className="mb-4 text-3xl font-bold text-primary md:text-4xl">
              Ce que nous nettoyons à {cityName}
            </h2>
            <p className="text-lg text-gray-600">
              {APP_NAME} intervient à {cityName} et dans tout le secteur{" "}
              {dept.label}, sur les maisons individuelles comme sur les
              bâtiments professionnels.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {prestationsVedettes.map((slug) => {
              const prestation = prestationsData[slug];
              return (
                <Link
                  key={slug}
                  href={`/prestation/${slug}`}
                  className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
                >
                  <div className="relative aspect-4/3 overflow-hidden">
                    <Image
                      src={prestation.image}
                      alt={`${prestation.title} à ${cityName}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-lg font-bold text-primary">
                      {prestation.title.replace(" par drone", "")} à {cityName}
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-gray-600">
                      {prestation.subtitle}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-secondary">
                      En savoir plus
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Arguments locaux, en vis-à-vis d'une carte d'informations pratiques */}
      <section className="section flex justify-center bg-gray-50">
        <div className="customContainer grid items-start gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-secondary">
              <span className="h-px w-8 shrink-0 bg-secondary" />
              Pourquoi nous confier votre toiture
            </p>
            <h2 className="mb-6 text-3xl font-bold text-primary md:text-4xl">
              Une intervention pensée pour {cityName}
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-gray-700">
              Basés en Haute-Savoie, nous connaissons le climat du secteur{" "}
              {dept.region} : l&apos;humidité, les mousses et les lichens qui
              s&apos;installent sur les toitures exposées. Nos méthodes sont
              adaptées à ces contraintes.
            </p>

            <ul className="space-y-4">
              {[
                `Intervention rapide à ${cityName} : devis sous 24h, chantier sous 72h.`,
                "Aucun contact avec vos surfaces : le drone pulvérise à distance, sans risque de casser une tuile.",
                "Produits biodégradables, sans danger pour votre jardin, vos animaux et vos voisins.",
                "Télépilotes certifiés CATS et Certibiocide, assurés pour le survol de propriétés.",
              ].map((argument) => (
                <li key={argument} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary/10">
                    <Check className="h-3.5 w-3.5 text-secondary" />
                  </span>
                  <span className="text-gray-700">{argument}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-primary">
              <MapPin className="h-5 w-5 text-secondary" />
              Intervention à {cityName}
            </h3>

            <dl className="divide-y divide-gray-100">
              {[
                ["Secteur", `${dept.label} (${cityData.dept})`],
                ["Délai de devis", "24 heures"],
                ["Délai d'intervention", "72 heures"],
                ["Déplacement", "Offert sur le secteur"],
              ].map(([terme, valeur]) => (
                <div
                  key={terme}
                  className="flex items-baseline justify-between gap-4 py-3"
                >
                  <dt className="text-sm text-gray-500">{terme}</dt>
                  <dd className="text-right text-sm font-semibold text-gray-900">
                    {valeur}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 space-y-3">
              <Link
                href="/#contact"
                className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-semibold text-white transition-colors duration-200 hover:bg-primary-400"
              >
                <Mail className="h-4 w-4" />
                Demander un devis
              </Link>
              <a
                href={`tel:${phoneContactRaw}`}
                className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-6 py-3.5 font-semibold text-primary transition-colors duration-200 hover:bg-gray-50"
              >
                <Phone className="h-4 w-4" />
                {phoneContact}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Communes voisines : maillage interne, en pastilles discrètes */}
      {nearbyCities.length > 0 && (
        <section className="section flex justify-center bg-white">
          <div className="customContainer">
            <div className="mb-8 max-w-2xl">
              <h2 className="mb-3 text-2xl font-bold text-primary md:text-3xl">
                Nous intervenons aussi autour de {cityName}
              </h2>
              <p className="text-gray-600">
                Retrouvez nos services dans les communes voisines du secteur{" "}
                {dept.label}.
              </p>
            </div>

            <ul className="flex flex-wrap gap-3">
              {nearbyCities.map((nearby) => (
                <li key={nearby}>
                  <Link
                    href={`/villes/${formatCityUrl(nearby)}`}
                    className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 transition-colors duration-200 hover:border-primary hover:bg-primary-50 hover:text-primary"
                  >
                    <MapPin className="h-3.5 w-3.5 text-secondary" />
                    Nettoyage par drone à {nearby}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/#intervention-zone"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary-400"
                >
                  Toutes nos zones
                  <ArrowRight size={14} />
                </Link>
              </li>
            </ul>
          </div>
        </section>
      )}

      {/* Dernier appel à l'action */}
      <section className="relative flex justify-center overflow-hidden bg-primary py-16 md:py-20">
        <div
          aria-hidden="true"
          className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-secondary/20 blur-3xl"
        />
        <div className="customContainer relative text-center">
          <h2 className="mb-5 text-3xl font-bold text-white md:text-4xl">
            Un projet de nettoyage à {cityName} ?
          </h2>
          <p className="mx-auto mb-9 max-w-2xl text-lg text-primary-50">
            Décrivez-nous votre toiture, votre façade ou votre bâtiment : nous
            revenons vers vous sous 24h avec un devis gratuit et détaillé.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-primary shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-100"
            >
              <Mail className="h-5 w-5" />
              Demander un devis
            </Link>
            <a
              href={`tel:${phoneContactRaw}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/50 px-8 py-4 text-lg font-medium text-white transition-colors duration-300 hover:border-white hover:bg-white/10"
            >
              <Phone className="h-5 w-5" />
              {phoneContact}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
