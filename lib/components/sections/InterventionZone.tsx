"use client";

import { useState } from "react";
import { MapPin, ChevronDown, ChevronUp } from "lucide-react";

import {
  cityCoordinates,
  departments,
  formatCityUrl,
} from "@/lib/services/interventionZone";
import Link from "next/link";
import LazyComponentLoader from "../LazyComponentLoader";

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
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Zone d&apos;intervention
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto mb-6">
              Nous intervenons en{" "}
              <span className="font-semibold text-primary">
                Haute-Savoie, Ain, Jura, Isère et Savoie
              </span>{" "}
              pour le nettoyage par drone de : toiture, façade, terrasse,
              gouttières et panneaux solaires. Grâce à notre technologie, nous
              réalisons des interventions{" "}
              <span className="font-semibold text-primary">
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
            <LazyComponentLoader componentName="GoogleMapComponent" />
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
                      <h3 className="text-xl font-bold text-primary text-left">
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
                      {dept.cities.map((city) => {
                        const cityData = cityCoordinates[city];
                        const hasPage = !!cityData; // Vérifier si la ville a une page dédiée

                        return hasPage ? (
                          <Link
                            key={city}
                            href={`/villes/${formatCityUrl(city)}`}
                            className="flex items-center gap-2 text-gray-700 hover:text-primary text-sm transition-colors duration-200 hover:underline"
                          >
                            <MapPin className="w-3 h-3 text-primary shrink-0" />
                            <span>{city}</span>
                          </Link>
                        ) : (
                          <div
                            key={city}
                            className="flex items-center gap-2 text-gray-700 text-sm"
                          >
                            <MapPin className="w-3 h-3 text-primary shrink-0" />
                            <span>{city}</span>
                          </div>
                        );
                      })}
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
