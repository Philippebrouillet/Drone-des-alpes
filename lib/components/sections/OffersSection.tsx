"use client";

import { revealOnScroll } from "../../customGsap";
import { useEffect } from "react";

const paliers = [
  { label: "2 à 5 maisons", remise: "10 %" },
  { label: "5 à 10 maisons", remise: "15 %" },
  { label: "10 maisons et plus", remise: "20 %" },
];

export default function OffersSection() {
  useEffect(() => {
    const tween = revealOnScroll("#offres .reveal", "#offres");
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section id="offres" className="section bg-surface-2">
      <div className="flex justify-center">
        <div className="customContainer grid gap-10 md:grid-cols-[5fr_7fr] md:gap-16 md:items-start">
          <div>
            <h2 className="sectionTitle reveal">Nos offres</h2>
            <p className="sectionLead reveal">
              Offre groupement : plus vous êtes nombreux, plus vous économisez
            </p>
          </div>

          <div className="reveal rounded-2xl bg-white border border-line p-2">
            <p className="px-4 pt-3 pb-2 text-sm text-ink-3">
              Remise selon le nombre de maisons regroupées
            </p>
            <ul>
              {paliers.map((p) => (
                <li
                  key={p.label}
                  className="flex items-center justify-between px-4 py-4 border-t border-line"
                >
                  <span className="text-ink">{p.label}</span>
                  <span className="text-lg font-medium text-primary tabular-nums">
                    −{p.remise}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
