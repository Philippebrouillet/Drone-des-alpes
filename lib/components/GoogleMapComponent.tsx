import { useEffect, useRef, useState } from "react";
import { cityCoordinates, departments } from "../services/interventionZone";
import { zoneInterventionPaths } from "../services/zoneIntervention";
import Script from "next/script";
import { MapPin } from "lucide-react";

const colors = {
  primary400: "#3d5588",
  primary500: "#0c2b6a",
};

/**
 * Identifiants Google des départements desservis.
 * Ils permettent de faire colorier à Google ses propres limites officielles,
 * plutôt que d'en dessiner une approximation par-dessus la carte.
 */
const DEPARTEMENTS_DESSERVIS = [
  "ChIJfRdqefQJjEcRICq55CqrCAM", // Haute-Savoie (74)
  "ChIJ01Qj_B7Si0cRECq55CqrCAM", // Savoie (73)
  "ChIJ6WS-4x1Yi0cRgCW55CqrCAM", // Ain (01)
  "ChIJh1d4BM_oikcR4Ce55CqrCAM", // Isère (38)
  "ChIJQxu3PkkijUcR8CcNszTOCQM", // Jura (39)
];

const STYLE_DEPARTEMENT: google.maps.FeatureStyleOptions = {
  fillColor: colors.primary400,
  fillOpacity: 0.22,
  strokeColor: colors.primary500,
  strokeOpacity: 0.9,
  strokeWeight: 2,
};

// Le Map ID conditionne l'accès aux limites administratives : il doit désigner
// une carte vectorielle dont le style autorise la couche « administrative area
// level 2 ». Surchargeable sans toucher au code.
const MAP_ID =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID ?? "455d59b16d884785fc926569";

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
        mapId: MAP_ID,
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true,
      });

      mapInstanceRef.current = map;

      const infoZone = new google.maps.InfoWindow();
      const contenuInfo = `
        <div style="padding: 8px; min-width: 180px;">
          <h3 style="margin: 0 0 4px 0; font-weight: bold; font-size: 14px; color: #1f2937;">Zone d'intervention</h3>
          <p style="margin: 0; font-size: 12px; color: #6b7280;">${Object.keys(cityCoordinates).length} communes dans ${departments.length} départements</p>
          <p style="margin: 4px 0 0 0; font-size: 11px; color: #3b82f6;">✓ Devis gratuit sous 48h</p>
        </div>
      `;

      /*
        Affichage privilégié : on demande à Google de colorier ses propres
        limites départementales. Les frontières sont alors exactes et s'arrêtent
        d'elles-mêmes au territoire français.
      */
      const colorierDepartements = () => {
        if (!map.getMapCapabilities().isDataDrivenStylingAvailable)
          return false;

        try {
          const couche = map.getFeatureLayer(
            google.maps.FeatureType.ADMINISTRATIVE_AREA_LEVEL_2,
          );

          couche.style = ({ feature }) =>
            DEPARTEMENTS_DESSERVIS.includes(
              (feature as google.maps.PlaceFeature).placeId,
            )
              ? STYLE_DEPARTEMENT
              : null;

          couche.addListener("click", (e: google.maps.FeatureMouseEvent) => {
            if (!e.latLng) return;
            infoZone.setContent(contenuInfo);
            infoZone.setPosition(e.latLng);
            infoZone.open(map);
          });

          return true;
        } catch {
          // Couche non autorisée sur ce Map ID : on garde le tracé de secours.
          return false;
        }
      };

      /*
        Tracé de secours, utilisé tant que la carte n'a pas accès aux limites
        officielles : contour calculé à partir des communes desservies.
      */
      let secours: google.maps.Polygon | null = null;
      const tracerSecours = () => {
        if (secours) return;
        secours = new google.maps.Polygon({
          paths: zoneInterventionPaths,
          strokeColor: colors.primary500,
          strokeOpacity: 0.9,
          strokeWeight: 2,
          fillColor: colors.primary400,
          fillOpacity: 0.22,
          map,
        });
        secours.addListener("click", (e: google.maps.PolyMouseEvent) => {
          if (!e.latLng) return;
          infoZone.setContent(contenuInfo);
          infoZone.setPosition(e.latLng);
          infoZone.open(map);
        });
      };

      let colorie = colorierDepartements();

      // Les capacités sont annoncées de façon asynchrone. Tant qu'elles sont
      // inconnues on n'attend pas : le contour calculé s'affiche aussitôt, et
      // cède la place au coloriage officiel dès qu'il devient disponible.
      const arbitrer = () => {
        if (colorie) return;
        colorie = colorierDepartements();
        if (colorie) {
          secours?.setMap(null);
          secours = null;
        } else {
          tracerSecours();
        }
      };

      map.addListener("mapcapabilities_changed", arbitrer);
      arbitrer();

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
