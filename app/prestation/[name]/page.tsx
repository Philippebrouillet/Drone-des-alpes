import { notFound } from "next/navigation";
import Image from "next/image";
import { Check } from "lucide-react";
import CtaBand from "@/lib/components/CtaBand";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getPrestationByKey,
  prestationsData,
} from "@/lib/services/services";
import { APP_NAME, prodUrl } from "@/lib/constant";
import { breadcrumbSchema, prestationSchema } from "@/lib/schema";
import BeforeAfterSection from "@/lib/components/sections/BeforeAfterSection";
import VideoSection from "@/lib/components/sections/VideoSection";

interface PrestationPageProps {
  params: Promise<{ name: string }>;
}

// Prérendu au build : ces 4 pages sont les plus stratégiques du site.
export async function generateStaticParams() {
  return Object.keys(prestationsData).map((name) => ({ name }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PrestationPageProps): Promise<Metadata> {
  const { name } = await params;
  const prestation = getPrestationByKey(name);

  if (!prestation) {
    return {
      title: `Prestation introuvable | ${APP_NAME}`,
    };
  }

  return {
    // Le nom de marque est ajouté par le `template` du layout : ne pas le répéter.
    title: prestation.title,
    description: prestation.description.slice(0, 155),
    alternates: {
      canonical: `/prestation/${name}`,
    },
    openGraph: {
      title: `${prestation.title} | ${APP_NAME}`,
      description: prestation.description.slice(0, 200),
      type: "website",
      url: `${prodUrl}/prestation/${name}`,
      images: [{ url: prestation.image, alt: prestation.title }],
    },
  };
}

export default async function PrestationPage({ params }: PrestationPageProps) {
  const { name } = await params;
  const prestation = getPrestationByKey(name);

  if (!prestation) {
    notFound();
  }

  const jsonLd = [
    prestationSchema({
      title: prestation.title,
      description: prestation.description,
      url: `${prodUrl}/prestation/${name}`,
      image: prestation.image,
    }),
    breadcrumbSchema([
      { name: "Accueil", url: prodUrl },
      { name: "Nos prestations", url: `${prodUrl}/#services` },
      { name: prestation.title, url: `${prodUrl}/prestation/${name}` },
    ]),
  ];

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero : photo de la prestation, texte aligné à gauche comme l'accueil */}
      <section className="relative h-[60vh] min-h-[520px] w-full overflow-hidden">
        <Image
          src={prestation.image}
          alt={`${prestation.title} - ${APP_NAME}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#0b1220]/85 via-[#0b1220]/55 to-[#0b1220]/10" />

        <div className="absolute inset-0 flex items-end justify-center pb-16 md:pb-20">
          <div className="customContainer text-white">
            <nav aria-label="Fil d'Ariane" className="mb-6">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-white/70">
                <li>
                  <Link href="/" className="hover:text-white transition-colors duration-150">
                    Accueil
                  </Link>
                </li>
                <li aria-hidden="true" className="text-white/40">/</li>
                <li>
                  <Link
                    href="/#services"
                    className="hover:text-white transition-colors duration-150"
                  >
                    Nos prestations
                  </Link>
                </li>
                <li aria-hidden="true" className="text-white/40">/</li>
                <li className="text-white" aria-current="page">
                  {prestation.title}
                </li>
              </ol>
            </nav>
            <h1 className="text-[40px] md:text-6xl font-medium leading-[1.05] tracking-[-0.03em] max-w-[14em]">
              {prestation.title}
            </h1>
            <p className="mt-5 text-lg md:text-xl text-white/80 max-w-xl leading-relaxed">
              {prestation.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Description et contenu : titre à gauche, texte à droite */}
      <section className="section flex justify-center">
        <div className="customContainer">
          <p className="max-w-3xl text-xl md:text-2xl text-ink leading-relaxed tracking-[-0.01em]">
            {prestation.description}
          </p>

          <div className="mt-16 md:mt-20 divide-y divide-line border-y border-line">
            {prestation.sections.map((section) => (
              <div
                key={section.title}
                className="grid gap-4 md:grid-cols-[5fr_7fr] md:gap-16 py-10"
              >
                <h2 className="text-2xl font-medium text-primary leading-snug tracking-[-0.02em] text-balance">
                  {section.title}
                </h2>
                <div>
                  <p className="text-[17px] text-ink-2 leading-relaxed">
                    {section.content}
                  </p>
                  {section.list && (
                    <ul className="mt-5 space-y-3">
                      {section.list.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-[17px] text-ink-2 leading-relaxed"
                        >
                          <Check
                            size={18}
                            strokeWidth={1.75}
                            className="text-primary shrink-0 mt-1"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Avant / après, si la prestation a des comparaisons */}
      <BeforeAfterSection
        comparisons={prestation.comparisons}
        background="bg-surface-2"
        subtitle="Faites glisser le curseur sur une intervention réelle"
      />

      {/* Vidéo d'intervention, si la prestation en a une */}
      <VideoSection video={prestation.video} />

      {/* Les avantages */}
      <section className="section bg-surface-2 flex justify-center">
        <div className="customContainer grid gap-10 md:grid-cols-[5fr_7fr] md:gap-16">
          <h2 className="sectionTitle">Les avantages du nettoyage par drone</h2>
          <ul className="divide-y divide-line border-y border-line">
            {prestation.advantages.map((advantage) => (
              <li
                key={advantage}
                className="flex items-start gap-3 py-4 text-[17px] text-ink"
              >
                <Check
                  size={18}
                  strokeWidth={1.75}
                  className="text-primary shrink-0 mt-1"
                />
                {advantage}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
