"use client";

import gsap from "../../customGsap";
import { MapPinCheckIcon } from "lucide-react";
import { useEffect } from "react";

export default function AboutSection() {
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#a-propos",
        start: "top 70%",
      },
    });

    // Titre principal
    tl.fromTo(
      "#a-propos h2",
      { opacity: 0, y: 50, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.2)", // léger overshoot pour un effet dynamique
      }
    )
      // Paragraphes
      .fromTo(
        "#a-propos p",
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.12, // petit décalage entre les paragraphes
          ease: "power3.out",
        },
        "-=0.4" // superposition douce avec le titre
      );
  }, []);
  return (
    <section id="a-propos" className="section bg-white flex justify-center">
      <div className="customContainer text-center">
        {/* Titre principal */}
        <h2 className="text-4xl opacity-0 md:text-5xl font-bold text-primary mb-8 leading-tight">
          Une innovation qui redéfinit les codes du nettoyage
        </h2>

        {/* Paragraphes */}
        <div className="space-y-6 text-lg md:text-xl text-gray-600 leading-relaxed">
          <p className="opacity-0">
            Innovante et performante, la technologie drone redéfinit les codes
            du nettoyage. Grâce à cet outil révolutionnaire, nous intervenons{" "}
            <span className="font-semibold text-primary">
              en toute sécurité
            </span>{" "}
            là où l&apos;homme prendrait des risques, tout en préservant les
            surfaces à nettoyer.
          </p>

          <p className="opacity-0">
            Que vous soyez particulier ou professionnel, prenez soin de vos
            bâtiments avec une méthode{" "}
            <span className="font-semibold text-primary">sans danger</span>,
            respectueuse des matériaux et utilisant des{" "}
            <span className="font-semibold text-primary">
              produits écologiques et biodégradables
            </span>
            .
          </p>
        </div>

        {/* Zone géographique */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="opacity-0 text-base md:text-lg text-gray-700">
            <span className="flex justify-center">
              <span className="font-semibold text-primary flex items-center text-center  gap-2">
                <MapPinCheckIcon /> Basés en Haute-Savoie
              </span>
            </span>
            <br />
            <span className="text-gray-600">
              Nous intervenons également dans l&apos;Ain, la Savoie,
              l&apos;Isère et le Jura, ainsi que le canton de Genève et de Vaud
              en Suisse.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
