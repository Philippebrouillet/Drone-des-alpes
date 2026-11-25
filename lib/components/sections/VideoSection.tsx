"use client";

import { useEffect, useRef } from "react";
import { revealOnScroll } from "../../customGsap";
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
  subtitle = "Une intervention filmée sur le terrain",
  background = "bg-white",
}: VideoSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Animation limitée à cette instance : le composant peut être monté
    // plusieurs fois dans une même page
    const tween = revealOnScroll(section.querySelectorAll(".reveal"), section);
    return () => {
      tween.kill();
    };
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
          <div className="mb-12 mx-auto" style={{ maxWidth: `${MAX_WIDTH_PX}px` }}>
            <h2 className="sectionTitle reveal">{title}</h2>
            <p className="sectionLead reveal">{subtitle}</p>
          </div>

          <figure
            className="reveal mx-auto w-full"
            style={{ maxWidth: `${MAX_WIDTH_PX}px` }}
          >
            <video
              controls
              playsInline
              preload="metadata"
              poster={video.poster}
              className="w-full rounded-2xl shadow-[0_8px_24px_rgba(15,26,46,0.08)] bg-black"
            >
              <source src={video.src} type={videoMimeType(video.src)} />
              Votre navigateur ne peut pas lire cette vidéo.
            </video>
            {video.caption && (
              <figcaption className="mt-5 text-ink font-medium">
                {video.caption}
              </figcaption>
            )}
          </figure>
        </div>
      </div>
    </section>
  );
}
