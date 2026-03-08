"use client";
import {
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Clock,
  Phone,
} from "lucide-react";

import Logo from "./Logo";

import Link from "next/link";
import { serviceLinks } from "../services/services";
import {
  APP_NAME,
  emailContact,
  openHours,
  phoneContact,
  siegeAdress,
} from "../constant";

export default function Footer() {
  const createdYear = 2025;

  const links = [
    { name: "Accueil", href: "/#accueil" },
    { name: "À propos", href: "/#a-propos" },
    { name: "Avantages", href: "/#avantages" },
    { name: "Nos prestations", href: "/#services" },
    { name: "Offres spéciales", href: "/#offres" },
    { name: "Zone d'intervention", href: "/#intervention-zone" },
    { name: "Nos fondateurs", href: "/#fondateurs" },
    { name: "Certification", href: "/#certification" },
    { name: "Contact", href: "/#contact" },
    { name: "FAQ", href: "/faq" },
  ];

  return (
    <footer className="bg-primary-800 text-gray-300 flex flex-col items-center">
      {/* Section principale */}
      <div className="py-16  max-w-5xl w-full 2xl:max-w-7xl md:max-w-5xl md:w-full px-4 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Colonne 1: Logo et description */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="">
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
              {links.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
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
                <div className="text-sm">
                  <p>{siegeAdress}</p>
                  <p>France</p>
                  <p className="text-gray-400 italic mt-1 whitespace-nowrap">
                    Uniquement sur rendez-vous
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-white mb-1">Horaires</p>
                  <p>Lundi - Samedi : {openHours}</p>
                  <p>Dimanche : Fermé</p>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-secondary shrink-0" />
                <Link
                  href={`tel:${phoneContact}`}
                  className="text-sm hover:text-white transition-colors duration-200"
                >
                  {phoneContact}
                </Link>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-secondary shrink-0" />
                <Link
                  href={`mailto:${emailContact}`}
                  className="text-sm hover:text-white transition-colors duration-200"
                >
                  {emailContact}
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
                href="https://www.instagram.com/dronedesalpes?igsh=OWV4NXhlZXY2MTE2"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.linkedin.com/company/drones-des-alpes/"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 w-full"></div>
      {/* Barre du bas */}

      <div className="py-6  max-w-5xl w-full 2xl:max-w-7xl md:max-w-5xl md:w-full px-4 ">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-gray-400">
            © {createdYear} {APP_NAME}. Tous droits réservés.
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
    </footer>
  );
}
