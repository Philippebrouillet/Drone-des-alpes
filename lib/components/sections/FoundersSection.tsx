"use client";

import gsap from "../../customGsap";
import { APP_NAME } from "@/lib/constant";
import Image from "next/image";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function FoundersSection() {
  useEffect(() => {
    ScrollTrigger.refresh();
    // Animation de l'en-tête - Apparition séquentielle des noms
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#fondateurs",
        start: "top 80%",
        once: true,
      },
    });

    headerTl
      .fromTo(
        "#fondateurs #founder1",
        { opacity: 0, x: -50, rotateX: -20 },
        { opacity: 1, x: 0, rotateX: 0, duration: 0.7, ease: "power2.out" },
      )
      .fromTo(
        "#fondateurs #ampersand",
        { opacity: 0, scale: 0, rotation: -180 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.5,
          ease: "back.out(2)",
        },
        "-=0.3",
      )
      .fromTo(
        "#fondateurs #founder2",
        { opacity: 0, x: 50, rotateX: -20 },
        { opacity: 1, x: 0, rotateX: 0, duration: 0.7, ease: "power2.out" },
        "-=0.4",
      )
      .fromTo(
        "#fondateurs #subtitle",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.3",
      );

    // Animation de l'introduction
    gsap.fromTo(
      "#fondateurs #introduction",
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#fondateurs #introduction",
          start: "top 80%",
          once: true,
        },
      },
    );

    // Animation Carte Jules - Depuis la gauche avec rotation 3D
    gsap.fromTo(
      "#fondateurs #founder1Card",
      { opacity: 0, x: -80, rotateY: -25, scale: 0.9 },
      {
        opacity: 1,
        x: 0,
        rotateY: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#fondateurs #founder1Card",
          start: "top 80%",
          once: true,
        },
      },
    );

    // Animation Carte Samir - Depuis la droite avec rotation 3D
    gsap.fromTo(
      "#fondateurs #founder2Card",
      { opacity: 0, x: 80, rotateY: 25, scale: 0.9 },
      {
        opacity: 1,
        x: 0,
        rotateY: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#fondateurs #founder2Card",
          start: "top 80%",
          once: true,
        },
      },
    );

    // Animation de la conclusion - Fade + Scale avec rebond
    gsap.fromTo(
      "#fondateurs #conclusion",
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: "back.out(1.3)",
        scrollTrigger: {
          trigger: "#fondateurs #conclusion",
          start: "top 85%",
          once: true,
        },
      },
    );
  }, []);
  return (
    <section id="fondateurs" className="section bg-white">
      <div className="flex justify-center ">
        <div className="customContainer">
          {/* En-tête */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 flex gap-2 flex-col sm:flex-row sm:gap-4  sm:justify-center">
              <span id="founder1" className="whitespace-nowrap">
                Jules Menguy
              </span>
              <span id="ampersand"> & </span>
              <span id="founder2" className="whitespace-nowrap">
                Samir Lasri
              </span>
            </h2>
            <p id="subtitle" className="text-xl text-gray-600">
              Gérants et fondateurs
            </p>
          </div>

          {/* Introduction */}
          <div className="max-w-3xl mx-auto mb-16">
            <p
              id="introduction"
              className="text-lg text-gray-700 leading-relaxed text-center"
            >
              Amis depuis l&apos;enfance, Samir et Jules partagent depuis
              toujours la même envie :{" "}
              <span className="font-semibold text-primary">
                entreprendre ensemble
              </span>
              . Après plusieurs années d&apos;expériences professionnelles
              enrichissantes, ils ont décidé d&apos;unir leurs compétences pour
              créer une entreprise innovante dans le domaine du nettoyage par
              drone.
            </p>
          </div>

          {/* Profils des fondateurs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 customContainer mx-auto mb-12">
            {/* Jules Menguy */}
            <div
              id="founder1Card"
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="p-8">
                <div className="flex flex-col items-center mb-6">
                  {/* Photo de profil */}
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4 shadow-lg ring-4 ring-primary-100">
                    <Image
                      src="/jules.png"
                      alt={`Jules Menguy - Fondateur ${APP_NAME}`}
                      width={128}
                      height={128}
                      loading="lazy"
                      className="w-full h-full object-cover "
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-1">
                    Jules Menguy
                  </h3>
                  <p className="text-sm text-gray-500 font-medium">Fondateur</p>
                </div>

                <p className="text-gray-700 leading-relaxed">
                  Fort de plusieurs années dans le{" "}
                  <span className="font-semibold text-primary">
                    secteur automobile
                  </span>
                  , Jules a affûté ses compétences commerciales et son sens du
                  relationnel. Son objectif : proposer des offres et des
                  services adaptés à chaque client, avec une priorité absolue
                  donnée à la{" "}
                  <span className="font-semibold text-primary">
                    satisfaction client et à la qualité du service
                  </span>
                  .
                </p>
              </div>
            </div>

            {/* Samir Lasri */}
            <div
              id="founder2Card"
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="p-8">
                <div className="flex flex-col items-center mb-6">
                  {/* Photo de profil */}
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4 shadow-lg ring-4 ring-gray-100">
                    <Image
                      src="/samir.png"
                      alt={`Samir Lasri - Co-fondateur ${APP_NAME}`}
                      width={128}
                      height={128}
                      loading="lazy"
                      className="w-full h-full object-cover "
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-1">
                    Samir Lasri
                  </h3>
                  <p className="text-sm text-gray-500 font-medium">
                    Co-fondateur
                  </p>
                </div>

                <p className="text-gray-700 leading-relaxed">
                  Samir bénéficie d&apos;une solide expérience en tant que{" "}
                  <span className="font-semibold text-primary">
                    Leader Étanchéité pour Dassault Aviation
                  </span>
                  . Il y a développé un haut niveau d&apos;exigence, de rigueur
                  et de contrôle qualité, indispensables dans la conception
                  d&apos;avions de chasse.
                </p>
              </div>
            </div>
          </div>

          {/* Conclusion */}
          <div className="max-w-3xl mx-auto">
            <div
              id="conclusion"
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
            >
              <p className="text-gray-700 leading-relaxed text-center">
                Ce binôme complémentaire a ainsi choisi de fusionner son
                savoir-faire et ses valeurs pour se lancer dans une nouvelle
                aventure. Après une{" "}
                <span className="font-semibold text-primary">
                  formation complète
                </span>{" "}
                et une{" "}
                <span className="font-semibold text-primary">
                  étude approfondie du marché
                </span>
                , ils mettent aujourd&apos;hui toutes leurs compétences et leur
                passion au service de leurs clients, afin de garantir un travail
                de{" "}
                <span className="font-semibold text-primary">
                  qualité, sûr et durable
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
