"use client";

import { useState, useEffect } from "react";
import { MapPin, ChevronDown, ChevronUp } from "lucide-react";
import gsap from "../../customGsap";

import {
  cityCoordinates,
  departments,
  formatCityUrl,
} from "@/lib/services/interventionZone";
import Link from "next/link";
import LazyComponentLoader from "../LazyComponentLoader";

export default function InterventionZone() {
  const [expandedDept, setExpandedDept] = useState<string | null>(null);

  const toggleDepartment = (code: string) => {
    setExpandedDept(expandedDept === code ? null : code);

    // Animation lors de l'ouverture du département
    if (expandedDept !== code) {
      // Utiliser setTimeout pour laisser le DOM se mettre à jour
      setTimeout(() => {
        const expandedCard = document.querySelector(
          `[data-dept-code="${code}"] .dept-cities`,
        );
        if (expandedCard) {
          const cities = expandedCard.querySelectorAll(".city-item");

          gsap.fromTo(
            cities,
            { opacity: 0, y: 15, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.4,
              stagger: 0.03,
              ease: "power2.out",
            },
          );
        }
      }, 50);
    }
  };

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
            <h2 className="zone-title text-4xl md:text-5xl font-bold text-primary mb-4 opacity-0">
              Zone d&apos;intervention
            </h2>
            <p className="zone-paragraph-1 text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto mb-6 opacity-0">
              Nous intervenons en{" "}
              <span className="font-semibold text-primary">
                Haute-Savoie, Ain, Jura, Isère, Savoie et Suisse (Genève, Vaud)
              </span>{" "}
              pour le nettoyage par drone de : toiture, façade, terrasse,
              gouttières et panneaux solaires. Grâce à notre technologie, nous
              réalisons des interventions{" "}
              <span className="font-semibold text-primary">
                rapides, sécurisées et écologiques
              </span>
              , sans échafaudage ni risque pour vos surfaces.
            </p>
            <p className="zone-paragraph-2 text-gray-600 opacity-0">
              Découvrez ci-dessous la liste complète de nos zones
              d&apos;intervention en France et en Suisse. Pour une prestation
              locale et professionnelle, demandez votre devis gratuit.
            </p>
          </div>{" "}
          {/* Carte Google Maps */}
          <div className="zone-map mb-16 opacity-0">
            <LazyComponentLoader componentName="GoogleMapComponent" />
          </div>
          {/* Liste détaillée des villes par département */}
          <div className="mx-auto space-y-4 overflow-x-hidden">
            {departments.map((dept) => (
              <div
                key={dept.code}
                data-dept-code={dept.code}
                className="dept-card bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden opacity-0"
              >
                <button
                  onClick={() => toggleDepartment(dept.code)}
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

                {expandedDept === dept.code && (
                  <div className="dept-cities px-6 py-6 bg-gray-50 border-t border-gray-200">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {dept.cities.map((city) => {
                        const cityData = cityCoordinates[city];
                        const hasPage = !!cityData; // Vérifier si la ville a une page dédiée

                        return hasPage ? (
                          <Link
                            key={city}
                            href={`/villes/${formatCityUrl(city)}`}
                            className="city-item flex items-center gap-2 text-gray-700 hover:text-primary text-sm transition-colors duration-200 hover:underline opacity-0"
                          >
                            <MapPin className="w-3 h-3 text-primary shrink-0" />
                            <span>{city}</span>
                          </Link>
                        ) : (
                          <div
                            key={city}
                            className="city-item flex items-center gap-2 text-gray-700 text-sm opacity-0"
                          >
                            <MapPin className="w-3 h-3 text-primary shrink-0" />
                            <span>{city}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
