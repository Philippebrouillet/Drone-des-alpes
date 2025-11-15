"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const dynamicComponents = {
  InterventionZone: dynamic(() => import(`./sections/InterventionZone`)),
  GoogleMapComponent: dynamic(() => import(`./GoogleMapComponent`)),

  // Ajouter d'autres composants dynamiques ici si nécessaire
} satisfies Record<string, React.ComponentType<any>>;

export default function LazyComponentLoader({
  componentName,
}: {
  componentName: keyof typeof dynamicComponents;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // on ne re-check plus
        }
      },
      {
        root: null,
        threshold: 0.1, // se charge quand 10% est visible
      }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  const Component = dynamicComponents[componentName];
  return (
    <div ref={ref} className="min-h-[500px]">
      {isVisible ? <Component /> : null}
    </div>
  );
}
