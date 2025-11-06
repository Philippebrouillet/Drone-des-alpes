import { notFound } from "next/navigation";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { getPrestationByKey } from "@/lib/services/services";

interface PrestationPageProps {
  params: Promise<{ name: string }>;
}

export async function generateMetadata({
  params,
}: PrestationPageProps): Promise<Metadata> {
  const { name } = await params;
  const prestation = getPrestationByKey(name);

  if (!prestation) {
    return {
      title: "Prestation introuvable | Drone des Alpes",
    };
  }

  return {
    title: `${prestation.title} | Drone des Alpes`,
    description: prestation.description,
  };
}

export default async function PrestationPage({ params }: PrestationPageProps) {
  const { name } = await params;
  const prestation = getPrestationByKey(name);

  if (!prestation) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[550px] w-full overflow-hidden">
        <Image
          src={prestation.image}
          alt={prestation.title}
          fill
          priority
          className="object-cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/70" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="customContainer mx-auto px-6 text-center text-white">
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
            <Link
              href="/"
              className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors duration-200"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
