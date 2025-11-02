"use client";

import { useState, useEffect, useRef } from "react";
import { MapPin, ChevronDown, ChevronUp } from "lucide-react";
import Script from "next/script";
import { cityCoordinates, departments } from "@/lib/services/interventionZone";

// Composant de carte Google Maps
const GoogleMapComponent = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const createMap = () => {
    if (!mapRef.current || !window.google) return;

    // Centre sur la région Rhône-Alpes
    const map = new google.maps.Map(mapRef.current, {
      center: { lat: 45.7, lng: 6.0 },
      zoom: 8,
      mapTypeControl: true,
      streetViewControl: false,
      fullscreenControl: true,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }],
        },
      ],
    });

    mapInstanceRef.current = map;

    // Couleurs par département
    const deptColors: Record<string, string> = {
      "74": "#2563eb", // bleu foncé
      "73": "#3b82f6", // bleu moyen
      "01": "#60a5fa", // bleu clair
      "38": "#3b82f6", // bleu moyen
      "39": "#60a5fa", // bleu clair
    };

    // Ajouter les marqueurs pour chaque ville
    Object.entries(cityCoordinates).forEach(([cityName, coords]) => {
      const marker = new google.maps.Marker({
        position: { lat: coords.lat, lng: coords.lng },
        map: map,
        title: cityName,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 7,
          fillColor: deptColors[coords.dept] || "#3b82f6",
          fillOpacity: 0.9,
          strokeColor: "#ffffff",
          strokeWeight: 2,
        },
        animation: google.maps.Animation.DROP,
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

  useEffect(() => {
    // Si le script est déjà chargé et que Google Maps est disponible
    if (window.google && window.google.maps) {
      // Utiliser setTimeout pour éviter le setState synchrone dans l'effet
      setTimeout(() => createMap(), 0);
    }
  }, [isScriptLoaded]);

  const handleScriptLoad = () => {
    setIsScriptLoaded(true);
  };

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAYUmr1wSlV3zvO6t04LgcQH9dPXFKSc0o&libraries=places`}
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
      />
      <div className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-lg">
        <div ref={mapRef} className="w-full h-full" />

        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Chargement de la carte...</p>
            </div>
          </div>
        )}

        {/* Légende */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
          <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-blue-600" />
            Légende
          </h4>
          <ul className="text-xs text-gray-700 space-y-2">
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 bg-blue-600 rounded-full border-2 border-white"></span>
              <span>Haute-Savoie (74)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></span>
              <span>Savoie (73) & Isère (38)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 bg-blue-400 rounded-full border-2 border-white"></span>
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
};

export default function InterventionZone() {
  const [expandedDept, setExpandedDept] = useState<string | null>(null);

  const toggleDepartment = (code: string) => {
    setExpandedDept(expandedDept === code ? null : code);
  };

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="flex justify-center">
        <div className="customContainer">
          {/* En-tête */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Zone d&apos;intervention
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto mb-6">
              Nous intervenons en{" "}
              <span className="font-semibold">
                Haute-Savoie, Ain, Jura, Isère et Savoie
              </span>{" "}
              pour le nettoyage par drone de : toiture, façade, terrasse,
              gouttières et panneaux solaires. Grâce à notre technologie, nous
              réalisons des interventions{" "}
              <span className="font-semibold">
                rapides, sécurisées et écologiques
              </span>
              , sans échafaudage ni risque pour vos surfaces.
            </p>
            <p className="text-gray-600">
              Découvrez ci-dessous la liste complète de nos zones
              d&apos;intervention. Pour une prestation locale et
              professionnelle, demandez votre devis gratuit.
            </p>
          </div>{" "}
          {/* Carte Google Maps */}
          <div className="mb-16">
            {/* Vraie carte Google Maps avec marqueurs */}
            <GoogleMapComponent />
          </div>
          {/* Liste détaillée des villes par département */}
          <div className=" mx-auto space-y-4">
            {departments.map((dept) => (
              <div
                key={dept.code}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleDepartment(dept.code)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`${dept.color} text-white font-bold text-lg px-4 py-2 rounded-lg`}
                    >
                      {dept.code}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 text-left">
                        {dept.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {dept.cities.length} villes desservies
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0">
                    {expandedDept === dept.code ? (
                      <ChevronUp className="w-6 h-6 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                </button>

                {expandedDept === dept.code && (
                  <div className="px-6 py-6 bg-gray-50 border-t border-gray-200">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {dept.cities.map((city) => (
                        <div
                          key={city}
                          className="flex items-center gap-2 text-gray-700 text-sm"
                        >
                          <MapPin className="w-3 h-3 text-blue-600 shrink-0" />
                          <span>{city}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
