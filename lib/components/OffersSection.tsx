import { Users, Gift, Sparkles, Check } from "lucide-react";

export default function OffersSection() {
  return (
    <section className="py-20 md:py-32 bg-gray-50">
      <div className="flex justify-center">
        <div className="customContainer">
          {/* En-tête sobre */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Nos Offres
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Profitez de nos offres avantageuses conçues pour optimiser votre
              budget
            </p>
          </div>

          {/* Liste verticale des offres */}
          <div className="space-y-8  ">
            {/* Offre Groupement */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="p-8">
                <div className="flex items-start gap-6">
                  <div className="shrink-0">
                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Offre Groupement
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Plus vous êtes nombreux, plus vous économisez
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                          <Check className="w-5 h-5 text-blue-600" />
                          <span className="text-gray-700">2 à 5 maisons</span>
                        </div>
                        <span className="font-bold text-blue-600">
                          10% de remise
                        </span>
                      </div>

                      <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                          <Check className="w-5 h-5 text-blue-600" />
                          <span className="text-gray-700">5 à 10 maisons</span>
                        </div>
                        <span className="font-bold text-blue-600">
                          15% de remise
                        </span>
                      </div>

                      <div className="flex items-center justify-between py-3">
                        <div className="flex items-center gap-2">
                          <Check className="w-5 h-5 text-blue-600" />
                          <span className="text-gray-700">
                            10 maisons et plus
                          </span>
                        </div>
                        <span className="font-bold text-blue-600">
                          20% de remise
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Offre Parrainage */}
            <div className="bg-white rounded-xl shadow-sm border-2 border-blue-600 overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="bg-blue-600 px-4 py-2">
                <span className="text-white text-sm font-semibold">
                  Offre populaire
                </span>
              </div>
              <div className="p-8">
                <div className="flex items-start gap-6">
                  <div className="shrink-0">
                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Gift className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Offre Parrainage
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Recommandez-nous et profitez d&apos;avantages mutuels
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-6 text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-1">
                          100€
                        </div>
                        <div className="text-sm text-gray-600">
                          Bon d&apos;achat
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          pour le parrain
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-6 text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-1">
                          100€
                        </div>
                        <div className="text-sm text-gray-600">De remise</div>
                        <div className="text-xs text-gray-500 mt-1">
                          pour le parrainé
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Offre de Lancement */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="p-8">
                <div className="flex items-start gap-6">
                  <div className="shrink-0">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-gray-700" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-2xl font-bold text-gray-900">
                        Offre de Lancement
                      </h3>
                      <span className="inline-block px-3 py-1 bg-gray-900 text-white text-xs font-semibold rounded">
                        Limité
                      </span>
                    </div>

                    <p className="text-gray-600 mb-6">
                      Une remise exceptionnelle pour nos premiers clients
                    </p>

                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="text-center mb-4">
                        <div className="text-5xl font-bold text-gray-900 mb-2">
                          20%
                        </div>
                        <div className="text-gray-700 font-medium">
                          de remise sur toutes nos prestations
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Check className="w-4 h-4 text-gray-700" />
                          <span>Pour les 20 premiers clients</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Check className="w-4 h-4 text-gray-700" />
                          <span>Valable jusqu&apos;au 31 décembre 2025</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA final sobre */}
          {/* <div className="mt-16 text-center">
            <p className="text-gray-600 mb-6">
              Contactez-nous pour en savoir plus sur nos offres
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Demander un devis gratuit
            </a>
          </div> */}
        </div>
      </div>
    </section>
  );
}
