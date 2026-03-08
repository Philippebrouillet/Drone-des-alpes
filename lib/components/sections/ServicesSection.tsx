"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRightIcon,
  Building2,
  Droplets,
  HomeIcon,
  Sun,
} from "lucide-react";
import { useEffect } from "react";
import gsap from "../../customGsap";

interface ServicesProps {
  mutualServicesData: any;
}
const sectionName = "services";
const sectionId = "#" + sectionName;

export default function ServicesSection({ mutualServicesData }: ServicesProps) {
  const services = [
    {
      ...mutualServicesData.roofCleaning,
      icon: HomeIcon,
      shortDescription:
        "Nettoyage de toiture par drone : rapide, économique et écologique",
      description:
        "Souvent repoussé, le nettoyage de la toiture est pourtant essentiel à la longévité de votre maison. Votre toiture protège votre maison des intempéries. Sans entretien, la mousse et les lichens favorisent les infiltrations d'eau et diminuent les performances énergétiques.",
    },
    {
      ...mutualServicesData.facadeCleaning,
      icon: Building2,
      shortDescription:
        "Protégez et sublimez votre maison par la voie des airs",
      description:
        "Avec le temps, la pollution, les intempéries et les mousses ternissent vos murs extérieurs. Un nettoyage régulier permet de prévenir la dégradation des matériaux et de conserver une isolation optimale tout en valorisant votre bien immobilier.",
    },
    {
      ...mutualServicesData.solarPannelCleaning,
      icon: Sun,
      shortDescription: "Optimisez votre rendement énergétique jusqu'à +20%",
      description:
        "Vos panneaux solaires sont un investissement important. La poussière, les feuilles et la pollution peuvent réduire leur rendement jusqu'à 20%. Entretenir régulièrement vos panneaux permet de maximiser votre production d'énergie et d'allonger leur durée de vie.",
    },
    {
      ...mutualServicesData.gutterCleaning,
      icon: Droplets,
      shortDescription: "Prévenez les infiltrations et protégez votre façade",
      description:
        "Des gouttières encrassées peuvent provoquer des infiltrations et des problèmes d'humidité. Nous intervenons avec un aspirateur professionnel pour éliminer complètement les débris, mousses et feuilles, sans risque pour vous.",
    },
  ];

  useEffect(() => {
    // Animation du titre et sous-titre
    const headerTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionId,
        start: "top 80%",
        once: true,
      },
      defaults: { ease: "power3.out" },
    });

    headerTimeline
      .fromTo(
        `${sectionId} h2`,
        { opacity: 0, y: 40, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5 },
      )
      .fromTo(
        `${sectionId} .services-subtitle`,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.4 },
        "-=0.3",
      );

    // Animation individuelle pour chaque carte avec timeline interne
    gsap.utils.toArray(".service-card").forEach((card: any) => {
      const cardTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          once: true,
        },
      });

      // Animation du container de la carte
      cardTimeline.fromTo(
        card,
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
          rotateY: -15,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateY: 0,
          duration: 0.6,
          ease: "back.out(1.3)",
        },
      );

      // Animation de l'image avec effet parallaxe
      cardTimeline.fromTo(
        card.querySelector(".service-image"),
        {
          scale: 1.1,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.5",
      );

      // Animation de l'icône avec rotation spectaculaire
      cardTimeline.fromTo(
        card.querySelector(".service-icon"),
        {
          scale: 0,
          rotation: -180,
          opacity: 0,
        },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(2)",
        },
        "-=0.6",
      );

      // Animation du titre
      cardTimeline.fromTo(
        card.querySelector(".service-title"),
        {
          x: -30,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.4",
      );

      // Animation de la description courte
      cardTimeline.fromTo(
        card.querySelector(".service-short-desc"),
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.3",
      );

      // Animation de la description longue
      cardTimeline.fromTo(
        card.querySelector(".service-description"),
        {
          y: 15,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.25",
      );

      // Animation du bouton avec effet bounce
      cardTimeline.fromTo(
        card.querySelector(".service-button"),
        {
          scale: 0.8,
          opacity: 0,
          y: 10,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "back.out(1.5)",
        },
        "-=0.2",
      );
    });

    // Cleanup
    return () => {
      gsap.killTweensOf(".service-card");
      gsap.killTweensOf(".service-image");
      gsap.killTweensOf(".service-icon");
      gsap.killTweensOf(".service-title");
      gsap.killTweensOf(".service-short-desc");
      gsap.killTweensOf(".service-description");
      gsap.killTweensOf(".service-button");
      gsap.killTweensOf(".services-title");
      gsap.killTweensOf(".services-subtitle");
    };
  }, []);

  return (
    <section id={sectionName} className="section bg-white overflow-x-hidden">
      <div className="flex justify-center">
        <div className="customContainer">
          {/* Titre de la section */}
          <div className="text-center mb-16">
            <h2 className="services-title text-4xl md:text-5xl font-bold text-primary mb-4 opacity-0">
              Nos prestations
            </h2>
            <p className="services-subtitle text-lg text-gray-600 max-w-2xl mx-auto opacity-0">
              Des solutions professionnelles adaptées à tous vos besoins de
              nettoyage
            </p>
          </div>

          {/* Grille des services */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="service-card group opacity-0 bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      sizes="auto"
                      fill
                      loading="lazy"
                      className="service-image object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Overlay avec icône */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute bottom-6 left-6 flex items-center gap-3">
                      <div className="service-icon p-3 bg-white rounded-full border-2 border-primary flex items-center justify-center">
                        <Icon size={24} className="text-primary" />
                      </div>
                      <h3 className="service-title text-2xl font-bold text-white">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="p-8">
                    <p className="service-short-desc text-gray-600 mb-4 font-medium">
                      {service.shortDescription}
                    </p>
                    <p className="service-description text-gray-600 leading-relaxed mb-6 line-clamp-3">
                      {service.description}
                    </p>

                    {/* Bouton */}
                    <Link
                      href={service.href}
                      aria-label={`En savoir plus sur ${service.title}`}
                      className="service-button inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300"
                    >
                      En savoir plus
                      <ArrowRightIcon size={16} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
