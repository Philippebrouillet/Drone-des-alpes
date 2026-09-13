import { notFound } from "next/navigation";
import Image from "next/image";
import { CheckCircle2, Phone } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getPrestationByKey,
  prestationsData,
} from "@/lib/services/services";
import {
  APP_NAME,
  phoneContact,
  phoneContactRaw,
  prodUrl,
} from "@/lib/constant";
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

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[550px] w-full overflow-hidden">
        <Image
          src={prestation.image}
          alt={`${prestation.title} - ${APP_NAME}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/70" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="customContainer mx-auto px-6 text-center text-white">
            <nav aria-label="Fil d'Ariane" className="mb-6">
              <ol className="flex flex-wrap items-center justify-center gap-2 text-sm text-white/80">
                <li>
                  <Link href="/" className="hover:text-white hover:underline">
                    Accueil
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link
                    href="/#services"
                    className="hover:text-white hover:underline"
                  >
                    Nos prestations
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-white font-medium" aria-current="page">
                  {prestation.title}
                </li>
              </ol>
            </nav>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
              {prestation.title}
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto drop-shadow-md">
              {prestation.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Description principale */}
      <section className="py-16 md:py-20 bg-gray-50 flex justify-center">
        <div className="customContainer ">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg md:text-xl leading-relaxed text-gray-700">
              {prestation.description}
            </p>
          </div>
        </div>
      </section>

      {/* Sections de contenu */}
      <section className="py-16 md:py-20  flex justify-center">
        <div className="customContainer ">
          <div className="max-w-4xl mx-auto space-y-12">
            {prestation.sections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-primary">
                  {section.title}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {section.content}
                </p>
                {section.list && (
                  <ul className="space-y-3 mt-4">
                    {section.list.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-gray-700"
                      >
                        <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                        <span className="text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Avant / après, si la prestation a des comparaisons */}
      <BeforeAfterSection
        comparisons={prestation.comparisons}
        subtitle={`Faites glisser le curseur pour découvrir le résultat d'une intervention : ${prestation.title.toLowerCase()}`}
      />

      {/* Vidéo d'intervention, si la prestation en a une */}
      <VideoSection video={prestation.video} />

      {/* Les avantages */}
      <section className="py-16 md:py-20 bg-gray-50  flex justify-center">
        <div className="customContainer ">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
              Les avantages du nettoyage par drone
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {prestation.advantages.map((advantage, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg border border-gray-200 hover:border-secondary transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <p className="text-lg text-gray-700 font-medium">
                      {advantage}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-linear-to-br bg-primary flex justify-center">
        <div className="customContainer text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Prêt à commencer ?
          </h2>
          <p className="text-xl text-primary-50 mb-8 max-w-2xl mx-auto">
            Demandez votre devis gratuit dès maintenant et bénéficiez de notre
            expertise en nettoyage par drone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contact"
              className="inline-block bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Demander un devis gratuit
            </Link>
            <a
              href={`tel:${phoneContactRaw}`}
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors duration-200"
            >
              <Phone className="w-5 h-5" />
              {phoneContact}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
