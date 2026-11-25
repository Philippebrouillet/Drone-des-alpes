"use client";

import { revealOnScroll } from "../../customGsap";
import { APP_NAME } from "@/lib/constant";
import Image from "next/image";
import { useEffect } from "react";

const fondateurs = [
  {
    name: "Jules Menguy",
    role: "Fondateur",
    photo: "/jules.png",
    alt: `Jules Menguy - Fondateur ${APP_NAME}`,
    bio: "Fort de plusieurs années dans le secteur automobile, Jules a affûté ses compétences commerciales et son sens du relationnel. Son objectif : proposer des offres et des services adaptés à chaque client, avec une priorité donnée à la satisfaction client et à la qualité du service.",
  },
  {
    name: "Samir Lasri",
    role: "Co-fondateur",
    photo: "/samir.png",
    alt: `Samir Lasri - Co-fondateur ${APP_NAME}`,
    bio: "Samir a été Leader Étanchéité pour Dassault Aviation. Il y a développé un haut niveau d'exigence, de rigueur et de contrôle qualité, indispensables dans la conception d'avions de chasse.",
  },
];

export default function FoundersSection() {
  useEffect(() => {
    const tween = revealOnScroll("#fondateurs .reveal", "#fondateurs");
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section id="fondateurs" className="section bg-white">
      <div className="flex justify-center">
        <div className="customContainer">
          <div>
            <h2 className="sectionTitle reveal">
              Jules Menguy et Samir Lasri
            </h2>
            <p className="reveal mt-2 text-ink-3">Gérants et fondateurs</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2 md:gap-8 text-[15px] text-ink-2 leading-relaxed">
              <p className="reveal">
                Amis depuis l&apos;enfance, Samir et Jules partagent depuis
                toujours la même envie : entreprendre ensemble. Après plusieurs
                années d&apos;expériences professionnelles, ils ont uni leurs
                compétences pour créer une entreprise de nettoyage par drone.
              </p>
              <p className="reveal">
                Après une formation complète et une étude approfondie du
                marché, ils mettent aujourd&apos;hui leur savoir-faire au
                service de leurs clients, pour un travail de qualité, sûr et
                durable.
              </p>
            </div>
          </div>

          <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {fondateurs.map((f) => (
              <li
                key={f.name}
                className="reveal rounded-2xl border border-line p-6"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={f.photo}
                    alt={f.alt}
                    width={64}
                    height={64}
                    loading="lazy"
                    className="w-16 h-16 rounded-full object-cover bg-surface-2"
                  />
                  <div>
                    <h3 className="text-lg font-medium text-ink">{f.name}</h3>
                    <p className="text-sm text-ink-3">{f.role}</p>
                  </div>
                </div>
                <p className="mt-5 text-[15px] text-ink-2 leading-relaxed">
                  {f.bio}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
