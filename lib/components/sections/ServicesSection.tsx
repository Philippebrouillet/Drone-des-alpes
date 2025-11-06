import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";

interface Service {
  title: string;
  icon: React.ElementType;
  shortDescription: string;
  description: string;
  image: string;
  href: string;
}

interface ServicesProps {
  services: Service[];
}

export default function ServicesSection({ services }: ServicesProps) {
  return (
    <>
      <div id="prestations" className="mb-6"></div>
      <section id="prestations" className="section bg-white">
        <div className="flex justify-center">
          <div className="customContainer">
            {/* Titre de la section */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Nos prestations
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Des solutions professionnelles adaptées à tous vos besoins de
                nettoyage
              </p>
            </div>

            {/* Grille des services */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div
                    key={index}
                    className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100"
                  >
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Overlay avec icône */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
                      <div className="absolute bottom-6 left-6 flex items-center gap-3">
                        <div className="p-3  bg-white rounded-full border-2 border-primary flex items-center justify-center">
                          <Icon size={24} className="text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">
                          {service.title}
                        </h3>
                      </div>
                    </div>

                    {/* Contenu */}
                    <div className="p-8">
                      <p className="text-gray-600 mb-4 font-medium">
                        {service.shortDescription}
                      </p>
                      <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                        {service.description}
                      </p>

                      {/* Bouton */}
                      <Link
                        href={service.href}
                        className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300"
                      >
                        En savoir plus
                        <ArrowRightIcon size={16} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
