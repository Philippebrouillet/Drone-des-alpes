"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MoveHorizontal } from "lucide-react";
import gsap from "../../customGsap";
import type { BeforeAfterComparison } from "../../services/services";

const START_POSITION = 55;

// Déplacement minimal, en pixels, avant de décider si un geste tactile
// pilote la comparaison ou fait défiler la page
const DRAG_THRESHOLD = 8;

// Hauteur maximale du comparateur, pour qu'une photo tienne toujours dans l'écran
const MAX_HEIGHT = "80vh";
const MAX_WIDTH_PX = 820;

interface BeforeAfterSectionProps {
  comparisons?: BeforeAfterComparison[];
  title?: string;
  subtitle?: string;
  /** Couleur de fond de la section, pour l'alterner avec les sections voisines. */
  background?: string;
}

export default function BeforeAfterSection({
  comparisons = [],
  title = "Avant / Après",
  subtitle = "Faites glisser le curseur sur nos interventions réelles",
  background = "bg-white",
}: BeforeAfterSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const pendingTouchRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
  } | null>(null);
  const [position, setPosition] = useState(START_POSITION);
  const [activeIndex, setActiveIndex] = useState(0);

  const hasComparisons = comparisons.length > 0;
  const activeComparison = comparisons[activeIndex];
  const hasMultiple = comparisons.length > 1;

  const goTo = useCallback(
    (index: number) => {
      const total = comparisons.length;
      setActiveIndex((index + total) % total);
      setPosition(START_POSITION);
    },
    [comparisons.length],
  );

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
    if (
      Math.abs(deltaY) > Math.abs(deltaX) &&
      Math.abs(deltaY) > DRAG_THRESHOLD
    ) {
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
    const section = sectionRef.current;
    if (!section) return;

    // Animations limitées à cette instance : le composant peut être monté
    // plusieurs fois dans une même page
    const context = gsap.context(() => {
      const headerTimeline = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 80%", once: true },
      });

      headerTimeline
        .fromTo(
          ".before-after-title",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
        )
        .fromTo(
          ".before-after-subtitle",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
          "-=0.25",
        )
        .fromTo(
          ".before-after-slider",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
          "-=0.2",
        );

      if (!hasComparisons) return;

      // Petit aller-retour du curseur pour montrer que la photo est interactive
      const demo = { value: START_POSITION };
      gsap.to(demo, {
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
    }, section);

    return () => context.revert();
  }, [hasComparisons]);

  // Rien à comparer : la section entière est masquée
  if (!hasComparisons) return null;

  return (
    <section
      ref={sectionRef}
      id="avant-apres"
      className={`section ${background} overflow-x-hidden`}
    >
      <div className="flex justify-center">
        <div className="customContainer">
          {/* En-tête de section */}
          <div className="mb-12 max-w-[820px] mx-auto">
            <h2 className="before-after-title sectionTitle">{title}</h2>
            <p className="before-after-subtitle sectionLead">{subtitle}</p>
          </div>

          <div className="before-after-slider">
            {hasComparisons && (
              <>
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
                  className="relative w-full mx-auto overflow-hidden rounded-2xl shadow-[0_8px_24px_rgba(15,26,46,0.08)] select-none touch-pan-y cursor-ew-resize transition-[aspect-ratio,max-width] duration-500"
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
                    <span className="absolute top-4 left-4 px-2 py-1 rounded-md bg-[#0b1220]/70 text-white text-xs font-mono">
                      Avant
                    </span>
                  </div>
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ clipPath: `inset(0 0 0 ${position}%)` }}
                  >
                    <span className="absolute top-4 right-4 px-2 py-1 rounded-md bg-white/90 text-ink text-xs font-mono">
                      Après
                    </span>
                  </div>

                  {/* Barre de séparation */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.08)] pointer-events-none"
                    style={{
                      left: `${position}%`,
                      transform: "translateX(-50%)",
                    }}
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
                    className="absolute top-1/2 w-11 h-11 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    style={{ left: `${position}%` }}
                  >
                    <MoveHorizontal size={18} strokeWidth={1.75} className="text-primary" />
                  </button>
                </div>

                {/* Légende */}
                <div
                  className="mx-auto mt-5 flex items-center justify-between gap-4"
                  style={{
                    maxWidth: `min(${MAX_WIDTH_PX}px, calc(${MAX_HEIGHT} * ${activeComparison.ratio}))`,
                  }}
                >
                  <p className="text-ink font-medium">
                    {activeComparison.caption}
                  </p>
                  {hasMultiple && (
                    <p className="font-mono text-sm text-ink-3 tabular-nums">
                      {activeIndex + 1} / {comparisons.length}
                    </p>
                  )}
                </div>

                {/* Navigation entre les comparaisons */}
                {hasMultiple && (
                  <div className="mt-6 flex items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => goTo(activeIndex - 1)}
                      aria-label="Comparaison précédente"
                      className="w-10 h-10 rounded-[10px] border border-line text-ink flex items-center justify-center hover:bg-surface-2 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <ChevronLeft size={18} strokeWidth={1.75} />
                    </button>

                    <div className="flex items-center gap-2">
                      {comparisons.map((comparison, index) => (
                        <button
                          key={comparison.beforeImage}
                          type="button"
                          onClick={() => goTo(index)}
                          aria-label={`Voir : ${comparison.caption}`}
                          aria-current={index === activeIndex}
                          className={`h-1.5 rounded-full transition-[width,background-color] duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                            index === activeIndex
                              ? "w-6 bg-secondary"
                              : "w-1.5 bg-surface-3 hover:bg-ink-3"
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => goTo(activeIndex + 1)}
                      aria-label="Comparaison suivante"
                      className="w-10 h-10 rounded-[10px] border border-line text-ink flex items-center justify-center hover:bg-surface-2 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <ChevronRight size={18} strokeWidth={1.75} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
