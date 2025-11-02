import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, HelpCircle, ChevronDown } from "lucide-react";
import Script from "next/script";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "FAQ - Questions Fréquentes | Drone des Alpes",
  description:
    "Toutes les réponses à vos questions sur le nettoyage par drone : prix, zones d'intervention, efficacité, durée. Découvrez notre expertise en Rhône-Alpes.",
  keywords: [
    "faq nettoyage drone",
    "prix nettoyage toiture drone",
    "questions nettoyage drone",
    "efficacité drone nettoyage",
    "zone intervention drone",
  ],
  openGraph: {
    title: "FAQ - Questions sur le nettoyage par drone | Drone des Alpes",
    description:
      "Toutes les réponses à vos questions sur le nettoyage par drone en Rhône-Alpes.",
    type: "website",
  },
};

const faqs = [
  {
    question: "Combien coûte un nettoyage de toiture par drone ?",
    answer:
      "Le prix varie selon plusieurs facteurs : la surface à nettoyer, l'état de la toiture, l'accessibilité et le type de nettoyage souhaité. En moyenne, un nettoyage par drone coûte 30 à 50% moins cher qu'un nettoyage traditionnel avec échafaudage. Contactez-nous pour un devis gratuit et personnalisé sous 48h.",
  },
  {
    question: "Dans quelles villes intervenez-vous en Rhône-Alpes ?",
    answer:
      "Nous intervenons dans toute la région Rhône-Alpes, notamment en Haute-Savoie, Savoie, Ain, Isère et Jura. Nos principales zones d'intervention incluent Lyon, Grenoble, Annecy, Chambéry, Annemasse, Thonon-les-Bains, Chamonix, Bourg-en-Bresse et toutes les villes environnantes. N'hésitez pas à nous contacter pour confirmer notre disponibilité dans votre secteur.",
  },
  {
    question: "Le nettoyage par drone est-il vraiment efficace ?",
    answer:
      "Oui, totalement ! Le nettoyage par drone est même plus efficace que les méthodes traditionnelles car le drone peut accéder à toutes les zones, même les plus difficiles. La pulvérisation se fait de manière homogène et précise, sans oublier aucun recoin. De plus, nous utilisons des produits professionnels écologiques et biodégradables spécialement adaptés.",
  },
  {
    question: "Quelle est la durée d'une intervention ?",
    answer:
      "Une intervention standard (maison individuelle) dure généralement entre 1h et 3h selon la surface et le type de prestation. C'est jusqu'à 5 fois plus rapide qu'un nettoyage traditionnel ! Pour les grandes surfaces ou bâtiments professionnels, nous établissons un planning détaillé lors du devis.",
  },
  {
    question: "Le drone peut-il endommager ma toiture ou mes façades ?",
    answer:
      "Non, absolument pas. Le drone n'entre jamais en contact direct avec les surfaces. Il pulvérise les produits de nettoyage à distance de sécurité. Cette méthode est d'ailleurs plus sûre que le nettoyage traditionnel qui implique de marcher sur le toit, risquant de casser des tuiles ou d'endommager des joints.",
  },
  {
    question: "Utilisez-vous des produits chimiques dangereux ?",
    answer:
      "Non ! Nous utilisons exclusivement des produits écologiques, biodégradables et non abrasifs. Ils sont sans danger pour vos biens, votre famille, vos animaux de compagnie et l'environnement. Ces produits professionnels sont conçus spécifiquement pour le nettoyage par pulvérisation et respectent toutes les normes environnementales.",
  },
  {
    question: "À quelle fréquence faut-il nettoyer sa toiture ?",
    answer:
      "La fréquence recommandée est tous les 2 à 3 ans pour une toiture standard, mais cela dépend de plusieurs facteurs : le type de tuiles, l'exposition (ombre, humidité), la présence d'arbres à proximité et le climat local. Un entretien régulier permet d'éviter l'accumulation excessive de mousse et prolonge la durée de vie de votre toiture.",
  },
  {
    question: "Proposez-vous des devis gratuits ?",
    answer:
      "Oui, tous nos devis sont gratuits et sans engagement ! Nous nous engageons à vous répondre dans un délai de 48h maximum. Remplissez simplement notre formulaire de contact ou appelez-nous directement. Nous pourrons vous donner une estimation précise après avoir évalué vos besoins.",
  },
  {
    question:
      "Le nettoyage par drone fonctionne-t-il pour les panneaux solaires ?",
    answer:
      "Absolument ! Le nettoyage par drone est même particulièrement recommandé pour les panneaux solaires. La saleté, poussière et pollen peuvent réduire le rendement de vos panneaux jusqu'à 20%. Notre méthode douce et précise nettoie efficacement sans risquer d'endommager les cellules photovoltaïques ou les joints.",
  },
  {
    question: "Intervenez-vous par tous les temps ?",
    answer:
      "Nous intervenons dans des conditions météorologiques favorables pour garantir la qualité du service. Nous évitons les jours de pluie, de vent fort ou de gel. Si les conditions ne sont pas optimales le jour prévu, nous reprogrammons l'intervention sans frais supplémentaires.",
  },
  {
    question: "Faut-il être présent pendant l'intervention ?",
    answer:
      "Ce n'est pas obligatoire, mais nous recommandons qu'une personne soit présente, au moins au début et à la fin de l'intervention. Cela nous permet de vous expliquer le processus, de répondre à vos questions et de vous montrer le résultat. Si vous ne pouvez pas être là, nous pouvons convenir d'arrangements alternatifs.",
  },
  {
    question: "Proposez-vous des remises pour les premiers clients ?",
    answer:
      "Oui ! Actuellement, nous offrons 20% de remise sur toutes nos prestations pour les 20 premiers clients. C'est le moment idéal pour découvrir nos services à prix réduit. Cette offre est limitée dans le temps, alors n'hésitez pas à demander votre devis dès maintenant !",
  },
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Schema JSON-LD pour la FAQ */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(faqs)),
        }}
      />

      {/* Header */}
      <section className="bg-linear-to-br from-blue-600 to-blue-500 text-white py-20 pt-35 flex justify-center">
        <div className="customContainer ">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors duration-200 mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour à l'accueil</span>
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <HelpCircle className="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl font-bold">
              Questions Fréquentes (FAQ)
            </h1>
          </div>
          <p className="text-xl text-blue-50">
            Toutes les réponses sur le nettoyage par drone
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-gray-50 flex justify-center">
        <div className="customContainer  text-center">
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Vous avez des questions sur nos services de nettoyage par drone ?
            Consultez notre FAQ pour trouver rapidement des réponses. Si vous ne
            trouvez pas ce que vous cherchez,{" "}
            <Link
              href="/#contact"
              className="text-blue-600 font-semibold hover:underline"
            >
              contactez-nous directement
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Questions & Réponses */}
      <section className="py-16 md:py-20 flex justify-center">
        <div className="customContainer ">
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-blue-400 transition-colors duration-200"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer select-none">
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown className="w-5 h-5 text-gray-500 shrink-0 transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-6 pt-2">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-linear-to-br from-blue-600 to-blue-500 flex justify-center">
        <div className="customContainer text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Vous avez d'autres questions ?
          </h2>
          <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto">
            Notre équipe est à votre disposition pour répondre à toutes vos
            interrogations et vous fournir un devis gratuit personnalisé.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contact"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Demander un devis gratuit
            </Link>
            <Link
              href="/"
              className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors duration-200"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
