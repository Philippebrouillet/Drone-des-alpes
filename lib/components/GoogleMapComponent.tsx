import { useEffect, useRef, useState } from "react";
import { cityCoordinates } from "../services/interventionZone";
import Script from "next/script";
import { MapPin } from "lucide-react";

const colors = {
  primary100: "#ced5e1",
  primary200: "#9eaac3",
  primary300: "#6d80a6",
  primary400: "#3d5588",
  primary500: "#0c2b6a",
  primary600: "#0a2255",
};

// Composant de carte Google Maps
export default function GoogleMapComponent() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(
    window.google ? true : false
  );

  useEffect(() => {
    if (!isScriptLoaded || !window?.google || !window?.google?.maps) return;

    const createMap = () => {
      if (!mapRef.current || !window.google) return;

      console.log("Initialisation de la carte Google Maps...");
      // Centre sur la région Rhône-Alpes
      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 45.7, lng: 6.0 },
        zoom: 8,
        mapId: "drone-des-alpes-map", // ID requis pour AdvancedMarkerElement
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true,
      });

      mapInstanceRef.current = map;

      // Couleurs par département
      const deptColors: Record<string, string> = {
        "74": colors.primary500, // bleu foncé
        "73": colors.primary400, // bleu moyen
        "01": colors.primary300, // bleu clair
        "38": colors.primary400, // bleu moyen
        "39": colors.primary300, // bleu clair
      };

      // Ajouter les marqueurs pour chaque ville avec AdvancedMarkerElement
      Object.entries(cityCoordinates).forEach(([cityName, coords]) => {
        // Créer un élément SVG personnalisé pour le marqueur
        const markerElement = document.createElement("div");
        markerElement.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="8" fill="${
            deptColors[coords.dept] || colors.primary500
          }" stroke="#ffffff" stroke-width="3" opacity="1"/>
          <circle cx="12" cy="12" r="4" fill="#ffffff" opacity="1"/>
        </svg>
      `;
        markerElement.style.cursor = "pointer";
        markerElement.style.transform = "translate(-50%, -50%)";

        // Créer le marqueur avancé
        const marker = new google.maps.marker.AdvancedMarkerElement({
          position: { lat: coords.lat, lng: coords.lng },
          map: map,
          title: cityName,
          content: markerElement,
        });

        // Info window au clic
        const infoWindow = new google.maps.InfoWindow({
          content: `
          <div style="padding: 8px; min-width: 150px;">
            <h3 style="margin: 0 0 4px 0; font-weight: bold; font-size: 14px; color: #1f2937;">${cityName}</h3>
            <p style="margin: 0; font-size: 12px; color: #6b7280;">Département ${coords.dept}</p>
            <p style="margin: 4px 0 0 0; font-size: 11px; color: #3b82f6;">✓ Zone d'intervention</p>
          </div>
        `,
        });

        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });
      });

      setMapLoaded(true);
    };
    // Si le script est déjà chargé et que Google Maps est disponible
    if (isScriptLoaded && window?.google && window?.google?.maps) {
      setTimeout(() => {
        createMap();
      }, 500); // Petit délai pour s'assurer que le DOM est prêt
    }
  }, [isScriptLoaded]);

  const handleScriptLoad = () => {
    setIsScriptLoaded(true);
  };

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places,marker&loading=async`}
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
      />
      <div className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-lg">
        <div ref={mapRef} className="w-full h-full" />

        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Chargement de la carte...</p>
            </div>
          </div>
        )}

        {/* Légende */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
          <h3 className="font-bold text-primary mb-3 flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-primary" />
            Légende
          </h3>
          <ul className="text-xs text-gray-700 space-y-2">
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 bg-primary rounded-full border-2 border-white"></span>
              <span>Haute-Savoie (74)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 bg-primary-400 rounded-full border-2 border-white"></span>
              <span>Savoie (73) & Isère (38)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 bg-primary-300 rounded-full border-2 border-white"></span>
              <span>Ain (01) & Jura (39)</span>
            </li>
          </ul>
          <p className="text-xs text-gray-500 mt-3 italic">
            Cliquez sur un marqueur pour plus d&apos;infos
          </p>
        </div>
      </div>
    </>
  );
}
