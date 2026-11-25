import { Metadata } from "next";
import PageHeader from "@/lib/components/PageHeader";
import CtaBand from "@/lib/components/CtaBand";
import { InfoIcon } from "lucide-react";
import {
  APP_NAME,
  emailContact,
  legalLastUpdate,
  phoneContact,
  siegeAdress,
} from "@/lib/constant";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: `Politique de confidentialité de ${APP_NAME} - Comment nous collectons, utilisons et protégeons vos données personnelles conformément au RGPD.`,
  robots: "noindex, follow",
};

export default function PolitiqueConfidentialite() {
  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        crumbs={[{ name: "Accueil", href: "/" }, { name: "Politique de confidentialité" }]}
        title="Politique de confidentialité"
        lead="Protection de vos données personnelles"
      />

      {/* Contenu */}
      <section className="py-16 md:py-20 flex justify-center">
        <div className="customContainer space-y-12 [&>*]:max-w-3xl [&_strong]:font-medium [&_strong]:text-ink">
          {/* Introduction */}
          <div className="border-t border-line pt-10">
            <div className="mb-4">
              <div>
                <h2 className="text-2xl font-medium text-primary tracking-[-0.02em] mb-5">
                  Introduction
                </h2>
                <div className="space-y-4 text-ink-2 leading-relaxed">
                  <p>
                    Chez <strong>{APP_NAME}</strong>, nous accordons une grande
                    importance à la protection de vos données personnelles.
                    Cette politique de confidentialité vous informe sur la
                    manière dont nous collectons, utilisons, stockons et
                    protégeons vos informations personnelles conformément au
                    Règlement Général sur la Protection des Données (RGPD) et à
                    la loi Informatique et Libertés.
                  </p>
                  <div className="bg-surface-2 border border-line rounded-xl p-4 mt-4">
                    <p className="text-ink font-medium flex items-center gap-2">
                      <span className="text-primary">
                        <InfoIcon size={18} strokeWidth={1.75} />
                      </span>
                      Information importante
                    </p>
                    <p className="text-ink-2 text-sm mt-2 leading-relaxed">
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
                    <strong>Date de dernière mise à jour :</strong> {legalLastUpdate}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 1. Responsable du traitement */}
          <div className="border-t border-line pt-10">
            <div className="mb-5">
              <div>
                <h2 className="text-2xl font-medium text-primary tracking-[-0.02em]">
                  1. Responsable du traitement des données
                </h2>
              </div>
            </div>
            <div className="space-y-3 text-ink-2 leading-relaxed">
              <p>
                <strong>Raison sociale :</strong> {APP_NAME}
              </p>
              <p>
                <strong>Adresse :</strong> {siegeAdress}
              </p>
              <p>
                <strong>Email :</strong>{" "}
                <a
                  href={`mailto:${emailContact}`}
                  className="text-primary underline underline-offset-4 decoration-primary/30 hover:decoration-primary"
                >
                  {emailContact}
                </a>
              </p>
              <p>
                <strong>Téléphone :</strong>{" "}
                <a
                  href={`tel:${phoneContact}`}
                  className="text-primary underline underline-offset-4 decoration-primary/30 hover:decoration-primary"
                >
                  {phoneContact}
                </a>
              </p>
            </div>
          </div>

          {/* 2. Données collectées */}
          <div className="border-t border-line pt-10">
            <div className="mb-5">
              <div>
                <h2 className="text-2xl font-medium text-primary tracking-[-0.02em]">
                  2. Données personnelles collectées
                </h2>
              </div>
            </div>
            <div className="space-y-6 text-ink-2 leading-relaxed">
              <div>
                <h3 className="font-medium text-lg text-ink mb-3">
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
                <h3 className="font-medium text-lg text-ink mb-3">
                  Données collectées automatiquement
                </h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Adresse IP</li>
                  <li>Type de navigateur</li>
                  <li>Pages visitées</li>
                  <li>Date et heure de connexion</li>
                  {/* <li>Données de navigation (cookies)</li> */}
                </ul>
              </div>
            </div>
          </div>

          {/* 3. Finalités du traitement */}
          <div className="border-t border-line pt-10">
            <div className="mb-5">
              <div>
                <h2 className="text-2xl font-medium text-primary tracking-[-0.02em]">
                  3. Finalités du traitement
                </h2>
              </div>
            </div>
            <div className="space-y-4 text-ink-2 leading-relaxed">
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
          <div className="border-t border-line pt-10">
            <h2 className="text-2xl font-medium text-primary tracking-[-0.02em] mb-5">
              4. Base légale du traitement
            </h2>
            <div className="space-y-4 text-ink-2 leading-relaxed">
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
          <div className="border-t border-line pt-10">
            <h2 className="text-2xl font-medium text-primary tracking-[-0.02em] mb-5">
              5. Destinataires des données
            </h2>
            <div className="space-y-4 text-ink-2 leading-relaxed">
              <p>Vos données personnelles sont destinées exclusivement à :</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>L'équipe interne de {APP_NAME}</li>
                <li>
                  Nos prestataires techniques (hébergement web, service
                  d'emailing) sous réserve d'engagements stricts de
                  confidentialité
                </li>
              </ul>
              <p className="font-medium text-ink mt-4">
                Nous ne vendons ni ne louons vos données personnelles à des
                tiers.
              </p>
            </div>
          </div>

          {/* 6. Durée de conservation */}
          <div className="border-t border-line pt-10">
            <h2 className="text-2xl font-medium text-primary tracking-[-0.02em] mb-5">
              6. Durée de conservation des données
            </h2>
            <div className="space-y-4 text-ink-2 leading-relaxed">
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
                {/* <li>
                  <strong>Données de navigation (cookies) :</strong> 13 mois
                  maximum
                </li> */}
              </ul>
              <p className="text-sm bg-surface-2 border border-line p-3 rounded-[10px] mt-4">
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
          <div className="border-t border-line pt-10">
            <div className="mb-5">
              <div>
                <h2 className="text-2xl font-medium text-primary tracking-[-0.02em]">
                  7. Vos droits sur vos données
                </h2>
              </div>
            </div>
            <div className="space-y-4 text-ink-2 leading-relaxed">
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
              <div className="bg-surface-2 border border-line rounded-xl p-4 mt-6">
                <p className="font-medium text-ink mb-2">
                  Pour exercer vos droits :
                </p>
                <p>
                  Envoyez-nous un email à{" "}
                  <a
                    href={`mailto:${emailContact}`}
                    className="text-primary font-medium underline underline-offset-4 decoration-primary/30 hover:decoration-primary"
                  >
                    {emailContact}
                  </a>{" "}
                  en précisant votre demande et en joignant une copie de votre
                  pièce d'identité.
                </p>
                <p className="text-sm mt-2">
                  Nous nous engageons à vous répondre dans un délai d'1 mois.
                </p>
              </div>
              <p className="text-sm text-ink-3 mt-4">
                Vous disposez également du droit d'introduire une réclamation
                auprès de la CNIL (Commission Nationale de l'Informatique et des
                Libertés) :{" "}
                <a
                  href="https://www.cnil.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-4 decoration-primary/30 hover:decoration-primary"
                >
                  www.cnil.fr
                </a>
              </p>
            </div>
          </div>

          {/* 8. Sécurité */}
          <div className="border-t border-line pt-10">
            <div className="mb-5">
              <div>
                <h2 className="text-2xl font-medium text-primary tracking-[-0.02em]">
                  8. Sécurité de vos données
                </h2>
              </div>
            </div>
            <div className="space-y-4 text-ink-2 leading-relaxed">
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
          {/* <div className="border-t border-line pt-10">
            <h2 className="text-2xl font-medium text-primary tracking-[-0.02em] mb-5">
              9. Cookies et technologies similaires
            </h2>
            <div className="space-y-4 text-ink-2 leading-relaxed">
              <p>
                Notre site utilise des cookies pour améliorer votre expérience
                de navigation et réaliser des statistiques de visites.
              </p>
              <div>
                <h3 className="font-medium text-ink mb-2">
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
          </div> */}

          {/* 9. Modifications */}
          <div className="border-t border-line pt-10">
            <h2 className="text-2xl font-medium text-primary tracking-[-0.02em] mb-5">
              9. Modifications de la politique
            </h2>
            <div className="space-y-4 text-ink-2 leading-relaxed">
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
          <div className="pt-8 border-t border-line">
            <p className="text-sm text-ink-3">
              Dernière mise à jour : {legalLastUpdate}
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        title="Une question sur nos services"
        text="Appelez-nous ou écrivez-nous, nous répondons sous 48 heures dans la mesure du possible"
      />
    </main>
  );
}
