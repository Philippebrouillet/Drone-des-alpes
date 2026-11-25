import { Metadata } from "next";
import Link from "next/link";
import { Phone, ArrowRight, Check } from "lucide-react";
import CtaBand from "@/lib/components/CtaBand";
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
        <div className="absolute inset-0 bg-linear-to-r from-[#0b1220]/85 via-[#0b1220]/55 to-[#0b1220]/10" />

        <div className="relative flex w-full justify-center">
          <div className="customContainer">
            <nav aria-label="Fil d'Ariane" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-white/70">
                <li>
                  <Link href="/" className="hover:text-white transition-colors duration-150">
                    Accueil
                  </Link>
                </li>
                <li aria-hidden="true" className="text-white/40">/</li>
                <li>
                  <Link
                    href="/#intervention-zone"
                    className="hover:text-white transition-colors duration-150"
                  >
                    Zones d&apos;intervention
                  </Link>
                </li>
                <li aria-hidden="true" className="text-white/40">/</li>
                <li className="text-white" aria-current="page">
                  {cityName}
                </li>
              </ol>
            </nav>

            <p className="mb-6 flex items-center gap-3 text-sm md:text-base text-white/80">
              <span className="h-px w-6 shrink-0 bg-secondary" />
              {dept.label}
              <span className="font-mono text-xs text-white/60 px-1.5 py-0.5 rounded-[4px] border border-white/20 tabular-nums">
                {cityData.dept}
              </span>
            </p>

            <h1 className="max-w-[14em] text-[40px] leading-[1.05] font-medium tracking-[-0.03em] text-white md:text-6xl">
              Nettoyage par drone à {cityName}
            </h1>

            <p className="mt-5 max-w-xl text-lg text-white/80 leading-relaxed md:text-xl">
              Toiture, façade, bâtiment industriel et gouttières : un nettoyage
              réalisé depuis le sol, sans échafaudage ni intervention sur le
              toit
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/#contact"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-[10px] bg-white px-6 font-medium text-primary transition-colors duration-150 hover:bg-primary-50"
              >
                Demander un devis
                <ArrowRight size={16} strokeWidth={1.75} />
              </Link>
              <a
                href={`tel:${phoneContactRaw}`}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-[10px] border border-white/25 px-6 font-medium text-white transition-colors duration-150 hover:bg-white/10"
              >
                <Phone size={16} strokeWidth={1.75} />
                <span className="tabular-nums">{phoneContact}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Prestations : de vraies photos plutôt que des pictogrammes */}
      <section className="section flex justify-center bg-white">
        <div className="customContainer">
          <div className="mb-14">
            <h2 className="sectionTitle">Ce que nous nettoyons à {cityName}</h2>
            <p className="sectionLead">
              {APP_NAME} intervient à {cityName} et dans tout le secteur{" "}
              {dept.label}, sur les maisons individuelles comme sur les
              bâtiments professionnels
            </p>
          </div>

          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {prestationsVedettes.map((slug) => {
              const prestation = prestationsData[slug];
              return (
                <Link
                  key={slug}
                  href={`/prestation/${slug}`}
                  className="group block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-surface-2">
                    <Image
                      src={prestation.image}
                      alt={`${prestation.title} à ${cityName}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <h3 className="mt-5 text-lg font-medium text-ink">
                    {prestation.title.replace(" par drone", "")} à {cityName}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-2">
                    {prestation.subtitle}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[15px] font-medium text-primary">
                    En savoir plus
                    <ArrowRight
                      size={16}
                      strokeWidth={1.75}
                      className="transition-transform duration-150 ease-out-soft group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Arguments locaux, en vis-à-vis d'une fiche d'informations pratiques */}
      <section className="section flex justify-center bg-surface-2">
        <div className="customContainer grid items-start gap-12 lg:grid-cols-[7fr_5fr] lg:gap-16">
          <div>
            <h2 className="sectionTitle">
              Une intervention pensée pour {cityName}
            </h2>
            <p className="sectionLead">
              Basés en Haute-Savoie, nous connaissons le climat du secteur{" "}
              {dept.region} : l&apos;humidité, les mousses et les lichens qui
              s&apos;installent sur les toitures exposées. Nos méthodes sont
              adaptées à ces contraintes.
            </p>

            <ul className="mt-10 divide-y divide-line border-y border-line">
              {[
                `Intervention rapide à ${cityName} : devis sous 24h, chantier sous 72h`,
                "Aucun contact avec vos surfaces : le drone pulvérise à distance, sans risque de casser une tuile",
                "Produits biodégradables, sans danger pour votre jardin, vos animaux et vos voisins",
                "Télépilotes certifiés CATS et Certibiocide, assurés pour le survol de propriétés",
              ].map((argument) => (
                <li
                  key={argument}
                  className="flex items-start gap-3 py-4 text-[17px] text-ink leading-relaxed"
                >
                  <Check
                    size={18}
                    strokeWidth={1.75}
                    className="mt-1 shrink-0 text-primary"
                  />
                  {argument}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-line bg-white p-6 md:p-8">
            <h3 className="text-lg font-medium text-ink">
              Intervention à {cityName}
            </h3>

            <dl className="mt-4 divide-y divide-line">
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
                  <dt className="text-sm text-ink-3">{terme}</dt>
                  <dd className="text-right text-sm text-ink tabular-nums">
                    {valeur}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 space-y-3">
              <Link
                href="/#contact"
                className="flex h-12 items-center justify-center gap-2 rounded-[10px] bg-primary px-6 font-medium text-white transition-colors duration-150 hover:bg-primary-600"
              >
                Demander un devis
              </Link>
              <a
                href={`tel:${phoneContactRaw}`}
                className="flex h-12 items-center justify-center gap-2 rounded-[10px] border border-ink/15 px-6 font-medium text-ink transition-colors duration-150 hover:bg-surface-2"
              >
                <Phone size={16} strokeWidth={1.75} />
                <span className="tabular-nums">{phoneContact}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Communes voisines : maillage interne */}
      {nearbyCities.length > 0 && (
        <section className="section flex justify-center bg-white">
          <div className="customContainer">
            <div className="mb-10">
              <h2 className="sectionTitle">
                Nous intervenons aussi autour de {cityName}
              </h2>
              <p className="sectionLead">
                Nos services dans les communes voisines du secteur {dept.label}
              </p>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 border-t border-line">
              {nearbyCities.map((nearby) => (
                <li key={nearby} className="border-b border-line">
                  <Link
                    href={`/villes/${formatCityUrl(nearby)}`}
                    className="group flex items-center justify-between gap-4 py-4 text-ink hover:text-primary transition-colors duration-150"
                  >
                    Nettoyage par drone à {nearby}
                    <ArrowRight
                      size={16}
                      strokeWidth={1.75}
                      className="shrink-0 text-ink-3 group-hover:text-primary transition-colors duration-150"
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/#intervention-zone"
              className="mt-8 inline-flex items-center gap-2 font-medium text-primary hover:underline underline-offset-4"
            >
              Toutes nos zones d&apos;intervention
              <ArrowRight size={16} strokeWidth={1.75} />
            </Link>
          </div>
        </section>
      )}

      <CtaBand
        title={`Un projet de nettoyage à ${cityName}`}
        text="Décrivez votre toiture, votre façade ou votre bâtiment : nous revenons vers vous sous 24h avec un devis gratuit et détaillé"
      />
    </main>
  );
}
