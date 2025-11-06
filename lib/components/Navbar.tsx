"use client";

import { NextPage } from "next";
import { APP_NAME } from "../constant";
import { ChevronDown, Phone, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { serviceLinks } from "../services/services";

type Props = any;

const Navbar: NextPage<Props> = ({}) => {
  const prestations = serviceLinks;
  const pathname = usePathname();
  const [isOpenPrestations, setIsOpenPrestations] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobilePrestationsOpen, setIsMobilePrestationsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fermer le menu mobile lors du changement de route
  useEffect(() => {
    // Utiliser setTimeout pour éviter le setState synchrone
    const timer = setTimeout(() => {
      setIsMobileMenuOpen(false);
      setIsMobilePrestationsOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Bloquer le scroll quand le menu mobile est ouvert
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Header principal */}
      <header
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white shadow-lg text-title"
            : "bg-transparent text-white"
        }`}
      >
        <div className="flex justify-center items-center">
          <div className="flex justify-between items-center w-full customContainer ">
            {/* Logo */}
            <Logo />

            {/* Menu Desktop */}
            <nav className="hidden lg:block">
              <ul className="flex gap-2 items-center justify-center uppercase font-semibold text-sm">
                <li
                  className={`px-5 py-2 transition-all duration-150 hover:opacity-80 ${
                    pathname === "/"
                      ? `border-b-2  ${isScrolled ? "activeLink" : ""}`
                      : "border-b-0 border-transparent"
                  }`}
                >
                  <Link href="/">{APP_NAME}</Link>
                </li>

                {/* Dropdown Prestations */}
                <li className="relative">
                  <button
                    className={`flex gap-2 items-center px-5 py-2 uppercase font-semibold text-sm transition-all duration-150 hover:opacity-80 ${
                      pathname.includes("nettoyage")
                        ? `border-b-2  ${isScrolled ? "activeLink" : ""}`
                        : "border-b-0 border-transparent"
                    }`}
                    onMouseEnter={() => setIsOpenPrestations(true)}
                    onMouseLeave={() => setIsOpenPrestations(false)}
                  >
                    Prestations <ChevronDown size={14} />
                  </button>

                  {isOpenPrestations && (
                    <ul
                      className="absolute left-0 bg-white shadow-lg border border-gray-200   overflow-hidden min-w-[280px] text-sm normal-case font-normal text-title"
                      onMouseEnter={() => setIsOpenPrestations(true)}
                      onMouseLeave={() => setIsOpenPrestations(false)}
                    >
                      {prestations.map((prestation, i) => (
                        <li key={i}>
                          <Link
                            href={prestation.href}
                            className={`block px-5 py-3.5 hover:bg-primary/4  font-medium hover:text-primary transition-colors whitespace-nowrap ${
                              pathname.includes(prestation.href)
                                ? "bg-primary/4 text-primary font-semibold"
                                : ""
                            }`}
                          >
                            {prestation.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>

                <li
                  className={`px-5 py-2 transition-all duration-150 hover:opacity-80 ${
                    pathname === "/offres"
                      ? `border-b-2  ${isScrolled ? "activeLink" : ""}`
                      : "border-b-0 border-transparent"
                  }`}
                >
                  <Link href="/#offres">Nos offres</Link>
                </li>

                <li
                  className={`px-5 py-2 transition-all duration-150 hover:opacity-80 ${
                    pathname === "/contact"
                      ? `border-b-2  ${isScrolled ? "activeLink" : ""}`
                      : "border-b-0 border-transparent"
                  }`}
                >
                  <Link className="flex items-center gap-2" href="/#contact">
                    <Phone size={14} /> Contact
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Bouton hamburger Mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isScrolled
                  ? "hover:bg-gray-100 text-gray-900"
                  : "hover:bg-white/10 text-white"
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Menu Mobile - Overlay complet */}
      <div
        className={`fixed inset-0 z-200 lg:hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Fond sombre */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu coulissant */}
        <nav
          className={`absolute top-0 right-0 h-full w-full sm:w-80 bg-white shadow-2xl transform transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full overflow-y-auto">
            {/* Header du menu mobile */}
            <div className="flex justify-between items-center p-6 py-0 border-b border-gray-200">
              <Logo></Logo>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Fermer le menu"
              >
                <X size={24} className="text-gray-900" />
              </button>
            </div>

            {/* Navigation mobile */}
            <ul className="flex flex-col p-4 space-y-2">
              <li>
                <Link
                  href="/"
                  className={`block px-5 py-3 rounded-lg font-semibold transition-colors ${
                    pathname === "/"
                      ? "bg-primary/5 text-primary"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {APP_NAME}
                </Link>
              </li>

              {/* Accordéon Prestations */}
              <li>
                <button
                  onClick={() =>
                    setIsMobilePrestationsOpen(!isMobilePrestationsOpen)
                  }
                  className={`w-full flex justify-between items-center px-5 py-3 rounded-lg font-semibold transition-colors ${
                    pathname.includes("nettoyage")
                      ? "bg-primary/5 text-primary"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span>Prestations</span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-200 ${
                      isMobilePrestationsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Sous-menu Prestations */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isMobilePrestationsOpen
                      ? "max-h-96 opacity-100 mt-2"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <ul className="space-y-1 pl-4">
                    {prestations.map((prestation, i) => (
                      <li key={i}>
                        <Link
                          href={prestation.href}
                          className={`block px-5 py-2.5 rounded-lg text-sm transition-colors ${
                            pathname.includes(prestation.href)
                              ? "bg-primary/5 text-primary font-medium"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {prestation.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              <li>
                <Link
                  onClick={() => setIsMobileMenuOpen(false)}
                  href="/#offres"
                  className={`flex items-center gap-2 px-5 py-3 rounded-lg font-semibold transition-colors ${
                    pathname === "/offres"
                      ? "bg-primary/5 text-primary"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span>Offres</span>
                </Link>
              </li>

              <li>
                <Link
                  onClick={() => setIsMobileMenuOpen(false)}
                  href="/#contact"
                  className={`flex items-center gap-2 px-5 py-3 rounded-lg font-semibold transition-colors ${
                    pathname === "/contact"
                      ? "bg-primary/5 text-primary"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Phone size={18} />
                  <span>Contact</span>
                </Link>
              </li>
            </ul>

            {/* CTA en bas du menu mobile */}
            <div className="mt-auto p-6 border-t border-gray-200 bg-gray-50">
              <Link
                href="/#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/80 transition-colors shadow-lg"
              >
                Demander un devis gratuit
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
