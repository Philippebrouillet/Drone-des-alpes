import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Building2, User, Scale, Shield } from "lucide-react";
import { APP_NAME } from "@/lib/constant";

export const metadata: Metadata = {
  title: "Mentions Légales | Drone des Alpes",
  description:
    "Mentions légales de Drone des Alpes - Informations sur l'entreprise, le directeur de publication, l'hébergement et les conditions d'utilisation du site.",
  robots: "noindex, follow",
};

export default function MentionsLegales() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-primary text-white py-20 pt-35">
        <div className="customContainer mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors duration-200 mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour à l'accueil</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Mentions Légales
          </h1>
          <p className="text-xl text-blue-50">
            Informations légales et réglementaires
          </p>
        </div>
      </section>

      {/* Contenu */}
      <section className="py-16 md:py-20">
        <div className="customContainer mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* 1. Éditeur du site */}
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center shrink-0">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    1. Éditeur du site
                  </h2>
                </div>
              </div>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>Raison sociale :</strong> {APP_NAME}
                </p>
                <p>
                  <strong>Forme juridique :</strong> [À compléter - ex: SARL,
                  SAS, Auto-entrepreneur]
                </p>
                <p>
                  <strong>Capital social :</strong> [À compléter] €
                </p>
                <p>
                  <strong>SIRET :</strong> [À compléter - 14 chiffres]
                </p>
                <p>
                  <strong>RCS :</strong> [À compléter - ex: RCS Annecy]
                </p>
                <p>
                  <strong>Numéro de TVA intracommunautaire :</strong> [À
                  compléter]
                </p>
                <p>
                  <strong>Siège social :</strong> [À compléter - Adresse
                  complète]
                  <br />
                  Rhône-Alpes, France
                </p>
                <p>
                  <strong>Téléphone :</strong>{" "}
                  <a
                    href="tel:+33123456789"
                    className="text-primary hover:underline"
                  >
                    +33 1 23 45 67 89
                  </a>
                </p>
                <p>
                  <strong>Email :</strong>{" "}
                  <a
                    href="mailto:contact@dronedesalpes.fr"
                    className="text-primary hover:underline"
                  >
                    contact@dronedesalpes.fr
                  </a>
                </p>
              </div>
            </div>

            {/* 2. Directeur de publication */}
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center shrink-0">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    2. Directeur de publication
                  </h2>
                </div>
              </div>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>Nom :</strong> [À compléter - Nom du directeur]
                </p>
                <p>
                  <strong>Qualité :</strong> [À compléter - ex: Gérant,
                  Président]
                </p>
                <p>
                  <strong>Contact :</strong>{" "}
                  <a
                    href="mailto:contact@dronedesalpes.fr"
                    className="text-primary hover:underline"
                  >
                    contact@dronedesalpes.fr
                  </a>
                </p>
              </div>
            </div>

            {/* 3. Hébergement */}
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center shrink-0">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    3. Hébergement du site
                  </h2>
                </div>
              </div>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>Hébergeur :</strong> [À compléter - ex: Vercel Inc.,
                  OVH, etc.]
                </p>
                <p>
                  <strong>Adresse :</strong> [À compléter - Adresse de
                  l'hébergeur]
                </p>
                <p>
                  <strong>Site web :</strong>{" "}
                  <a
                    href="https://vercel.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    [À compléter - URL de l'hébergeur]
                  </a>
                </p>
              </div>
            </div>

            {/* 4. Propriété intellectuelle */}
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center shrink-0">
                  <Scale className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    4. Propriété intellectuelle
                  </h2>
                </div>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  L'ensemble de ce site relève de la législation française et
                  internationale sur le droit d'auteur et la propriété
                  intellectuelle. Tous les droits de reproduction sont réservés,
                  y compris pour les documents téléchargeables et les
                  représentations iconographiques et photographiques.
                </p>
                <p>
                  La reproduction de tout ou partie de ce site sur un support
                  électronique quel qu'il soit est formellement interdite sauf
                  autorisation expresse du directeur de la publication.
                </p>
                <p>
                  Les marques et logos figurant sur le site sont des marques
                  déposées. Toute reproduction totale ou partielle de ces
                  marques ou de ces logos effectuée à partir des éléments du
                  site sans l'autorisation expresse de {APP_NAME} est donc
                  prohibée.
                </p>
              </div>
            </div>

            {/* 5. Protection des données */}
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. Protection des données personnelles
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Conformément à la loi « Informatique et Libertés » du 6
                  janvier 1978 modifiée et au Règlement Général sur la
                  Protection des Données (RGPD) du 27 avril 2016, vous disposez
                  d'un droit d'accès, de rectification, de suppression et
                  d'opposition aux données personnelles vous concernant.
                </p>
                <p>
                  Les informations recueillies sur ce site sont enregistrées
                  dans un fichier informatisé par {APP_NAME} pour la gestion des
                  demandes de devis et de contact. Elles sont conservées pendant
                  [durée à définir] et sont destinées uniquement à l'usage
                  interne de l'entreprise.
                </p>
                <p>
                  Pour exercer vos droits, vous pouvez nous contacter à
                  l'adresse suivante :{" "}
                  <a
                    href="mailto:contact@dronedesalpes.fr"
                    className="text-primary hover:underline"
                  >
                    contact@dronedesalpes.fr
                  </a>
                </p>
                <p>
                  Pour plus d'informations, consultez notre{" "}
                  <Link
                    href="/politique-de-confidentialite"
                    className="text-primary hover:underline font-medium"
                  >
                    Politique de confidentialité
                  </Link>
                  .
                </p>
              </div>
            </div>

            {/* 6. Cookies */}
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                6. Cookies
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Ce site peut utiliser des cookies pour améliorer l'expérience
                  utilisateur et réaliser des statistiques de visites. Un cookie
                  est un fichier texte déposé sur votre ordinateur lors de la
                  visite d'un site ou de la consultation d'une publicité.
                </p>
                <p>
                  Vous pouvez désactiver l'utilisation de cookies en
                  sélectionnant les paramètres appropriés de votre navigateur.
                  Cependant, une telle désactivation pourrait empêcher
                  l'utilisation de certaines fonctionnalités de ce site.
                </p>
              </div>
            </div>

            {/* 7. Responsabilité */}
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                7. Limitation de responsabilité
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Les informations contenues sur ce site sont aussi précises que
                  possible et le site est périodiquement remis à jour, mais peut
                  toutefois contenir des inexactitudes, des omissions ou des
                  lacunes.
                </p>
                <p>
                  {APP_NAME} ne pourra être tenu responsable des dommages
                  directs et indirects causés au matériel de l'utilisateur, lors
                  de l'accès au site, et résultant soit de l'utilisation d'un
                  matériel ne répondant pas aux spécifications techniques
                  requises, soit de l'apparition d'un bug ou d'une
                  incompatibilité.
                </p>
                <p>
                  Les liens hypertextes mis en place dans le cadre du présent
                  site en direction d'autres ressources présentes sur Internet
                  ne sauraient engager la responsabilité de {APP_NAME}.
                </p>
              </div>
            </div>

            {/* 8. Droit applicable */}
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                8. Droit applicable et juridiction compétente
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Les présentes mentions légales sont régies par le droit
                  français. En cas de litige et à défaut d'accord amiable, le
                  litige sera porté devant les tribunaux français conformément
                  aux règles de compétence en vigueur.
                </p>
              </div>
            </div>

            {/* Date de mise à jour */}
            <div className="text-center pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Dernière mise à jour : 2 novembre 2025
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-primary-50">
        <div className="customContainer mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Une question sur nos services ?
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Notre équipe est à votre disposition pour répondre à toutes vos
            interrogations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contact"
              className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-400 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Nous contacter
            </Link>
            <Link
              href="/"
              className="inline-block bg-white border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-50 transition-colors duration-200"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
