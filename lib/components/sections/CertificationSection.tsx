import { APP_NAME } from "@/lib/constant";
import Image from "next/image";
import { Award, CheckCircle } from "lucide-react";

export default function CertificationSection() {
  return (
    <section className="section bg-gray-50">
      <div className="flex justify-center">
        <div className="customContainer">
          {/* En-tête */}
          <div className="text-center mb-12">
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-4">
              <Award className="w-16 h-16 text-secondary " />
              <h2 className="text-4xl md:text-5xl font-bold text-primary">
                Certification Professionnelle
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une expertise reconnue pour des interventions en toute sécurité
            </p>
          </div>

          {/* Contenu principal */}
          <div className=" mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Image de certification */}
              <div className="order-2 lg:order-1">
                <div className="relative bg-linear-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 shadow-lg border border-gray-200">
                  <Image
                    src="/certification.png"
                    alt={`Certification professionnelle ${APP_NAME}`}
                    width={200}
                    height={50}
                    loading="lazy"
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                </div>
              </div>

              {/* Texte explicatif */}
              <div className="order-1 lg:order-2">
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">
                    Nos télépilotes sont certifiés et formés
                  </h3>

                  <p className="text-lg text-gray-700 leading-relaxed">
                    Afin de garantir un{" "}
                    <span className="font-semibold text-primary">
                      travail irréprochable
                    </span>{" "}
                    et conforme aux normes de sécurité, tous nos opérateurs ont
                    obtenu leur{" "}
                    <span className="font-semibold text-primary">
                      CATS (Certificat d&apos;Aptitude Théorique de Télépilote)
                    </span>{" "}
                    ainsi qu&apos;une{" "}
                    <span className="font-semibold text-primary">
                      spécialisation en nettoyage extérieur
                    </span>{" "}
                    délivrée par notre partenaire Flight Academy Certification.
                  </p>

                  {/* Liste des avantages */}
                  <div className="space-y-4 mt-8">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-primary shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          Certificat CATS
                        </h4>
                        <p className="text-gray-600">
                          Certificat d&apos;Aptitude Théorique de Télépilote
                          validé pour exercer en toute légalité
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-primary shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          Spécialisation Nettoyage Extérieur
                        </h4>
                        <p className="text-gray-600">
                          Formation spécialisée délivrée par Flight Academy
                          Certification, notre partenaire de confiance
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-primary shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          Conformité et Sécurité
                        </h4>
                        <p className="text-gray-600">
                          Respect strict des normes de sécurité et garantie
                          d&apos;un travail irréprochable
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-primary/5 rounded-xl border border-primary/20">
                    <p className="text-gray-700 italic">
                      &quot;La certification garantit notre professionnalisme.
                      Chaque intervention est réalisée par des opérateurs
                      qualifiés et conformes aux exigences réglementaires.&quot;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
