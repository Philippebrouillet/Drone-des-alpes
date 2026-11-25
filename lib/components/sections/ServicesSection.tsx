"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";
import { useEffect } from "react";
import { revealOnScroll } from "../../customGsap";

interface ServiceData {
  image: string;
  title: string;
  href: string;
}

interface ServicesProps {
  mutualServicesData: Record<
    | "roofCleaning"
    | "facadeCleaning"
    | "industrialBuildingCleaning"
    | "gutterCleaning",
    ServiceData
  >;
}

export default function ServicesSection({ mutualServicesData }: ServicesProps) {
  const services = [
    {
      ...mutualServicesData.roofCleaning,
      description:
        "Sans entretien, la mousse et les lichens favorisent les infiltrations d'eau et diminuent les performances énergétiques de la maison. Le démoussage par drone est rapide, économique et écologique.",
    },
    {
      ...mutualServicesData.facadeCleaning,
      description:
        "La pollution, les intempéries et les mousses ternissent les murs extérieurs. Un nettoyage régulier prévient la dégradation des matériaux et valorise votre bien.",
    },
    {
      ...mutualServicesData.industrialBuildingCleaning,
      description:
        "Bardages, silos et grandes surfaces difficiles d'accès. Moins de personnel exposé au travail en hauteur et une immobilisation minimale de vos zones de travail.",
    },
    {
      ...mutualServicesData.gutterCleaning,
      description:
        "Des gouttières encrassées provoquent infiltrations et humidité. Notre aspirateur professionnel retire débris, mousses et feuilles, sans risque pour vous.",
    },
  ];

  useEffect(() => {
    const tween = revealOnScroll("#services .reveal", "#services");
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section id="services" className="section bg-white">
      <div className="flex justify-center">
        <div className="customContainer">
          <div className="mb-14">
            <h2 className="sectionTitle reveal">Nos prestations</h2>
            <p className="sectionLead reveal">
              Quatre interventions, pour les particuliers comme pour les
              professionnels
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                aria-label={`En savoir plus sur ${service.title}`}
                className="reveal group block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-surface-2">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-5 text-xl font-medium text-ink">
                  {service.title.charAt(0) + service.title.slice(1).toLowerCase()}
                </h3>
                <p className="mt-2 text-[15px] text-ink-2 leading-relaxed line-clamp-3">
                  {service.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-[15px] font-medium text-primary">
                  En savoir plus
                  <ArrowRightIcon
                    size={16}
                    strokeWidth={1.75}
                    className="transition-transform duration-150 ease-out-soft group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
