"use client";

import { useEffect, useRef } from "react";
import gsap from "../../customGsap";
import type { PrestationVideo } from "../../services/services";

const MAX_WIDTH_PX = 820;

const videoMimeType = (src: string) => {
  const extension = src.split(".").pop()?.toLowerCase();
  if (extension === "webm") return "video/webm";
  if (extension === "ogv") return "video/ogg";
  if (extension === "mov") return "video/quicktime";
  return "video/mp4";
};

interface VideoSectionProps {
  video?: PrestationVideo;
  title?: string;
  subtitle?: string;
  /** Couleur de fond de la section, pour l'alterner avec les sections voisines. */
  background?: string;
}

export default function VideoSection({
  video,
  title = "En vidéo",
  subtitle = "Découvrez une intervention filmée sur le terrain",
  background = "bg-gray-50",
}: VideoSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Animations limitées à cette instance : le composant peut être monté
    // plusieurs fois dans une même page
    const context = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: { trigger: section, start: "top 80%", once: true },
        })
        .fromTo(
          ".video-section-title",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        )
        .fromTo(
          ".video-section-subtitle",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
          "-=0.25",
        )
        .fromTo(
          ".video-section-player",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
          "-=0.2",
        );
    }, section);

    return () => context.revert();
  }, []);

  if (!video) return null;

  return (
    <section
      ref={sectionRef}
      id="video"
      className={`section ${background} overflow-x-hidden`}
    >
      <div className="flex justify-center">
        <div className="customContainer">
          {/* En-tête de section */}
          <div className="text-center mb-12">
            <h2 className="video-section-title text-4xl md:text-5xl font-bold text-primary mb-4">
              {title}
            </h2>
            <p className="video-section-subtitle text-lg text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>

          <figure
            className="video-section-player mx-auto w-full"
            style={{ maxWidth: `${MAX_WIDTH_PX}px` }}
          >
            <video
              controls
              playsInline
              preload="metadata"
              poster={video.poster}
              className="w-full rounded-2xl shadow-lg bg-black"
            >
              <source src={video.src} type={videoMimeType(video.src)} />
              Votre navigateur ne peut pas lire cette vidéo.
            </video>
            {video.caption && (
              <figcaption className="mt-4 text-center text-lg font-semibold text-primary">
                {video.caption}
              </figcaption>
            )}
          </figure>
        </div>
      </div>
    </section>
  );
}
