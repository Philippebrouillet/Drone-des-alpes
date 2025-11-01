import { Zap, Leaf, EuroIcon, ShieldCheck } from "lucide-react";

export default function AdvantagesSection() {
  const advantages = [
    {
      icon: Zap,
      title: "Rapide et efficace",
      description:
        "Plus besoin d'échafaudage ni de nacelle : le drone accède facilement à toutes les zones, même les plus difficiles, et cible avec précision les surfaces à traiter.",
    },
    {
      icon: Leaf,
      title: "Écologique",
      description:
        "Nous utilisons exclusivement des produits non abrasifs, écologiques et biodégradables, pour la sécurité de vos biens, de vos proches et même de vos vers de terre !",
    },
    {
      icon: EuroIcon,
      title: "Économique",
      description:
        "L'utilisation du drone supprime les installations coûteuses et superflues, ce qui permet de réduire considérablement les coûts d'intervention par rapport aux méthodes traditionnelles.",
    },
    {
      icon: ShieldCheck,
      title: "Sécurisé",
      description:
        "Aucune intervention humaine en hauteur : zéro risque de chute ou de dégradation. Un périmètre de sécurité est systématiquement établi autour de la zone de vol.",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-gray-50">
      <div className="flex justify-center ">
        <div className="customContainer">
          {/* Titre de la section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Les avantages du nettoyage par drone
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Une technologie qui combine performance, sécurité et respect de
              l&apos;environnement
            </p>
          </div>

          {/* Grille des avantages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {advantages.map((advantage, index) => {
              const Icon = advantage.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Icône avec background */}
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>

                  {/* Titre */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {advantage.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">
                    {advantage.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
