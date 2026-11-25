"use client";

import { revealOnScroll } from "../../customGsap";
import { APP_NAME } from "@/lib/constant";
import Image from "next/image";
import { Check } from "lucide-react";
import { useEffect } from "react";

const certifications = [
  {
    title: "Certificat CATS",
    text: "Certificat d'Aptitude Théorique de Télépilote, validé pour exercer en toute légalité",
  },
  {
    title: "Certificat Certibiocide",
    text: "Personnel formé et certifié pour l'utilisation professionnelle des produits biocides, dans le respect de la réglementation",
  },
  {
    title: "Spécialisation nettoyage extérieur",
    text: "Formation délivrée par notre partenaire Flight Academy Certification",
  },
  {
    title: "Conformité et sécurité",
    text: "Respect strict des normes de sécurité sur chaque intervention",
  },
];

export default function CertificationSection() {
  useEffect(() => {
    const tween = revealOnScroll("#certification .reveal", "#certification");
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section id="certification" className="section bg-surface-2">
      <div className="flex justify-center">
        <div className="customContainer grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Texte */}
          <div>
            <h2 className="sectionTitle reveal">
              Des télépilotes certifiés et formés au nettoyage
            </h2>
            <p className="sectionLead reveal">
              Tous nos opérateurs ont obtenu leur CATS et une spécialisation en
              nettoyage extérieur délivrée par Flight Academy Certification
            </p>

            <ul className="mt-10 space-y-6">
              {certifications.map((c) => (
                <li key={c.title} className="reveal flex gap-3">
                  <Check
                    size={18}
                    strokeWidth={1.75}
                    className="mt-0.5 shrink-0 text-primary"
                  />
                  <div>
                    <h3 className="font-medium text-ink">{c.title}</h3>
                    <p className="mt-1 text-[15px] text-ink-2 leading-relaxed">
                      {c.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Justificatifs */}
          <div className="reveal rounded-2xl bg-white border border-line p-8">
            <Image
              src="/certification.png"
              alt={`Certification professionnelle ${APP_NAME}`}
              width={800}
              height={200}
              loading="lazy"
              className="w-full h-auto"
            />

            <div className="mt-8 pt-8 border-t border-line flex items-center gap-6">
              <Image
                src="/certibiocide.png"
                alt="Logo Certibiocide - professionnel certifié pour l'usage de produits biocides"
                width={500}
                height={450}
                loading="lazy"
                className="w-28 h-auto shrink-0"
              />
              <p className="text-sm text-ink-2 leading-relaxed">
                <span className="font-medium text-ink">Certibiocide</span> :
                certification requise pour l&apos;achat et l&apos;utilisation
                professionnelle des produits biocides
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
