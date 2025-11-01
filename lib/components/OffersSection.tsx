import { Users, Gift, Sparkles } from "lucide-react";

export default function OffersSection() {
  return (
    <section className="py-20 md:py-32 bg-gray-50">
      <div className="flex justify-center px-4">
        <div className="customContainer">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Nos Offres
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Profitez de nos offres avantageuses pour optimiser votre budget
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Offre Groupement */}
            <div className="relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Offre Groupement
              </h3>

              <p className="text-gray-600 mb-6">
                Plus vous êtes nombreux, plus vous économisez
              </p>

              <div className="bg-blue-50 rounded-xl p-6 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">
                    2 à 5 maisons
                  </span>
                  <span className="text-blue-600 font-bold">10% de remise</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">
                    5 à 10 maisons
                  </span>
                  <span className="text-blue-600 font-bold">15% de remise</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">
                    10 maisons et plus
                  </span>
                  <span className="text-blue-600 font-bold">20% de remise</span>
                </div>
              </div>
            </div>

            {/* Offre Parrainage */}
            <div className="relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <Gift className="w-8 h-8 text-purple-600" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Offre Parrainage
              </h3>

              <p className="text-gray-600 mb-6">
                Gagnant-gagnant pour vous et vos proches
              </p>

              <div className="bg-purple-50 rounded-xl p-6 space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    100€ de bon d&apos;achat
                  </div>
                  <div className="text-sm text-gray-600">pour le parrain</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    100€ de remise
                  </div>
                  <div className="text-sm text-gray-600">pour le parrainé</div>
                </div>
              </div>
            </div>

            {/* Offre de Lancement */}
            <div className="relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="absolute top-4 right-4 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                Limité
              </div>

              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-orange-600" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Offre de Lancement
              </h3>

              <p className="text-gray-600 mb-6">
                Profitez de notre offre exceptionnelle
              </p>

              <div className="bg-orange-50 rounded-xl p-6 mb-4">
                <div className="text-center space-y-2">
                  <div className="text-4xl font-bold text-orange-600">
                    20% de remise
                  </div>
                  <div className="text-gray-700 font-medium">
                    Pour les 20 premiers clients
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-500 text-center">
                Offre valable jusqu&apos;au 31 décembre 2025
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-600 mb-6">
              Contactez-nous pour profiter de nos offres exceptionnelles
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Demander un devis gratuit
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
