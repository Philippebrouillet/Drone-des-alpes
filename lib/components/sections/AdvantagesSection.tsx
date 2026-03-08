"use client";

import { Zap, Leaf, EuroIcon, ShieldCheck } from "lucide-react";
import { useEffect } from "react";
import gsap from "../../customGsap";

export default function AdvantagesSection() {
  const advantages = [
    {
      icon: Zap,
      title: "Rapide et efficace",
      description:
        "Plus besoin d'échafaudage ni de nacelle : le drone accède facilement à toutes les zones, même les plus difficiles, et cible avec précision les surfaces à traiter.",
    },
    {
      icon: Leaf,
      title: "Écologique",
      description:
        "Nous utilisons exclusivement des produits non abrasifs, écologiques et biodégradables, pour la sécurité de vos biens, de vos proches et même de vos vers de terre !",
    },
    {
      icon: EuroIcon,
      title: "Économique",
      description:
        "L'utilisation du drone supprime les installations coûteuses et superflues, ce qui permet de réduire considérablement les coûts d'intervention par rapport aux méthodes traditionnelles.",
    },
    {
      icon: ShieldCheck,
      title: "Sécurisé",
      description:
        "Aucune intervention humaine en hauteur : zéro risque de chute ou de dégradation. Un périmètre de sécurité est systématiquement établi autour de la zone de vol.",
    },
  ];

  useEffect(() => {
    // Animation du titre
    gsap.fromTo(
      ".advantages-title",
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".advantages-title",
          start: "top 80%",
          once: true,
        },
      }
    );

    // Animation du sous-titre
    gsap.fromTo(
      ".advantages-subtitle",
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".advantages-subtitle",
          start: "top 80%",
          once: true,
        },
      }
    );

    // Animation de chaque carte individuellement
    gsap.utils.toArray(".advantage-card").forEach((card: any) => {
      // Timeline pour chaque carte
      const cardTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          once: true,
        },
      });

      // Animation de la carte container
      cardTimeline
        .fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power3.out",
          }
        )

        // Animation du titre
        .fromTo(
          card.querySelector(".advantage-title"),
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.05"
        )
        // Animation de la description
        .fromTo(
          card.querySelector(".advantage-description"),
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.1"
        );
    });

    // Cleanup
    return () => {
      gsap.killTweensOf(".advantages-title");
      gsap.killTweensOf(".advantages-subtitle");
      gsap.killTweensOf(".advantage-card");
    };
  }, []);

  return (
    <section id="avantages" className="section bg-gray-50">
      <div className="flex justify-center">
        <div className="customContainer">
          {/* Titre de la section */}
          <div className="text-center mb-16">
            <h2 className="advantages-title opacity-0 text-4xl md:text-5xl font-bold text-primary mb-4">
              Les avantages du nettoyage par drone
            </h2>
            <p className="advantages-subtitle opacity-0 text-lg text-gray-600 max-w-2xl mx-auto">
              Une technologie qui combine performance, sécurité et respect de
              l&apos;environnement
            </p>
          </div>

          {/* Grille des avantages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {advantages.map((advantage, index) => {
              const Icon = advantage.icon;
              return (
                <div
                  key={index}
                  className="advantage-card opacity-0 bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Icône avec background */}
                  <div className="advantage-icon w-16 h-16 bg-primary rounded-full flex items-center border-2 border-secondary justify-center mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Titre */}
                  <h3 className="advantage-title text-2xl font-bold text-primary mb-4">
                    {advantage.title}
                  </h3>

                  {/* Description */}
                  <p className="advantage-description text-gray-600 leading-relaxed">
                    {advantage.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
