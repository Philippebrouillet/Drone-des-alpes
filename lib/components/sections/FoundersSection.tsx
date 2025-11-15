import { APP_NAME } from "@/lib/constant";
import Image from "next/image";

export default function FoundersSection() {
  return (
    <section className="section bg-gray-50">
      <div className="flex justify-center ">
        <div className="customContainer">
          {/* En-tête */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Samir Lasri & Jules Menguy
            </h2>
            <p className="text-xl text-gray-600">Gérants et fondateurs</p>
          </div>

          {/* Introduction */}
          <div className="max-w-3xl mx-auto mb-16">
            <p className="text-lg text-gray-700 leading-relaxed text-center">
              Amis depuis l&apos;enfance, Samir et Jules partagent depuis
              toujours la même envie :{" "}
              <span className="font-semibold text-primary">
                entreprendre ensemble
              </span>
              . Après plusieurs années d&apos;expériences professionnelles
              enrichissantes, ils ont décidé d&apos;unir leurs compétences pour
              créer une entreprise innovante dans le domaine du nettoyage par
              drone.
            </p>
          </div>

          {/* Profils des fondateurs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            {/* Jules Menguy */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-8">
                <div className="flex flex-col items-center mb-6">
                  {/* Photo de profil */}
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4 shadow-lg ring-4 ring-primary-100">
                    <Image
                      src="/jules.png"
                      alt={`Jules Menguy - Fondateur ${APP_NAME}`}
                      width={128}
                      height={128}
                      loading="lazy"
                      className="w-full h-full object-cover "
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-1">
                    Jules Menguy
                  </h3>
                  <p className="text-sm text-gray-500 font-medium">Fondateur</p>
                </div>

                <p className="text-gray-700 leading-relaxed">
                  Fort de plusieurs années dans le{" "}
                  <span className="font-semibold text-primary">
                    secteur automobile
                  </span>
                  , Jules a affûté ses compétences commerciales et son sens du
                  relationnel. Son objectif : proposer des offres et des
                  services adaptés à chaque client, avec une priorité absolue
                  donnée à la{" "}
                  <span className="font-semibold text-primary">
                    satisfaction client et à la qualité du service
                  </span>
                  .
                </p>
              </div>
            </div>

            {/* Samir Lasri */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-8">
                <div className="flex flex-col items-center mb-6">
                  {/* Photo de profil */}
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4 shadow-lg ring-4 ring-gray-100">
                    <Image
                      src="/samir.png"
                      alt={`Samir Lasri - Co-fondateur ${APP_NAME}`}
                      width={128}
                      height={128}
                      loading="lazy"
                      className="w-full h-full object-cover "
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-1">
                    Samir Lasri
                  </h3>
                  <p className="text-sm text-gray-500 font-medium">
                    Co-fondateur
                  </p>
                </div>

                <p className="text-gray-700 leading-relaxed">
                  Samir bénéficie d&apos;une solide expérience en tant que{" "}
                  <span className="font-semibold text-primary">
                    Leader Étanchéité chez Dassault Aviation
                  </span>
                  . Il y a développé un haut niveau d&apos;exigence, de rigueur
                  et de contrôle qualité, indispensables dans la conception
                  d&apos;avions de chasse.
                </p>
              </div>
            </div>
          </div>

          {/* Conclusion */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <p className="text-gray-700 leading-relaxed text-center">
                Ce binôme complémentaire a ainsi choisi de fusionner son
                savoir-faire et ses valeurs pour se lancer dans une nouvelle
                aventure. Après une{" "}
                <span className="font-semibold text-primary">
                  formation complète
                </span>{" "}
                et une{" "}
                <span className="font-semibold text-primary">
                  étude approfondie du marché
                </span>
                , ils mettent aujourd&apos;hui toutes leurs compétences et leur
                passion au service de leurs clients, afin de garantir un travail
                de{" "}
                <span className="font-semibold text-primary">
                  qualité, sûr et durable
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
