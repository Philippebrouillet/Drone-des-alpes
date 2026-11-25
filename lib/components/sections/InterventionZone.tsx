"use client";

import { useState, useEffect, useLayoutEffect } from "react";
import { ChevronDown } from "lucide-react";
import gsap, { revealOnScroll } from "../../customGsap";

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

// Les noms sont stockés en capitales : « HAUTE-SAVOIE » → « Haute-Savoie »
const formatDeptName = (name: string) =>
  name
    .toLowerCase()
    .replace(/(^|[\s-])(\p{L})/gu, (_, sep, letter) => sep + letter.toUpperCase());

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
      { opacity: 0, y: 6 },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.01,
        ease: "power3.out",
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
    const tween = revealOnScroll(
      "#intervention-zone .zone-reveal",
      "#intervention-zone",
    );
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section id="intervention-zone" className="section bg-gray-50">
      <div className="flex justify-center">
        <div className="customContainer">
          <div className="mb-12 max-w-3xl">
            <h2 className="sectionTitle zone-reveal reveal">
              Zone d&apos;intervention
            </h2>
            <p className="sectionLead zone-reveal reveal max-w-2xl">
              Nous intervenons en Haute-Savoie, Savoie, Ain, Isère et Jura pour
              le nettoyage par drone de toitures, façades, terrasses, gouttières
              et bâtiments industriels. Choisissez votre département pour voir
              les villes desservies.
            </p>
          </div>
          {/* Carte Google Maps */}
          <div className="zone-map zone-reveal reveal mb-12 overflow-hidden rounded-2xl border border-line">
            <LazyComponentLoader componentName="GoogleMapComponent" />
          </div>
          {/* Liste détaillée des villes par département */}
          <div className="rounded-2xl bg-white border border-line overflow-hidden divide-y divide-line">
            {departments.map((dept) => (
              <div
                key={dept.code}
                data-dept-code={dept.code}
                className="dept-card"
              >
                <button
                  onClick={() => toggleDepartment(dept.code)}
                  aria-expanded={expandedDept === dept.code}
                  aria-controls={`dept-cities-${dept.code}`}
                  className="w-full px-5 py-4 flex items-center justify-between hover:bg-surface-2 transition-colors duration-150 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-sm text-ink-3 w-10 h-8 flex items-center justify-center rounded-md border border-line tabular-nums">
                      {dept.code}
                    </span>
                    <h3 className="text-lg font-medium text-ink text-left">
                      {formatDeptName(dept.name)}
                    </h3>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <p className="hidden sm:block font-mono text-sm text-ink-3 tabular-nums">
                      {dept.cities.length} villes
                    </p>
                    <ChevronDown
                      size={18}
                      strokeWidth={1.75}
                      className={`text-ink-3 transition-transform duration-200 ease-out-soft ${
                        expandedDept === dept.code ? "rotate-180" : ""
                      }`}
                    />
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
                  className="dept-cities px-5 py-6 bg-surface-2 border-t border-line"
                >
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-3">
                    {dept.cities.map((city) => {
                      const cityData = cityCoordinates[city];
                      const hasPage = !!cityData; // Vérifier si la ville a une page dédiée

                      return hasPage ? (
                        <Link
                          key={city}
                          href={`/villes/${formatCityUrl(city)}`}
                          title={`Nettoyage par drone à ${city}`}
                          className="city-item reveal text-ink-2 hover:text-primary text-sm transition-colors duration-150 hover:underline underline-offset-4"
                        >
                          {city}
                        </Link>
                      ) : (
                        <div
                          key={city}
                          className="city-item reveal text-ink-3 text-sm"
                        >
                          {city}
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
