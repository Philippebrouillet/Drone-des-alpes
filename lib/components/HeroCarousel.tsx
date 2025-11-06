"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  alt: string;
  href: string;
}

interface HeroCarouselProps {
  slides: Slide[];
}

export default function HeroCarousel({ slides }: HeroCarouselProps) {
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

  return (
    <section
      className="relative w-full h-screen overflow-hidden select-none"
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
            className=" object-cover"
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

            {/* Bouton CTA fixe  */}
            <div className="mb-12">
              <button className="group relative px-8 py-4 bg-white text-primary font-semibold text-lg rounded-full overflow-hidden transition-all duration-300 hover:bg-primary-200 hover:text-white hover:scale-105 hover:shadow-2xl">
                <Link href={slides[currentSlide].href}>
                  <span className="relative z-10 flex items-center gap-2">
                    Consulter
                    <ArrowRightIcon size={16} />
                  </span>
                </Link>
                {/* Effet de hover animé */}
                <div className="absolute inset-0 bg-linear-to-r from-primary to-primary-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
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

      {/* Badge décoratif en bas */}
      <div className="absolute bottom-8 left-0 flex justify-center items-center w-full">
        <div className="customContainer flex justify-end items-center">
          <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
            {" "}
            <p className="text-white font-medium text-sm">
              Expertise professionnelle
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
