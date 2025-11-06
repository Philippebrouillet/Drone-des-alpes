import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";

import Logo from "./Logo";

import Link from "next/link";
import { serviceLinks } from "../services/services";
import { APP_NAME } from "../constant";

export default function Footer() {
  const currentYear = 2025;

  return (
    <footer className="bg-primary-800 text-gray-300">
      {/* Section principale */}
      <div className="md:max-w-5xl md:w-full md:mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Colonne 1: Logo et description */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="bg-red-200 relative ">
                {" "}
                <Logo />
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              Spécialiste du nettoyage par drone en Rhône-Alpes. Technologie
              innovante pour des prestations rapides, sécurisées et écologiques.
            </p>
          </div>

          {/* Colonne 2: Navigation */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm hover:text-white transition-colors duration-200"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/#a-propos"
                  className="text-sm hover:text-white transition-colors duration-200"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  href="/#prestations"
                  className="text-sm hover:text-white transition-colors duration-200"
                >
                  Nos prestations
                </Link>
              </li>
              <li>
                <Link
                  href="/#offres"
                  className="text-sm hover:text-white transition-colors duration-200"
                >
                  Offres spéciales
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm hover:text-white transition-colors duration-200"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="text-sm hover:text-white transition-colors duration-200"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3: Prestations */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Nos prestations
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((prestation, i) => (
                <li key={i}>
                  <Link
                    href={prestation.href}
                    className="text-sm hover:text-white transition-colors duration-200"
                  >
                    {prestation.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4: Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                <span className="text-sm">
                  Rhône-Alpes
                  <br />
                  France
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-secondary shrink-0" />
                <Link
                  href="tel:+33123456789"
                  className="text-sm hover:text-white transition-colors duration-200"
                >
                  +33 1 23 45 67 89
                </Link>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-secondary shrink-0" />
                <Link
                  href="mailto:contact@dronedesalpes.fr"
                  className="text-sm hover:text-white transition-colors duration-200"
                >
                  contact@dronedesalpes.fr
                </Link>
              </li>
            </ul>

            {/* Réseaux sociaux */}
            <div className="flex space-x-4 mt-6">
              <Link
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Barre du bas */}
      <div className="border-t border-gray-800">
        <div className="md:max-w-5xl md:w-full md:mx-auto py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {currentYear} {APP_NAME}. Tous droits réservés.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/mentions-legales"
                className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                Mentions légales
              </Link>
              <Link
                href="/politique-de-confidentialite"
                className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
