"use client";

import { revealOnScroll } from "../../customGsap";
import { useEffect } from "react";

const departements = [
  { code: "74", name: "Haute-Savoie" },
  { code: "73", name: "Savoie" },
  { code: "01", name: "Ain" },
  { code: "38", name: "Isère" },
  { code: "39", name: "Jura" },
];

export default function AboutSection() {
  useEffect(() => {
    const tween = revealOnScroll("#a-propos .reveal", "#a-propos");
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section id="a-propos" className="section bg-white flex justify-center">
      <div className="customContainer grid gap-10 md:grid-cols-[5fr_7fr] md:gap-16">
        <h2 className="sectionTitle reveal">
          Le drone va là où une échelle vous mettrait en danger
        </h2>

        <div>
          <div className="space-y-5 text-lg text-ink-2 leading-relaxed">
            <p className="reveal">
              Toitures, façades, bardages, gouttières : le drone atteint les
              surfaces en hauteur sans que personne ne monte. Nous intervenons
              en toute sécurité là où l&apos;homme prendrait des risques, tout
              en préservant les surfaces à nettoyer.
            </p>
            <p className="reveal">
              Que vous soyez particulier ou professionnel, prenez soin de vos
              bâtiments avec une méthode sans danger, respectueuse des
              matériaux et des produits écologiques et biodégradables.
            </p>
          </div>

          <div className="reveal mt-10 pt-6 border-t border-line">
            <p className="text-sm text-ink-3">
              Basés en Haute-Savoie, nous intervenons dans cinq départements
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
              {departements.map((d) => (
                <li key={d.code} className="flex items-center gap-2 text-ink">
                  <span className="font-mono text-xs text-ink-3 px-1.5 py-0.5 rounded-[4px] border border-line tabular-nums">
                    {d.code}
                  </span>
                  {d.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
