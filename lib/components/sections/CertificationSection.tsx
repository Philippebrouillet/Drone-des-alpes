"use client";

import gsap from "../../customGsap";
import { APP_NAME } from "@/lib/constant";
import Image from "next/image";
import { Award, CheckCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function CertificationSection() {
  const iconRef = useRef<SVGSVGElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const mainTitleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const checkItem1Ref = useRef<HTMLDivElement>(null);
  const checkItem2Ref = useRef<HTMLDivElement>(null);
  const checkItem3Ref = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ScrollTrigger.refresh();
    // Animation de l'en-tête
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#certification",
        start: "top 80%",
        once: true,
      },
    });

    headerTl
      .fromTo(
        iconRef.current,
        { opacity: 0, scale: 0, rotation: -180 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          ease: "back.out(1.5)",
        },
      )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4",
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.3",
      );

    // Animation de l'image - Slide depuis la gauche avec rotation
    gsap.fromTo(
      imageContainerRef.current,
      { opacity: 0, x: -100, rotateY: -15 },
      {
        opacity: 1,
        x: 0,
        rotateY: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imageContainerRef.current,
          start: "top 80%",
          once: true,
        },
      },
    );

    // Animation du contenu texte - Timeline séquentielle
    const textTl = gsap.timeline({
      scrollTrigger: {
        trigger: textContainerRef.current,
        start: "top 75%",
        once: true,
      },
    });

    textTl
      .fromTo(
        mainTitleRef.current,
        { opacity: 0, x: 50, scale: 0.95 },
        { opacity: 1, x: 0, scale: 1, duration: 0.7, ease: "power2.out" },
      )
      .fromTo(
        descriptionRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
        "-=0.3",
      )
      .fromTo(
        checkItem1Ref.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
        "-=0.2",
      )
      .fromTo(
        checkItem2Ref.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
        "-=0.3",
      )
      .fromTo(
        checkItem3Ref.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
        "-=0.3",
      )
      .fromTo(
        quoteRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.2)" },
        "-=0.2",
      );
  }, []);
  return (
    <section
      id="certification"
      className="section bg-gray-50 overflow-x-hidden"
    >
      <div className="flex justify-center">
        <div className="customContainer">
          {/* En-tête */}
          <div className="text-center mb-12">
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-4">
              <Award ref={iconRef} className="w-16 h-16 text-secondary " />
              <h2
                ref={titleRef}
                className="text-4xl md:text-5xl font-bold text-primary"
              >
                Certification Professionnelle
              </h2>
            </div>
            <p
              ref={subtitleRef}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Une expertise reconnue pour des interventions en toute sécurité
            </p>
          </div>

          {/* Contenu principal */}
          <div className=" mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Image de certification */}
              <div ref={imageContainerRef} className="order-2 lg:order-1">
                <div className="relative bg-linear-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 shadow-lg border border-gray-200">
                  <Image
                    src="/certification.png"
                    alt={`Certification professionnelle ${APP_NAME}`}
                    width={200}
                    height={50}
                    loading="lazy"
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                </div>
              </div>

              {/* Texte explicatif */}
              <div ref={textContainerRef} className="order-1 lg:order-2">
                <div className="space-y-6">
                  <h3
                    ref={mainTitleRef}
                    className="text-3xl font-bold text-gray-900 mb-6"
                  >
                    Nos télépilotes sont certifiés et formés
                  </h3>

                  <p
                    ref={descriptionRef}
                    className="text-lg text-gray-700 leading-relaxed"
                  >
                    Afin de garantir un{" "}
                    <span className="font-semibold text-primary">
                      travail irréprochable
                    </span>{" "}
                    et conforme aux normes de sécurité, tous nos opérateurs ont
                    obtenu leur{" "}
                    <span className="font-semibold text-primary">
                      CATS (Certificat d&apos;Aptitude Théorique de Télépilote)
                    </span>{" "}
                    ainsi qu&apos;une{" "}
                    <span className="font-semibold text-primary">
                      spécialisation en nettoyage extérieur
                    </span>{" "}
                    délivrée par notre partenaire Flight Academy Certification.
                  </p>

                  {/* Liste des avantages */}
                  <div className="space-y-4 mt-8">
                    <div ref={checkItem1Ref} className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-primary shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          Certificat CATS
                        </h4>
                        <p className="text-gray-600">
                          Certificat d&apos;Aptitude Théorique de Télépilote
                          validé pour exercer en toute légalité
                        </p>
                      </div>
                    </div>

                    <div ref={checkItem2Ref} className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-primary shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          Spécialisation Nettoyage Extérieur
                        </h4>
                        <p className="text-gray-600">
                          Formation spécialisée délivrée par Flight Academy
                          Certification, notre partenaire de confiance
                        </p>
                      </div>
                    </div>

                    <div ref={checkItem3Ref} className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-primary shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          Conformité et Sécurité
                        </h4>
                        <p className="text-gray-600">
                          Respect strict des normes de sécurité et garantie
                          d&apos;un travail irréprochable
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    ref={quoteRef}
                    className="mt-8 p-6 bg-primary/5 rounded-xl border border-primary/20"
                  >
                    <p className="text-gray-700 italic">
                      &quot;La certification garantit notre professionnalisme.
                      Chaque intervention est réalisée par des opérateurs
                      qualifiés et conformes aux exigences réglementaires.&quot;
                    </p>
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
