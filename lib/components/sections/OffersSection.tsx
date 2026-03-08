"use client";

import gsap from "../../customGsap";
import { Users, Gift, Sparkles, Check } from "lucide-react";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const sectionName = "offres";
const sectionId = `#offres`;

export default function OffersSection() {
  useEffect(() => {
    ScrollTrigger.refresh();
    // Animation pour le titre et sous-titre
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionId,
        start: "top 80%",
        once: true,
      },
    });

    headerTl
      .fromTo(
        `${sectionId} h2`,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      )
      .fromTo(
        `${sectionId} p`,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.3",
      );

    // Animation Offre 1 - Depuis la droite
    gsap.fromTo(
      `${sectionId} #offer1`,
      { opacity: 0, x: 100 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: `${sectionId} #offer1`,
          start: "top 75%",
          once: true,
        },
      },
    );

    // Animation Offre 2 - Depuis la gauche
    gsap.fromTo(
      `${sectionId} #offer2`,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: `${sectionId} #offer2`,
          start: "top 75%",
          once: true,
        },
      },
    );

    // Animation Offre 3 - Depuis la droite
    gsap.fromTo(
      `${sectionId} #offer3`,
      { opacity: 0, x: 100 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: `${sectionId} #offer3`,
          start: "top 75%",
          once: true,
        },
      },
    );
  }, []);

  return (
    <section id={sectionName} className="section bg-gray-50">
      <div className="flex justify-center">
        <div className="customContainer">
          {/* En-tête sobre */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Nos offres
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Profitez de nos offres avantageuses conçues pour optimiser votre
              budget
            </p>
          </div>

          {/* Liste verticale des offres */}
          <div className="space-y-8 ">
            {/* Offre Groupement */}
            <div
              id="offer2"
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className="p-8">
                <div className="flex items-start gap-6">
                  <div className="shrink-0">
                    <div className="w-16 h-16 bg-primary/5 rounded-lg flex items-center justify-center">
                      <Users className="w-8 h-8 text-primary" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-primary mb-2">
                      Offre Groupement
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Plus vous êtes nombreux, plus vous économisez
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                          <Check className="w-5 h-5 text-primary" />
                          <span className="text-gray-700">2 à 5 maisons</span>
                        </div>
                        <span className="font-bold text-primary">
                          10% de remise
                        </span>
                      </div>

                      <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                          <Check className="w-5 h-5 text-primary" />
                          <span className="text-gray-700">5 à 10 maisons</span>
                        </div>
                        <span className="font-bold text-primary">
                          15% de remise
                        </span>
                      </div>

                      <div className="flex items-center justify-between py-3">
                        <div className="flex items-center gap-2">
                          <Check className="w-5 h-5 text-primary" />
                          <span className="text-gray-700">
                            10 maisons et plus
                          </span>
                        </div>
                        <span className="font-bold text-primary">
                          20% de remise
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Offre Parrainage */}
            <div
              id="offer3"
              className="bg-white rounded-xl shadow-sm border-2 border-primary overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className=" px-4 border-b bg-primary/3 py-2">
                <span className="text-secondary text-sm font-semibold">
                  Offre populaire
                </span>
              </div>
              <div className="p-8">
                <div className="flex items-start gap-6">
                  <div className="shrink-0">
                    <div className="w-16 h-16 bg-primary/5 rounded-lg flex items-center justify-center">
                      <Gift className="w-8 h-8 text-primary" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-primary mb-2">
                      Offre Parrainage
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Recommandez-nous et profitez d&apos;avantages mutuels
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-6 text-center">
                        <div className="text-3xl font-bold text-primary mb-1">
                          100€
                        </div>
                        <div className="text-sm text-gray-600">
                          Bon d&apos;achat
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          pour le parrain
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-6 text-center">
                        <div className="text-3xl font-bold text-primary mb-1">
                          100€
                        </div>
                        <div className="text-sm text-gray-600">De remise</div>
                        <div className="text-xs text-gray-500 mt-1">
                          pour le parrainé
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
