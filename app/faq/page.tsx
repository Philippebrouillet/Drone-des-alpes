import { Metadata } from "next";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import PageHeader from "@/lib/components/PageHeader";
import CtaBand from "@/lib/components/CtaBand";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { APP_NAME, prodUrl } from "@/lib/constant";

export const metadata: Metadata = {
  title: "FAQ - Questions fréquentes sur le nettoyage par drone",
  description:
    "Prix, zones d'intervention, efficacité, durée, produits utilisés : toutes les réponses à vos questions sur le nettoyage par drone en Haute-Savoie, Savoie, Ain, Isère et Jura.",
  keywords: [
    "faq nettoyage drone",
    "prix nettoyage toiture drone",
    "questions nettoyage drone",
    "efficacité drone nettoyage",
    "zone intervention drone",
  ],
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: `FAQ - Questions sur le nettoyage par drone | ${APP_NAME}`,
    description:
      "Toutes les réponses à vos questions sur le nettoyage par drone en Haute-Savoie, Savoie, Ain, Isère et Jura.",
    type: "website",
    url: `${prodUrl}/faq`,
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
      "Nous intervenons en Haute-Savoie, Savoie, Ain, Isère et Jura. Nos principales zones d'intervention incluent Annecy, Annemasse, Cluses, Thonon-les-Bains, Chamonix, Sallanches, Chambéry, Aix-les-Bains, Albertville, Grenoble, Bourg-en-Bresse, Lons-le-Saunier et toutes les villes environnantes. N'hésitez pas à nous contacter pour confirmer notre disponibilité dans votre secteur.",
  },
  {
    question: "Le nettoyage par drone est-il vraiment efficace ?",
    answer:
      "Oui. Le nettoyage par drone est même plus efficace que les méthodes traditionnelles car le drone peut accéder à toutes les zones, même les plus difficiles. La pulvérisation se fait de manière homogène et précise, sans oublier aucun recoin. De plus, nous utilisons des produits professionnels écologiques et biodégradables spécialement adaptés.",
  },
  {
    question: "Quelle est la durée d'une intervention ?",
    answer:
      "Une intervention standard (maison individuelle) dure généralement entre 1h et 3h selon la surface et le type de prestation. C'est jusqu'à 5 fois plus rapide qu'un nettoyage traditionnel. Pour les grandes surfaces ou bâtiments professionnels, nous établissons un planning détaillé lors du devis.",
  },
  {
    question: "Le drone peut-il endommager ma toiture ou mes façades ?",
    answer:
      "Non. Le drone n'entre jamais en contact direct avec les surfaces. Il pulvérise les produits de nettoyage à distance de sécurité. Cette méthode est d'ailleurs plus sûre que le nettoyage traditionnel qui implique de marcher sur le toit, risquant de casser des tuiles ou d'endommager des joints.",
  },
  {
    question: "Utilisez-vous des produits chimiques dangereux ?",
    answer:
      "Non. Nous utilisons exclusivement des produits écologiques, biodégradables et non abrasifs. Ils sont sans danger pour vos biens, votre famille, vos animaux de compagnie et l'environnement. Ces produits professionnels sont conçus spécifiquement pour le nettoyage par pulvérisation et respectent toutes les normes environnementales.",
  },
  {
    question: "À quelle fréquence faut-il nettoyer sa toiture ?",
    answer:
      "La fréquence recommandée est tous les 2 à 3 ans pour une toiture standard, mais cela dépend de plusieurs facteurs : le type de tuiles, l'exposition (ombre, humidité), la présence d'arbres à proximité et le climat local. Un entretien régulier permet d'éviter l'accumulation excessive de mousse et prolonge la durée de vie de votre toiture.",
  },
  {
    question: "Proposez-vous des devis gratuits ?",
    answer:
      "Oui, tous nos devis sont gratuits et sans engagement. Nous nous engageons à vous répondre dans un délai de 48h maximum. Remplissez simplement notre formulaire de contact ou appelez-nous directement. Nous pourrons vous donner une estimation précise après avoir évalué vos besoins.",
  },
  {
    question: "Intervenez-vous sur des bâtiments industriels ?",
    answer:
      "Oui. Nous nettoyons bardages, silos, entrepôts, bâtiments de production et structures industrielles, y compris sur de grandes surfaces, en hauteur et dans les zones difficiles d'accès. Le drone limite le recours aux nacelles et aux échafaudages : moins de personnel exposé au travail en hauteur et une immobilisation minimale de vos zones de travail. Selon la configuration du site, il peut être complété par nos perches télescopiques professionnelles.",
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
      "Oui. Actuellement, nous offrons 20% de remise sur toutes nos prestations pour les 20 premiers clients. C'est le moment idéal pour découvrir nos services à prix réduit. Cette offre est limitée dans le temps, demandez votre devis dès maintenant.",
  },
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-white">
      {/*
        Données structurées rendues côté serveur : présentes dans le HTML
        livré, sans dépendre de l'exécution du JavaScript.
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            faqSchema(faqs),
            breadcrumbSchema([
              { name: "Accueil", url: prodUrl },
              { name: "FAQ", url: `${prodUrl}/faq` },
            ]),
          ]),
        }}
      />

      <PageHeader
        crumbs={[{ name: "Accueil", href: "/" }, { name: "FAQ" }]}
        title="Nettoyage par drone : questions fréquentes"
        lead={
          <p>
            Prix, durée, produits, zones d&apos;intervention. Si vous ne
            trouvez pas votre réponse,{" "}
            <Link
              href="/#contact"
              className="text-white underline underline-offset-4 decoration-white/40 hover:decoration-white"
            >
              contactez-nous
            </Link>
          </p>
        }
      />

      <section className="section flex justify-center">
        <div className="customContainer">
          <div className="max-w-3xl divide-y divide-line border-y border-line">
            {faqs.map((faq) => (
              <details key={faq.question} className="group">
                <summary className="flex items-center justify-between gap-6 py-6 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                  <h2 className="text-lg font-medium text-ink group-hover:text-primary transition-colors duration-150">
                    {faq.question}
                  </h2>
                  <ChevronDown
                    size={18}
                    strokeWidth={1.75}
                    className="text-ink-3 shrink-0 transition-transform duration-200 ease-out-soft group-open:rotate-180"
                  />
                </summary>
                <p className="pb-6 -mt-1 text-[17px] text-ink-2 leading-relaxed max-w-[65ch]">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Une question qui n'est pas dans la liste"
        text="Appelez-nous ou écrivez-nous, nous répondons sous 48 heures dans la mesure du possible"
      />
    </main>
  );
}
