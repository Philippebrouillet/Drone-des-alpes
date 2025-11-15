import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Shield,
  Eye,
  Lock,
  Database,
  UserCheck,
  AlertTriangle,
  InfoIcon,
} from "lucide-react";
import { APP_NAME } from "@/lib/constant";

export const metadata: Metadata = {
  title: `Politique de Confidentialité | ${APP_NAME}`,
  description: `Politique de confidentialité de ${APP_NAME} - Comment nous collectons, utilisons et protégeons vos données personnelles conformément au RGPD.`,
  robots: "noindex, follow",
};

export default function PolitiqueConfidentialite() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-primary text-white py-20 pt-35 flex justify-center">
        <div className="customContainer">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors duration-200 mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour à l'accueil</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Politique de Confidentialité
          </h1>
          <p className="text-xl text-primary-50">
            Protection de vos données personnelles
          </p>
        </div>
      </section>

      {/* Contenu */}
      <section className="py-16 md:py-20 flex justify-center">
        <div className="customContainer  space-y-12 ">
          {/* Introduction */}
          <div className="bg-primary-50 rounded-xl p-8 border border-primary-200">
            <div className="flex items-start gap-4 mb-4">
              <Shield className="w-8 h-8 text-primary shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Introduction
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Chez <strong>{APP_NAME}</strong>, nous accordons une grande
                    importance à la protection de vos données personnelles.
                    Cette politique de confidentialité vous informe sur la
                    manière dont nous collectons, utilisons, stockons et
                    protégeons vos informations personnelles conformément au
                    Règlement Général sur la Protection des Données (RGPD) et à
                    la loi Informatique et Libertés.
                  </p>
                  <div className="bg-white border-2 border-primary-400 rounded-lg p-4 mt-4">
                    <p className="text-gray-800 font-semibold flex items-center gap-2">
                      <span className="text-primary text-xl">
                        <InfoIcon />
                      </span>
                      Information importante
                    </p>
                    <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                      Les informations que vous nous transmettez via notre
                      formulaire de contact sont{" "}
                      <strong>envoyées directement par email</strong> à notre
                      équipe.
                      <strong>
                        {" "}
                        Nous ne stockons pas vos données dans une base de
                        données
                      </strong>{" "}
                      sur notre site internet. Vos informations sont uniquement
                      conservées dans nos boîtes emails professionnelles pour le
                      traitement de votre demande.
                    </p>
                  </div>
                  <p>
                    <strong>Date de dernière mise à jour :</strong> 2 novembre
                    2025
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 1. Responsable du traitement */}
          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center shrink-0">
                <UserCheck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  1. Responsable du traitement des données
                </h2>
              </div>
            </div>
            <div className="space-y-3 text-gray-700">
              <p>
                <strong>Raison sociale :</strong> {APP_NAME}
              </p>
              <p>
                <strong>Adresse :</strong> [À compléter - Adresse complète]
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
              <p>
                <strong>Téléphone :</strong>{" "}
                <a
                  href="tel:+33123456789"
                  className="text-primary hover:underline"
                >
                  +33 1 23 45 67 89
                </a>
              </p>
            </div>
          </div>

          {/* 2. Données collectées */}
          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center shrink-0">
                <Database className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  2. Données personnelles collectées
                </h2>
              </div>
            </div>
            <div className="space-y-6 text-gray-700">
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-3">
                  Données collectées via le formulaire de contact
                </h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li>
                    Nom et prénom (ou raison sociale pour les professionnels)
                  </li>
                  <li>Adresse email</li>
                  <li>Numéro de téléphone</li>
                  <li>Adresse postale</li>
                  <li>Type de prestation demandée</li>
                  <li>Informations complémentaires (message)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-3">
                  Données collectées automatiquement
                </h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Adresse IP</li>
                  <li>Type de navigateur</li>
                  <li>Pages visitées</li>
                  <li>Date et heure de connexion</li>
                  <li>Données de navigation (cookies)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 3. Finalités du traitement */}
          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center shrink-0">
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  3. Finalités du traitement
                </h2>
              </div>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Vos données personnelles sont collectées et traitées pour les
                finalités suivantes :
              </p>
              <ul className="space-y-3 list-disc list-inside">
                <li>
                  <strong>Gestion des demandes de devis et de contact :</strong>{" "}
                  répondre à vos demandes d'information et établir des devis
                  personnalisés
                </li>
                <li>
                  <strong>Gestion de la relation client :</strong> suivi de
                  votre dossier, communication sur nos prestations
                </li>
                <li>
                  <strong>Amélioration de nos services :</strong> analyse
                  statistique de la fréquentation du site
                </li>
                <li>
                  <strong>Respect de nos obligations légales :</strong>{" "}
                  facturation, comptabilité
                </li>
              </ul>
            </div>
          </div>

          {/* 4. Base légale */}
          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Base légale du traitement
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Le traitement de vos données personnelles repose sur les bases
                légales suivantes :
              </p>
              <ul className="space-y-3 list-disc list-inside">
                <li>
                  <strong>Votre consentement :</strong> lorsque vous remplissez
                  le formulaire de contact
                </li>
                <li>
                  <strong>L'exécution d'un contrat :</strong> pour la
                  réalisation de nos prestations
                </li>
                <li>
                  <strong>L'intérêt légitime :</strong> pour améliorer nos
                  services et notre communication
                </li>
                <li>
                  <strong>Le respect d'obligations légales :</strong> pour la
                  facturation et la comptabilité
                </li>
              </ul>
            </div>
          </div>

          {/* 5. Destinataires des données */}
          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. Destinataires des données
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>Vos données personnelles sont destinées exclusivement à :</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>L'équipe interne de {APP_NAME}</li>
                <li>
                  Nos prestataires techniques (hébergement web, service
                  d'emailing) sous réserve d'engagements stricts de
                  confidentialité
                </li>
              </ul>
              <p className="font-semibold text-gray-900 mt-4">
                Nous ne vendons ni ne louons vos données personnelles à des
                tiers.
              </p>
            </div>
          </div>

          {/* 6. Durée de conservation */}
          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Durée de conservation des données
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Les données transmises via le formulaire de contact sont
                envoyées par email et conservées dans nos boîtes emails
                professionnelles selon les durées suivantes :
              </p>
              <ul className="space-y-3 list-disc list-inside">
                <li>
                  <strong>Emails de demandes de devis (prospects) :</strong> 3
                  ans maximum à compter du dernier échange
                </li>
                <li>
                  <strong>Emails clients :</strong> 10 ans pour les échanges
                  liés à la facturation et documents contractuels (obligation
                  légale)
                </li>
                <li>
                  <strong>Données de navigation (cookies) :</strong> 13 mois
                  maximum
                </li>
              </ul>
              <p className="text-sm bg-gray-100 p-3 rounded-lg mt-4">
                <strong>Note :</strong> Vous pouvez demander la suppression de
                vos emails à tout moment en nous contactant. Nous supprimerons
                alors toutes les données vous concernant de nos boîtes emails,
                sauf si nous avons une obligation légale de les conserver (par
                exemple pour la comptabilité).
              </p>
              <p>
                À l'issue de ces délais, vos données sont supprimées ou
                anonymisées.
              </p>
            </div>
          </div>

          {/* 7. Vos droits */}
          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center shrink-0">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  7. Vos droits sur vos données
                </h2>
              </div>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Conformément au RGPD et à la loi Informatique et Libertés, vous
                disposez des droits suivants :
              </p>
              <ul className="space-y-3 list-disc list-inside">
                <li>
                  <strong>Droit d'accès :</strong> obtenir une copie de vos
                  données personnelles
                </li>
                <li>
                  <strong>Droit de rectification :</strong> corriger des données
                  inexactes ou incomplètes
                </li>
                <li>
                  <strong>Droit à l'effacement :</strong> supprimer vos données
                  dans certaines conditions
                </li>
                <li>
                  <strong>Droit d'opposition :</strong> vous opposer au
                  traitement de vos données
                </li>
                <li>
                  <strong>Droit à la limitation :</strong> limiter le traitement
                  de vos données
                </li>
                <li>
                  <strong>Droit à la portabilité :</strong> récupérer vos
                  données dans un format structuré
                </li>
                <li>
                  <strong>Droit de retirer votre consentement :</strong> à tout
                  moment
                </li>
              </ul>
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mt-6">
                <p className="font-semibold text-gray-900 mb-2">
                  Pour exercer vos droits :
                </p>
                <p>
                  Envoyez-nous un email à{" "}
                  <a
                    href="mailto:contact@dronedesalpes.fr"
                    className="text-primary hover:underline font-medium"
                  >
                    contact@dronedesalpes.fr
                  </a>{" "}
                  en précisant votre demande et en joignant une copie de votre
                  pièce d'identité.
                </p>
                <p className="text-sm mt-2">
                  Nous nous engageons à vous répondre dans un délai d'1 mois.
                </p>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                Vous disposez également du droit d'introduire une réclamation
                auprès de la CNIL (Commission Nationale de l'Informatique et des
                Libertés) :{" "}
                <a
                  href="https://www.cnil.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  www.cnil.fr
                </a>
              </p>
            </div>
          </div>

          {/* 8. Sécurité */}
          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  8. Sécurité de vos données
                </h2>
              </div>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Nous mettons en œuvre toutes les mesures techniques et
                organisationnelles appropriées pour protéger vos données
                personnelles contre :
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li>La perte accidentelle</li>
                <li>L'utilisation ou l'accès non autorisé</li>
                <li>La modification ou la divulgation</li>
              </ul>
              <p>
                Nos mesures de sécurité incluent le chiffrement SSL/TLS,
                l'hébergement sécurisé et des contrôles d'accès stricts.
              </p>
            </div>
          </div>

          {/* 9. Cookies */}
          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              9. Cookies et technologies similaires
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Notre site utilise des cookies pour améliorer votre expérience
                de navigation et réaliser des statistiques de visites.
              </p>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Types de cookies utilisés :
                </h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li>
                    <strong>Cookies essentiels :</strong> nécessaires au
                    fonctionnement du site
                  </li>
                  <li>
                    <strong>Cookies analytiques :</strong> pour mesurer
                    l'audience (Google Analytics)
                  </li>
                  <li>
                    <strong>Cookies fonctionnels :</strong> pour mémoriser vos
                    préférences
                  </li>
                </ul>
              </div>
              <p>
                Vous pouvez configurer votre navigateur pour refuser les cookies
                ou être averti lors de leur dépôt. Notez que le refus de
                certains cookies peut limiter les fonctionnalités du site.
              </p>
            </div>
          </div>

          {/* 10. Modifications */}
          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              10. Modifications de la politique
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Nous nous réservons le droit de modifier cette politique de
                confidentialité à tout moment. Les modifications entrent en
                vigueur dès leur publication sur cette page.
              </p>
              <p>
                Nous vous invitons à consulter régulièrement cette page pour
                prendre connaissance des éventuelles modifications.
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
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gray-50 flex justify-center">
        <div className="customContainer text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Des questions sur vos données personnelles ?
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Notre équipe est à votre disposition pour toute question concernant
            la protection de vos données.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="mailto:contact@dronedesalpes.fr"
              className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-400 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Nous écrire
            </Link>
            <Link
              href="/"
              className="inline-block bg-white border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
