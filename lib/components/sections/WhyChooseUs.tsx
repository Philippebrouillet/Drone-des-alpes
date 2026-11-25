"use client";

import { revealOnScroll } from "../../customGsap";
import { APP_NAME } from "@/lib/constant";
import { Clock, Building, Zap } from "lucide-react";
import { useEffect } from "react";

const raisons = [
  {
    icon: Clock,
    title: "Plage horaire étendue",
    paragraphs: [
      "Nous pouvons intervenir sans votre présence à domicile, pour ne pas perturber votre quotidien.",
      "Pour les professionnels dont les sites accueillent beaucoup de salariés, nous intervenons aussi le samedi et le dimanche.",
    ],
  },
  {
    icon: Building,
    title: "Tous types de bâtiments",
    paragraphs: [
      "Maison individuelle, entreprise, collectivité, monument, pont : notre drone peut intervenir sur tous types de bâtiments et de surfaces.",
      "Nous travaillons pour des clients de toutes tailles et cherchons une solution et un budget adaptés à chaque demande.",
    ],
  },
  {
    icon: Zap,
    title: "Réponse rapide",
    paragraphs: [
      "Dans la mesure du possible, nous répondons à toute demande de devis sous 48 heures.",
      "Nous appliquons la même réactivité aux demandes d'intervention urgentes.",
    ],
  },
];

export default function WhyChooseUs() {
  useEffect(() => {
    const tween = revealOnScroll("#why-us .reveal", "#why-us");
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section id="why-us" className="section bg-white">
      <div className="flex justify-center">
        <div className="customContainer">
          <div className="mb-14">
            <h2 className="sectionTitle reveal">
              Pourquoi choisir {APP_NAME}
            </h2>
            <p className="sectionLead reveal">
              Un service flexible et réactif, adapté à vos contraintes
            </p>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10">
            {raisons.map(({ icon: Icon, title, paragraphs }) => (
              <li key={title} className="reveal border-t border-ink/15 pt-6">
                <Icon size={20} strokeWidth={1.5} className="text-primary" />
                <h3 className="mt-5 text-lg font-medium text-ink">{title}</h3>
                <div className="mt-2 space-y-3 text-[15px] text-ink-2 leading-relaxed">
                  {paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
