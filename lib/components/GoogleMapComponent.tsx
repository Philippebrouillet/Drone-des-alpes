import { useEffect, useRef, useState } from "react";
import { cityCoordinates, departments } from "../services/interventionZone";
import { zoneInterventionPaths } from "../services/zoneIntervention";
import Script from "next/script";
import { MapPin } from "lucide-react";

const colors = {
  primary400: "#3d5588",
  primary500: "#0c2b6a",
};

// Composant de carte Google Maps
export default function GoogleMapComponent() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(
    window.google ? true : false,
  );

  useEffect(() => {
    if (!isScriptLoaded || !window?.google || !window?.google?.maps) return;

    const createMap = () => {
      if (!mapRef.current || !window.google) return;

      // Centre sur la zone d'intervention (Haute-Savoie / Savoie / Ain / Isère / Jura)
      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 45.85, lng: 5.85 },
        zoom: 7,
        mapId: "drone-des-alpes-map", // ID requis pour AdvancedMarkerElement
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true,
      });

      mapInstanceRef.current = map;

      /*
        Une seule zone d'intervention, plutôt qu'un semis de marqueurs : plus
        lisible, et bien plus léger à l'affichage. Le territoire suisse en est
        retiré (voir le service), la société n'y étant pas autorisée.
      */
      const polygone = new google.maps.Polygon({
        paths: zoneInterventionPaths,
        strokeColor: colors.primary500,
        strokeOpacity: 0.9,
        strokeWeight: 2,
        fillColor: colors.primary400,
        fillOpacity: 0.22,
        map,
      });

      const infoZone = new google.maps.InfoWindow();
      polygone.addListener("click", (e: google.maps.PolyMouseEvent) => {
        infoZone.setContent(`
          <div style="padding: 8px; min-width: 180px;">
            <h3 style="margin: 0 0 4px 0; font-weight: bold; font-size: 14px; color: #1f2937;">Zone d'intervention</h3>
            <p style="margin: 0; font-size: 12px; color: #6b7280;">${Object.keys(cityCoordinates).length} communes dans ${departments.length} départements</p>
            <p style="margin: 4px 0 0 0; font-size: 11px; color: #3b82f6;">✓ Devis gratuit sous 48h</p>
          </div>
        `);
        infoZone.setPosition(e.latLng);
        infoZone.open(map);
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
          <h3 className="font-bold text-primary mb-2 flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-primary" />
            Zone d&apos;intervention
          </h3>
          <ul className="text-xs text-gray-700 space-y-1.5">
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-primary-400/40 border border-primary"></span>
              <span>Haute-Savoie, Savoie, Ain, Isère et Jura</span>
            </li>
          </ul>
          <p className="text-xs text-gray-500 mt-3 italic">
            Cliquez sur la zone pour plus d&apos;infos
          </p>
        </div>
      </div>
    </>
  );
}
