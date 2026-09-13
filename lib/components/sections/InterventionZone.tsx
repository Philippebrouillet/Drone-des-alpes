"use client";

import { useState, useEffect, useLayoutEffect } from "react";
import { MapPin, ChevronDown, ChevronUp } from "lucide-react";
import gsap from "../../customGsap";

import {
  cityCoordinates,
  departments,
  formatCityUrl,
} from "@/lib/services/interventionZone";
import Link from "next/link";
import LazyComponentLoader from "../LazyComponentLoader";

// useLayoutEffect n'existe pas au rendu serveur : on retombe sur useEffect
// pour éviter l'avertissement React pendant le SSR.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function InterventionZone() {
  const [expandedDept, setExpandedDept] = useState<string | null>(null);

  const toggleDepartment = (code: string) => {
    setExpandedDept(expandedDept === code ? null : code);
  };

  /*
    L'animation d'ouverture est jouée depuis un effet de layout plutôt que
    depuis le gestionnaire de clic : le DOM y est déjà à jour et rien n'est
    encore peint, ce qui évite l'image intermédiaire où les villes
    apparaissent d'un coup avant d'être reprises par l'animation.
  */
  useIsomorphicLayoutEffect(() => {
    if (!expandedDept) return;

    const container = document.querySelector(
      `[data-dept-code="${expandedDept}"] .dept-cities`,
    );
    if (!container) return;

    const cities = container.querySelectorAll(".city-item");
    const tween = gsap.fromTo(
      cities,
      { opacity: 0, y: 15, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        stagger: 0.03,
        ease: "power2.out",
        overwrite: "auto",
      },
    );

    return () => {
      tween.kill();
      // Réinitialise les styles posés par GSAP pour que la prochaine
      // ouverture reparte d'un état propre.
      gsap.set(cities, { clearProps: "opacity,transform" });
    };
  }, [expandedDept]);

  useEffect(() => {
    const sectionId = "#intervention-zone";

    // Animation du header (titre + paragraphes)
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionId,
        start: "top 80%",
        once: true,
      },
    });

    headerTl
      .fromTo(
        `${sectionId} .zone-title`,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out" },
      )
      .fromTo(
        `${sectionId} .zone-paragraph-1`,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.4",
      )
      .fromTo(
        `${sectionId} .zone-paragraph-2`,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.3",
      );

    // Animation de la carte Google Maps
    gsap.fromTo(
      `${sectionId} .zone-map`,
      { opacity: 0, y: 60, scale: 0.92 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: `${sectionId} .zone-map`,
          start: "top 85%",
          once: true,
        },
      },
    );

    // Animation individuelle pour chaque carte de département
    gsap.utils.toArray(".dept-card").forEach((card: any, index: number) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          x: index % 2 === 0 ? -50 : 50, // Alternance gauche/droite
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "back.out(1.3)",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            once: true,
          },
        },
      );

      // Animation du badge du code département
      const badge = card.querySelector(".dept-badge");
      if (badge) {
        gsap.fromTo(
          badge,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.6,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              once: true,
            },
          },
        );
      }
    });

    // Cleanup
    return () => {
      gsap.killTweensOf(`${sectionId} .zone-title`);
      gsap.killTweensOf(`${sectionId} .zone-paragraph-1`);
      gsap.killTweensOf(`${sectionId} .zone-paragraph-2`);
      gsap.killTweensOf(`${sectionId} .zone-map`);
      gsap.killTweensOf(".dept-card");
    };
  }, []);

  return (
    <section id="intervention-zone" className="section bg-gray-50">
      <div className="flex justify-center">
        <div className="customContainer">
          {/* En-tête */}
          <div className="text-center mb-16">
            <h2 className="zone-title text-4xl md:text-5xl font-bold text-primary mb-4 reveal">
              Zone d&apos;intervention
            </h2>
            <p className="zone-paragraph-1 text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto mb-6 reveal">
              Nous intervenons en{" "}
              <span className="font-semibold text-primary">
                Haute-Savoie, Savoie, Ain, Isère et Jura
              </span>{" "}
              pour le nettoyage par drone de : toiture, façade, terrasse,
              gouttières et bâtiment industriel. Grâce à notre technologie, nous
              réalisons des interventions{" "}
              <span className="font-semibold text-primary">
                rapides, sécurisées et écologiques
              </span>
              , sans échafaudage ni risque pour vos surfaces.
            </p>
            <p className="zone-paragraph-2 text-gray-600 reveal">
              Découvrez ci-dessous la liste complète de nos zones
              d&apos;intervention. Pour une prestation locale et
              professionnelle, demandez votre devis gratuit.
            </p>
          </div>{" "}
          {/* Carte Google Maps */}
          <div className="zone-map mb-16 reveal">
            <LazyComponentLoader componentName="GoogleMapComponent" />
          </div>
          {/* Liste détaillée des villes par département */}
          <div className="mx-auto space-y-4 overflow-x-hidden">
            {departments.map((dept) => (
              <div
                key={dept.code}
                data-dept-code={dept.code}
                className="dept-card bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden reveal"
              >
                <button
                  onClick={() => toggleDepartment(dept.code)}
                  aria-expanded={expandedDept === dept.code}
                  aria-controls={`dept-cities-${dept.code}`}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`dept-badge ${dept.color} text-white font-bold text-lg px-4 py-2 rounded-lg`}
                    >
                      {dept.code}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary text-left">
                        {dept.name}
                      </h3>
                      <p className="text-sm text-gray-500 whitespace-nowrap text-left">
                        {dept.cities.length} villes desservies
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0">
                    {expandedDept === dept.code ? (
                      <ChevronUp className="w-6 h-6 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                </button>

                {/*
                  Le contenu est toujours rendu dans le HTML (masqué en CSS) :
                  monté conditionnellement, les liens vers les pages villes
                  n'existaient pas dans la page servie et ces pages restaient
                  orphelines pour les moteurs de recherche.
                */}
                <div
                  id={`dept-cities-${dept.code}`}
                  hidden={expandedDept !== dept.code}
                  className="dept-cities px-6 py-6 bg-gray-50 border-t border-gray-200"
                >
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {dept.cities.map((city) => {
                      const cityData = cityCoordinates[city];
                      const hasPage = !!cityData; // Vérifier si la ville a une page dédiée

                      return hasPage ? (
                        <Link
                          key={city}
                          href={`/villes/${formatCityUrl(city)}`}
                          title={`Nettoyage par drone à ${city}`}
                          className="city-item reveal flex items-center gap-2 text-gray-700 hover:text-primary text-sm transition-colors duration-200 hover:underline"
                        >
                          <MapPin className="w-3 h-3 text-primary shrink-0" />
                          <span>{city}</span>
                        </Link>
                      ) : (
                        <div
                          key={city}
                          className="city-item reveal flex items-center gap-2 text-gray-700 text-sm"
                        >
                          <MapPin className="w-3 h-3 text-primary shrink-0" />
                          <span>{city}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
