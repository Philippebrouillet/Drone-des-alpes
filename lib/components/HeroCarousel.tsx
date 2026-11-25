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

// « Nettoyage de Façade » → « Nettoyage de façade »
const sentenceCase = (text: string) =>
  text.charAt(0) + text.slice(1).toLowerCase();

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
    // Une seule entrée au chargement : fondu et légère montée, sans rebond
    const tween = gsap.fromTo(
      "#hero-carousel .reveal",
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power3.out" },
    );
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section
      id="hero-carousel"
      className="relative w-full h-screen min-h-[600px] overflow-hidden select-none"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
    >
      {/* Photos d'interventions, en fondu enchaîné */}
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
            className={`absolute inset-0 transition-opacity duration-1000 ease-out-soft ${
              index === currentSlide ? "opacity-100" : "opacity-0"
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
            {/* Voile neutre côté texte, la photo reste lisible à droite */}
            <div className="absolute inset-0 bg-linear-to-r from-[#0b1220]/85 via-[#0b1220]/55 to-[#0b1220]/10" />
          </div>
        );
      })}

      <div className="absolute inset-0 flex items-center justify-center pb-16">
        <div className="customContainer">
          <div className="max-w-3xl">
            <p className="reveal mb-6 flex items-center gap-3 text-sm md:text-base text-white/80">
              <span className="block h-px w-6 bg-secondary shrink-0" />
              <span className="block overflow-hidden">
                <span
                  className={`block transition-[transform,opacity] duration-300 ease-out-soft motion-reduce:transition-none ${
                    isAnimating
                      ? "-translate-y-2 opacity-0"
                      : "translate-y-0 opacity-100"
                  }`}
                >
                  {sentenceCase(slides[currentSlide].title)}
                </span>
              </span>
            </p>

            <h1 className="reveal text-[40px] md:text-6xl lg:text-[68px] font-medium text-white leading-[1.04] tracking-[-0.03em] max-w-[14em]">
              {heading}
            </h1>

            <p className="reveal mt-6 text-lg md:text-xl text-white/80 leading-relaxed max-w-xl min-h-[3.5em] md:min-h-0">
              <span
                className={`block transition-[transform,opacity] duration-500 ease-out-soft motion-reduce:transition-none ${
                  isAnimating
                    ? "translate-y-2 opacity-0"
                    : "translate-y-0 opacity-100"
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
              className="reveal mt-10 flex flex-col sm:flex-row sm:items-center gap-3"
            >
              <Link
                href="/#contact"
                className="inline-flex h-12 items-center justify-center gap-2 px-6 rounded-[10px]
                bg-white text-primary font-medium transition-colors duration-150 ease-out-soft
                hover:bg-primary-50 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Demander un devis
                <ArrowRightIcon size={16} strokeWidth={1.75} />
              </Link>

              <Link
                href={slides[currentSlide].href}
                className="inline-flex h-12 items-center justify-center px-6 rounded-[10px]
                border border-white/25 text-white font-medium transition-colors duration-150 ease-out-soft
                hover:bg-white/10 hover:border-white/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Découvrir la prestation
              </Link>
            </div>

            {/* Indicateurs de slides */}
            <div className="reveal mt-12 flex gap-2">
              {slides.map((slide, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="group py-3"
                  aria-label={`Afficher : ${slide.title}`}
                  aria-current={index === currentSlide}
                >
                  <span
                    className={`block h-0.5 w-10 rounded-full transition-colors duration-150 ${
                      index === currentSlide
                        ? "bg-white"
                        : "bg-white/30 group-hover:bg-white/60"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/*
        Bandeau de preuves : trois arguments factuels, repris du contenu du
        site, qui répondent aux objections avant même de faire défiler la page.
        Retiré sur les mobiles à écran court, où il chevaucherait les indicateurs.
      */}
      <div className="absolute bottom-0 inset-x-0 border-t border-white/10 bg-[#0b1220]/60 [@media(max-height:740px)_and_(max-width:767px)]:hidden">
        <div className="flex justify-center">
          <ul className="customContainer py-4 flex flex-col md:flex-row md:flex-wrap md:items-center gap-y-2 gap-x-10">
            {[
              "Télépilotes certifiés CATS et Certibiocide",
              "Produits écologiques et biodégradables",
              "Devis sous 48 h",
            ].map((preuve) => (
              <li
                key={preuve}
                className="flex items-center gap-2 text-sm text-white/80"
              >
                <CheckIcon size={16} strokeWidth={1.75} className="text-white/50 shrink-0" />
                {preuve}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
