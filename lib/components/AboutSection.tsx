import { MapPinCheckIcon } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-20 md:py-32 bg-white flex justify-center ">
      <div className="customContainer text-center">
        {/* Titre principal */}
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
          Une innovation qui redéfinit les codes du nettoyage
        </h2>

        {/* Paragraphes */}
        <div className="space-y-6 text-lg md:text-xl text-gray-600 leading-relaxed">
          <p>
            Innovante et performante, la technologie drone redéfinit les codes
            du nettoyage. Grâce à cet outil révolutionnaire, nous intervenons{" "}
            <span className="font-semibold text-gray-900">
              en toute sécurité
            </span>{" "}
            là où l&apos;homme prendrait des risques, tout en préservant les
            surfaces à nettoyer.
          </p>

          <p>
            Que vous soyez particulier ou professionnel, prenez soin de vos
            bâtiments avec une méthode{" "}
            <span className="font-semibold text-gray-900">sans danger</span>,
            respectueuse des matériaux et utilisant des{" "}
            <span className="font-semibold text-gray-900">
              produits écologiques et biodégradables
            </span>
            .
          </p>
        </div>

        {/* Zone géographique */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-base md:text-lg text-gray-700">
            <span className="flex justify-center">
              <span className="font-semibold text-gray-900 flex items-center text-center  gap-2">
                <MapPinCheckIcon /> Basés en Haute-Savoie
              </span>
            </span>
            <br />
            <span className="text-gray-600">
              Nous intervenons également dans l&apos;Ain, la Savoie,
              l&apos;Isère et le Jura
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
