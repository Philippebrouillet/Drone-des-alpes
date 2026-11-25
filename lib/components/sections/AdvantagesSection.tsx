"use client";

import { Zap, Leaf, EuroIcon, ShieldCheck } from "lucide-react";
import { useEffect } from "react";
import { revealOnScroll } from "../../customGsap";

const advantages = [
  {
    icon: Zap,
    title: "Rapide",
    description:
      "Ni échafaudage ni nacelle à installer : le drone accède aux zones les plus difficiles et cible avec précision les surfaces à traiter.",
  },
  {
    icon: Leaf,
    title: "Écologique",
    description:
      "Exclusivement des produits non abrasifs, écologiques et biodégradables, pour la sécurité de vos biens et de vos proches.",
  },
  {
    icon: EuroIcon,
    title: "Économique",
    description:
      "Sans installations coûteuses à monter, le coût d'intervention baisse nettement par rapport aux méthodes traditionnelles.",
  },
  {
    icon: ShieldCheck,
    title: "Sécurisé",
    description:
      "Personne ne travaille en hauteur : aucun risque de chute. Un périmètre de sécurité est établi autour de chaque zone de vol.",
  },
];

export default function AdvantagesSection() {
  useEffect(() => {
    const tween = revealOnScroll("#avantages .reveal", "#avantages");
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section id="avantages" className="section bg-surface-2">
      <div className="flex justify-center">
        <div className="customContainer">
          <div className="mb-14">
            <h2 className="sectionTitle reveal">
              Les avantages du nettoyage par drone
            </h2>
            <p className="sectionLead reveal">
              Moins d&apos;installation, moins de risques, et des produits qui
              respectent vos matériaux
            </p>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {advantages.map(({ icon: Icon, title, description }) => (
              <li key={title} className="reveal border-t border-ink/15 pt-6">
                <Icon size={20} strokeWidth={1.5} className="text-primary" />
                <h3 className="mt-5 text-lg font-medium text-ink">{title}</h3>
                <p className="mt-2 text-[15px] text-ink-2 leading-relaxed">
                  {description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
