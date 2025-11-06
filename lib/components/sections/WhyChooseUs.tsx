import { APP_NAME } from "@/lib/constant";
import { Clock, Building, Zap } from "lucide-react";

export default function WhyChooseUs() {
  return (
    <section className="section ">
      <div className="flex justify-center">
        <div className="customContainer">
          {/* En-tête */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Pourquoi choisir{" "}
              <span className="text-secondary">{APP_NAME}</span> ?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Notre engagement : un service de qualité, flexible et réactif
              adapté à vos besoins
            </p>
          </div>

          {/* Liste des avantages */}
          <div className="space-y-8  mx-auto">
            {/* Plage horaire étendue */}
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <div className="flex items-start gap-6">
                <div className="shrink-0">
                  <div className="w-14 h-14 bg-white border border-secondary rounded-lg flex items-center justify-center">
                    <Clock className="w-7 h-7 text-primary" />
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-primary mb-3">
                    Plage horaire étendue
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Afin de ne pas perturber le cours de votre vie ou de vos
                    activités, nous avons la possibilité d&apos;effectuer nos
                    prestations{" "}
                    <span className="font-semibold text-primary">
                      sans besoin de votre présence à votre domicile
                    </span>
                    , ainsi que{" "}
                    <span className="font-semibold text-primary">
                      le samedi et le dimanche
                    </span>{" "}
                    pour les professionnels avec des sites à forte affluence
                    salariale.
                  </p>
                </div>
              </div>
            </div>

            {/* Prestations flexibles */}
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <div className="flex items-start gap-6">
                <div className="shrink-0">
                  <div className="w-14 h-14 bg-white border border-secondary rounded-lg flex items-center justify-center">
                    <Building className="w-7 h-7 text-primary" />
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-primary mb-3">
                    Prestations flexibles
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Nous intervenons sur tous types de bâtiments et surfaces :{" "}
                    <span className="font-semibold text-primary">
                      Maison individuelle, Entreprise, Collectivités, Monuments,
                      Ponts…
                    </span>
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Notre drone est en capacité d&apos;intervenir n&apos;importe
                    où !
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Nous travaillons pour le compte de clients de toutes tailles
                    et avons pour vocation à continuer ainsi. C&apos;est
                    pourquoi nous essayons de trouver{" "}
                    <span className="font-semibold text-primary">
                      une solution et un budget adapté à chacune des demandes
                    </span>{" "}
                    qui nous est faite.
                  </p>
                </div>
              </div>
            </div>

            {/* Réponse rapide et sur mesure */}
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <div className="flex items-start gap-6">
                <div className="shrink-0">
                  <div className="w-14 h-14 bg-white border border-secondary rounded-lg flex items-center justify-center">
                    <Zap className="w-7 h-7 text-primary" />
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-primary mb-3">
                    Réponse rapide et sur mesure
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Dans la mesure du possible, nous nous engageons à répondre à
                    toute demande de devis dans un délai de{" "}
                    <span className="font-semibold text-primary">
                      48 heures maximum
                    </span>
                    .
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Nous nous employons à appliquer la même réactivité pour nos
                    interventions pour toutes les{" "}
                    <span className="font-semibold text-primary">
                      demandes urgentes
                    </span>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
