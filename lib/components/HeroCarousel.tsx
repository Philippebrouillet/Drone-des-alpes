"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRightIcon } from "lucide-react";

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  alt: string;
}

interface HeroCarouselProps {
  slides: Slide[];
}

export default function HeroCarousel({ slides }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAutoPlayActive, setIsAutoPlayActive] = useState(true);

  useEffect(() => {
    if (!isAutoPlayActive) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsAnimating(false);
      }, 600);
    }, 8000); // Change toutes les 8 secondes

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

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Images avec transition */}
      {slides.map((slide, index) => (
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
            className="object-cover"
            priority={index === 0}
            quality={90}
          />
          {/* Overlay gradient pour meilleure lisibilité */}
          <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-transparent" />
        </div>
      ))}

      {/* Contenu central */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="customContainer">
          <div>
            {/* Titre et sous-titre avec animation */}
            <div
              className={`transition-all duration-700 ${
                isAnimating
                  ? "opacity-0 translate-y-8"
                  : "opacity-100 translate-y-0"
              }`}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                {slides[currentSlide].title}
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 mb-8 font-light">
                {slides[currentSlide].subtitle}
              </p>
            </div>

            {/* Bouton CTA fixe (ne bouge pas) */}
            <div className="mb-12">
              <button className="group relative px-8 py-4 bg-white text-black font-semibold text-lg rounded-full overflow-hidden transition-all duration-300 hover:bg-blue-600 hover:text-white hover:scale-105 hover:shadow-2xl">
                <span className="relative z-10 flex items-center gap-2">
                  Demander un devis gratuit
                  <ArrowRightIcon size={16} />
                </span>
                {/* Effet de hover animé */}
                <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </button>
            </div>

            {/* Indicateurs de slides */}
            <div className="flex gap-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 ${
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

      {/* Boutons de navigation gauche/droite */}
      <button
        onClick={() =>
          goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1)
        }
        className="hidden absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full xl:flex items-center justify-center transition-all duration-300 hover:scale-110 group"
        aria-label="Slide précédente"
      >
        <ArrowLeft
          size={24}
          className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
        />
      </button>

      <button
        onClick={() => goToSlide((currentSlide + 1) % slides.length)}
        className="hidden absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full xl:flex items-center justify-center transition-all duration-300 hover:scale-110 group"
        aria-label="Slide suivante"
      >
        <ArrowRightIcon
          size={24}
          className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
        />
      </button>

      {/* Badge décoratif en bas */}
      <div className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
        <p className="text-white font-medium text-sm">
          Expertise professionnelle
        </p>
      </div>
    </section>
  );
}
