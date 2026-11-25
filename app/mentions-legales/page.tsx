import { Metadata } from "next";
import PageHeader from "@/lib/components/PageHeader";
import CtaBand from "@/lib/components/CtaBand";
import {
  APP_NAME,
  emailContact,
  legalLastUpdate,
  phoneContact,
  siegeAdress,
} from "@/lib/constant";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `Mentions légales de ${APP_NAME} - Informations sur l'entreprise, le directeur de publication, l'hébergement et les conditions d'utilisation du site.`,
  robots: "noindex, follow",
};

export default function MentionsLegales() {
  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        crumbs={[{ name: "Accueil", href: "/" }, { name: "Mentions légales" }]}
        title="Mentions légales"
        lead="Informations légales et réglementaires"
      />

      {/* Contenu */}
      <section className="py-16 md:py-20 flex justify-center">
        <div className="customContainer space-y-12 [&>*]:max-w-3xl [&_strong]:font-medium [&_strong]:text-ink">
          {/* 1. Éditeur du site */}
          <div className="border-t border-line pt-10">
            <div className="mb-5">
              <div>
                <h2 className="text-2xl font-medium text-primary tracking-[-0.02em]">
                  1. Éditeur du site
                </h2>
              </div>
            </div>
            <div className="space-y-3 text-ink-2 leading-relaxed">
              <p>
                <strong>Raison sociale :</strong> {APP_NAME}
              </p>
              <p>
                <strong>Forme juridique :</strong> Société par actions
                simplifiée (SAS)
              </p>

              <p>
                <strong>SIREN :</strong> 994 670 255
              </p>
              <p>
                <strong>RCS :</strong> Annecy
              </p>

              <p>
                <strong>Siège social :</strong> {siegeAdress}
                <br />
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
              <p>
                <strong>Email :</strong>{" "}
                <a
                  href={`mailto:${emailContact}`}
                  className="text-primary underline underline-offset-4 decoration-primary/30 hover:decoration-primary"
                >
                  {emailContact}
                </a>
              </p>
            </div>
          </div>

          {/* 2. Directeur de publication */}
          <div className="border-t border-line pt-10">
            <div className="mb-5">
              <div>
                <h2 className="text-2xl font-medium text-primary tracking-[-0.02em]">
                  2. Directeur de publication
                </h2>
              </div>
            </div>
            <div className="space-y-3 text-ink-2 leading-relaxed">
              <p>
                <strong>Nom :</strong> Jules Menguy
              </p>
              <p>
                <strong>Qualité :</strong> Fondateur de {APP_NAME}
              </p>
              <p>
                <strong>Contact :</strong>{" "}
                <a
                  href={`mailto:${emailContact}`}
                  className="text-primary underline underline-offset-4 decoration-primary/30 hover:decoration-primary"
                >
                  {emailContact}
                </a>
              </p>
            </div>
          </div>

          {/* 3. Hébergement */}
          <div className="border-t border-line pt-10">
            <div className="mb-5">
              <div>
                <h2 className="text-2xl font-medium text-primary tracking-[-0.02em]">
                  3. Hébergement du site
                </h2>
              </div>
            </div>
            <div className="space-y-3 text-ink-2 leading-relaxed">
              <p>
                <strong>Hébergeur :</strong> Vercel Inc.
              </p>
              <p>
                <strong>Adresse :</strong> 440 N Barranca Ave #4133, Covina, CA
                91723
              </p>
              <p>
                <strong>Site web :</strong>{" "}
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-4 decoration-primary/30 hover:decoration-primary"
                >
                  https://vercel.com/
                </a>
              </p>
            </div>
          </div>

          {/* 4. Propriété intellectuelle */}
          <div className="border-t border-line pt-10">
            <div className="mb-5">
              <div>
                <h2 className="text-2xl font-medium text-primary tracking-[-0.02em]">
                  4. Propriété intellectuelle
                </h2>
              </div>
            </div>
            <div className="space-y-4 text-ink-2 leading-relaxed">
              <p>
                L'ensemble de ce site relève de la législation française et
                internationale sur le droit d'auteur et la propriété
                intellectuelle. Tous les droits de reproduction sont réservés, y
                compris pour les documents téléchargeables et les
                représentations iconographiques et photographiques.
              </p>
              <p>
                La reproduction de tout ou partie de ce site sur un support
                électronique quel qu'il soit est formellement interdite sauf
                autorisation expresse du directeur de la publication.
              </p>
              <p>
                Les marques et logos figurant sur le site sont des marques
                déposées. Toute reproduction totale ou partielle de ces marques
                ou de ces logos effectuée à partir des éléments du site sans
                l'autorisation expresse de {APP_NAME} est donc prohibée.
              </p>
            </div>
          </div>

          {/* 5. Responsabilité */}
          <div className="border-t border-line pt-10">
            <h2 className="text-2xl font-medium text-primary tracking-[-0.02em] mb-5">
              5. Limitation de responsabilité
            </h2>
            <div className="space-y-4 text-ink-2 leading-relaxed">
              <p>
                Les informations contenues sur ce site sont aussi précises que
                possible et le site est périodiquement remis à jour, mais peut
                toutefois contenir des inexactitudes, des omissions ou des
                lacunes.
              </p>
              <p>
                {APP_NAME} ne pourra être tenu responsable des dommages directs
                et indirects causés au matériel de l'utilisateur, lors de
                l'accès au site, et résultant soit de l'utilisation d'un
                matériel ne répondant pas aux spécifications techniques
                requises, soit de l'apparition d'un bug ou d'une
                incompatibilité.
              </p>
              <p>
                Les liens hypertextes mis en place dans le cadre du présent site
                en direction d'autres ressources présentes sur Internet ne
                sauraient engager la responsabilité de {APP_NAME}.
              </p>
            </div>
          </div>

          {/* 6. Droit applicable */}
          <div className="border-t border-line pt-10">
            <h2 className="text-2xl font-medium text-primary tracking-[-0.02em] mb-5">
              6. Droit applicable et juridiction compétente
            </h2>
            <div className="space-y-4 text-ink-2 leading-relaxed">
              <p>
                Les présentes mentions légales sont régies par le droit
                français. En cas de litige et à défaut d'accord amiable, le
                litige sera porté devant les tribunaux français conformément aux
                règles de compétence en vigueur.
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
