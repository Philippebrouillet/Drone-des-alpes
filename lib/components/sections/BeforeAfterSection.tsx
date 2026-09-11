"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MoveHorizontal } from "lucide-react";
import gsap from "../../customGsap";

const sectionName = "avant-apres";
const sectionId = "#" + sectionName;

const START_POSITION = 55;

// Déplacement minimal, en pixels, avant de décider si un geste tactile
// pilote la comparaison ou fait défiler la page
const DRAG_THRESHOLD = 8;

// Hauteur maximale du comparateur, pour qu'une photo tienne toujours dans l'écran
const MAX_HEIGHT = "80vh";
const MAX_WIDTH_PX = 820;

// ratio = largeur / hauteur des photos (3 / 4 pour du portrait, 4 / 3 pour du paysage).
// Les deux photos d'une même comparaison doivent avoir le même cadrage.
const comparisons = [
  {
    caption: "Nettoyage de façade",
    ratio: 3 / 4,
    beforeImage: "/avant-facade.jpg",
    beforeAlt: "Façade envahie par la mousse avant nettoyage",
    afterImage: "/apres-facade.jpg",
    afterAlt: "Façade propre après nettoyage par drone",
  },
  {
    caption: "Nettoyage de batiment industriel",
    ratio: 4 / 3,
    beforeImage: "/avant-bardage.JPG",
    beforeAlt: "batiment industriel encrassé avant nettoyage",
    afterImage: "/apres-bardage.jpeg",
    afterAlt: "batiment industriel propre après nettoyage par drone",
  },
];

export default function BeforeAfterSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const pendingTouchRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
  } | null>(null);
  const [position, setPosition] = useState(START_POSITION);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeComparison = comparisons[activeIndex];
  const hasMultiple = comparisons.length > 1;

  const goTo = useCallback((index: number) => {
    const total = comparisons.length;
    setActiveIndex((index + total) % total);
    setPosition(START_POSITION);
  }, []);

  const updateFromClientX = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;

    const { left, width } = container.getBoundingClientRect();
    const ratio = ((clientX - left) / width) * 100;
    setPosition(Math.min(100, Math.max(0, ratio)));
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    // À la souris, le clic positionne directement le curseur
    if (event.pointerType === "mouse") {
      isDraggingRef.current = true;
      containerRef.current?.setPointerCapture(event.pointerId);
      updateFromClientX(event.clientX);
      return;
    }

    // Au doigt, on attend de savoir si le geste est horizontal (comparaison)
    // ou vertical (défilement de la page)
    pendingTouchRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
    };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (isDraggingRef.current) {
      updateFromClientX(event.clientX);
      return;
    }

    const pending = pendingTouchRef.current;
    if (!pending || pending.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - pending.startX;
    const deltaY = event.clientY - pending.startY;

    // Geste vertical : on laisse la page défiler normalement
    if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > DRAG_THRESHOLD) {
      pendingTouchRef.current = null;
      return;
    }

    // Geste horizontal : on prend la main sur la comparaison
    if (Math.abs(deltaX) > DRAG_THRESHOLD) {
      pendingTouchRef.current = null;
      isDraggingRef.current = true;
      containerRef.current?.setPointerCapture(event.pointerId);
      updateFromClientX(event.clientX);
    }
  };

  const stopDragging = (event: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    pendingTouchRef.current = null;
    if (containerRef.current?.hasPointerCapture(event.pointerId)) {
      containerRef.current.releasePointerCapture(event.pointerId);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const step = event.shiftKey ? 10 : 2;

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setPosition((current) => Math.max(0, current - step));
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      setPosition((current) => Math.min(100, current + step));
    } else if (event.key === "Home") {
      event.preventDefault();
      setPosition(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setPosition(100);
    }
  };

  useEffect(() => {
    const headerTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionId,
        start: "top 80%",
        once: true,
      },
    });

    headerTimeline
      .fromTo(
        ".before-after-title",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      )
      .fromTo(
        ".before-after-subtitle",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        "-=0.25",
      )
      .fromTo(
        ".before-after-slider",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        "-=0.2",
      );

    // Petit aller-retour du curseur pour montrer que la photo est interactive
    const demo = { value: START_POSITION };
    const demoTween = gsap.to(demo, {
      value: 35,
      duration: 1.1,
      delay: 0.3,
      ease: "power2.inOut",
      yoyo: true,
      repeat: 1,
      onUpdate: () => {
        if (!isDraggingRef.current) setPosition(demo.value);
      },
      scrollTrigger: {
        trigger: ".before-after-slider",
        start: "top 70%",
        once: true,
      },
    });

    return () => {
      headerTimeline.kill();
      demoTween.kill();
    };
  }, []);

  return (
    <section
      id={sectionName}
      className="section bg-gray-50 border-b border-gray-200 overflow-x-hidden "
    >
      <div className="flex justify-center">
        <div className="customContainer">
          {/* En-tête de section */}
          <div className="text-center mb-12">
            <h2 className="before-after-title text-4xl md:text-5xl font-bold text-primary mb-4">
              Avant / Après
            </h2>
            <p className="before-after-subtitle text-lg text-gray-600 max-w-2xl mx-auto">
              Faites glisser le curseur pour découvrir le résultat de nos
              interventions par drone
            </p>
          </div>

          <div className="before-after-slider">
            {/* Comparateur */}
            <div
              ref={containerRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={stopDragging}
              onPointerCancel={stopDragging}
              style={{
                aspectRatio: activeComparison.ratio,
                maxWidth: `min(${MAX_WIDTH_PX}px, calc(${MAX_HEIGHT} * ${activeComparison.ratio}))`,
              }}
              className="relative w-full mx-auto overflow-hidden rounded-2xl shadow-lg select-none touch-pan-y cursor-ew-resize transition-[aspect-ratio,max-width] duration-500"
            >
              {comparisons.map((comparison, index) => (
                <div
                  key={comparison.beforeImage}
                  aria-hidden={index !== activeIndex}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === activeIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {/* Image après (fond) */}
                  <Image
                    src={comparison.afterImage}
                    alt={comparison.afterAlt}
                    fill
                    sizes="(max-width: 820px) 100vw, 820px"
                    className="object-cover pointer-events-none"
                  />

                  {/* Image avant (superposée et rognée) */}
                  <div
                    className="absolute inset-0"
                    style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
                  >
                    <Image
                      src={comparison.beforeImage}
                      alt={comparison.beforeAlt}
                      fill
                      sizes="(max-width: 820px) 100vw, 820px"
                      className="object-cover pointer-events-none"
                    />
                  </div>
                </div>
              ))}

              {/* Étiquettes : découpées comme les images, pour qu'une étiquette
                  disparaisse en même temps que la photo qu'elle désigne */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
              >
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary/80 text-white text-sm font-semibold backdrop-blur-sm">
                  Avant
                </span>
              </div>
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ clipPath: `inset(0 0 0 ${position}%)` }}
              >
                <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-secondary/80 text-white text-sm font-semibold backdrop-blur-sm">
                  Après
                </span>
              </div>

              {/* Barre de séparation */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.35)] pointer-events-none"
                style={{ left: `${position}%`, transform: "translateX(-50%)" }}
              />

              {/* Poignée */}
              <button
                type="button"
                role="slider"
                aria-label="Comparer l'avant et l'après"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(position)}
                aria-valuetext={`${Math.round(position)}% de l'image avant nettoyage`}
                onKeyDown={handleKeyDown}
                className="absolute top-1/2 w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white border-2 border-primary flex items-center justify-center shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-secondary/60"
                style={{ left: `${position}%` }}
              >
                <MoveHorizontal className="w-6 h-6 text-primary" />
              </button>
            </div>

            {/* Légende */}
            <p className="mt-6 text-center text-lg font-semibold text-primary">
              {activeComparison.caption}
            </p>

            {/* Navigation entre les comparaisons */}
            {hasMultiple && (
              <div className="mt-4 flex items-center justify-center gap-6">
                <button
                  type="button"
                  onClick={() => goTo(activeIndex - 1)}
                  aria-label="Comparaison précédente"
                  className="w-11 h-11 rounded-full border-2 border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-secondary/60"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <div className="flex items-center gap-2">
                  {comparisons.map((comparison, index) => (
                    <button
                      key={comparison.beforeImage}
                      type="button"
                      onClick={() => goTo(index)}
                      aria-label={`Voir : ${comparison.caption}`}
                      aria-current={index === activeIndex}
                      className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-secondary/60 ${
                        index === activeIndex
                          ? "w-8 bg-secondary"
                          : "w-2.5 bg-gray-300 hover:bg-gray-400"
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => goTo(activeIndex + 1)}
                  aria-label="Comparaison suivante"
                  className="w-11 h-11 rounded-full border-2 border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-secondary/60"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
