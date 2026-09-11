"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRightIcon, CheckIcon } from "lucide-react";
import Link from "next/link";
import gsap from "../customGsap";

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  alt: string;
  href: string;
}

interface HeroCarouselProps {
  slides: Slide[];
  /** Titre principal de la page : stable, indépendant du slide affiché. */
  heading: string;
}

export default function HeroCarousel({ slides, heading }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAutoPlayActive, setIsAutoPlayActive] = useState(true);

  // États pour le swipe/slide
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!isAutoPlayActive) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsAnimating(false);
      }, 600);
    }, 4000); // Change toutes les 4 secondes

    return () => clearInterval(interval);
  }, [slides.length, isAutoPlayActive]);

  const goToSlide = (index: number) => {
    if (index !== currentSlide && !isAnimating) {
      setIsAutoPlayActive(false); // Arrête l'auto-play quand l'utilisateur interagit
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide(index);
        setIsAnimating(false);
      }, 600);
    }
  };

  // Distance minimale pour considérer un swipe (en pixels)
  const minSwipeDistance = 50;

  // Gestionnaires d'événements tactiles
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
    setIsAutoPlayActive(false); // Pause l'auto-play pendant le swipe
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentSlide < slides.length - 1) {
      // Swipe vers la gauche -> slide suivante
      goToSlide(currentSlide + 1);
    } else if (isLeftSwipe && currentSlide === slides.length - 1) {
      // Dernier slide -> retour au premier
      goToSlide(0);
    } else if (isRightSwipe && currentSlide > 0) {
      // Swipe vers la droite -> slide précédente
      goToSlide(currentSlide - 1);
    } else if (isRightSwipe && currentSlide === 0) {
      // Premier slide -> aller au dernier
      goToSlide(slides.length - 1);
    }

    setIsDragging(false);
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Gestionneurs pour les événements de souris (ordinateur)
  const onMouseDown = (e: React.MouseEvent) => {
    setTouchEnd(null);
    setTouchStart(e.clientX);
    setIsDragging(true);
    setIsAutoPlayActive(false);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setTouchEnd(e.clientX);
  };

  const onMouseUp = () => {
    if (!isDragging || !touchStart || !touchEnd) {
      setIsDragging(false);
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentSlide < slides.length - 1) {
      goToSlide(currentSlide + 1);
    } else if (isLeftSwipe && currentSlide === slides.length - 1) {
      goToSlide(0);
    } else if (isRightSwipe && currentSlide > 0) {
      goToSlide(currentSlide - 1);
    } else if (isRightSwipe && currentSlide === 0) {
      goToSlide(slides.length - 1);
    }

    setIsDragging(false);
    setTouchStart(null);
    setTouchEnd(null);
  };

  const onMouseLeave = () => {
    setIsDragging(false);
    setTouchStart(null);
    setTouchEnd(null);
  };

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      scrollTrigger: {
        trigger: "#hero-carousel",
        start: "top 80%",
        toggleActions: "play none none none", // play quand visible
        once: true,
      },
    });

    tl.fromTo(
      "#hero-carousel h1",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, ease: "back.out(1.2)" },
    );

    tl.fromTo(
      [
        "#hero-carousel p",
        "#hero-carousel #heroActions",
        "#hero-carousel button",
      ],
      { opacity: 0, y: 15, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        stagger: 0.08,
        ease: "back.out(1.1)",
      },
      "-=0.3",
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="hero-carousel"
      className="relative w-full h-screen overflow-hidden select-none  "
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
    >
      {/* Images avec transition */}
      {slides.map((slide, index) => {
        // Seuls le slide affiché, le précédent et le suivant sont montés :
        // charger les quatre images au premier rendu pénalisait le LCP.
        const isNeighbour =
          index === (currentSlide + 1) % slides.length ||
          index === (currentSlide - 1 + slides.length) % slides.length;
        if (index !== currentSlide && !isNeighbour && index !== 0) return null;

        return (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-110"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              sizes="100vw"
              className="object-cover"
              priority={index === 0}
              fetchPriority={index === 0 ? "high" : "auto"}
            />
            {/* Overlay gradient pour meilleure lisibilité */}
            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/55 to-black/20" />
          </div>
        );
      })}

      {/* Contenu central */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="customContainer">
          <div className="max-w-3xl">
            <p className="heroKicker reveal mb-5 flex items-start gap-2 md:gap-3 text-xs md:text-base font-semibold uppercase tracking-widest md:tracking-[0.2em] text-white/85">
              <span className="block h-px w-5 md:w-8 bg-secondary shrink-0 mt-[0.7em]" />
              <span className="block overflow-hidden">
                <span
                  className={`block transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                    isAnimating
                      ? "-translate-x-8 opacity-0"
                      : "translate-x-0 opacity-100"
                  }`}
                >
                  {slides[currentSlide].title}
                </span>
              </span>
            </p>

            <h1 className="reveal text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1] drop-shadow-lg">
              {heading}
            </h1>

            <p className="reveal text-lg md:text-xl text-gray-200 mb-10 font-light drop-shadow-md">
              <span
                className={`block transition-all duration-700 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:blur-none ${
                  isAnimating
                    ? "translate-y-3 opacity-0 blur-[3px]"
                    : "translate-y-0 opacity-100 blur-0"
                }`}
              >
                {slides[currentSlide].subtitle}
              </span>
            </p>

            {/*
              Deux actions hiérarchisées : demander un devis est l'objectif du
              site, découvrir la prestation reste accessible d'un cran en retrait.
            */}
            <div
              id="heroActions"
              className="reveal mb-12 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <Link
                href="/#contact"
                className="group relative inline-flex items-center justify-center px-8 py-4
               bg-white text-primary font-semibold text-lg rounded-full overflow-hidden
               transition-all duration-300 hover:bg-primary-200 hover:text-white
               hover:scale-105 hover:shadow-2xl"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Demander un devis
                  <ArrowRightIcon size={16} />
                </span>

                {/* Effet de hover animé */}
                <div
                  className="absolute inset-0 bg-linear-to-r from-primary to-primary-400
                    transform scale-x-0 group-hover:scale-x-100
                    transition-transform duration-300 origin-left"
                />
              </Link>

              <Link
                href={slides[currentSlide].href}
                className="inline-flex items-center justify-center gap-2 px-8 py-4
               border border-white/50 text-white font-medium text-lg rounded-full
               transition-colors duration-300 hover:bg-white/10 hover:border-white"
              >
                Découvrir la prestation
              </Link>
            </div>

            {/* Indicateurs de slides */}
            <div className="flex gap-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`reveal transition-all duration-300 ${
                    index === currentSlide
                      ? "w-12 bg-white"
                      : "w-12 bg-white/40 hover:bg-white/60"
                  } h-1 rounded-full`}
                  aria-label={`Aller à la slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/*
        Bandeau de preuves : trois arguments factuels, repris du contenu du
        site, qui répondent aux objections avant même de faire défiler la page.
        Retiré sur les mobiles à écran court, où il chevaucherait les indicateurs
        (sur un laptop bas de plafond, les boutons tiennent sur une ligne : la place suffit).
      */}
      <div className="absolute bottom-0 inset-x-0 border-t border-white/15 bg-black/30 backdrop-blur-sm [@media(max-height:740px)_and_(max-width:767px)]:hidden">
        <div className="flex justify-center">
          <div className="customContainer py-3 md:py-4 flex flex-col md:flex-row md:flex-wrap md:items-center gap-y-1.5 gap-x-10">
            {[
              "Sans échafaudage ni nacelle",
              "30 à 50% moins cher qu'un nettoyage traditionnel",
              "Télépilotes certifiés CATS et Certibiocide",
            ].map((preuve) => (
              <p
                key={preuve}
                className="flex items-center gap-2.5 text-xs md:text-sm text-white/90"
              >
                <CheckIcon size={16} className="text-secondary shrink-0" />
                {preuve}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
