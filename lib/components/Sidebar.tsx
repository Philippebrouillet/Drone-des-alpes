"use client";

import { NextPage } from "next";
import Image from "next/image";
import { APP_NAME, Services } from "../constant";
import { ChevronDown, Phone } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

type Props = any;

const Sidebar: NextPage<Props> = ({}) => {
  const prestations = Object.values(Services).map((service) => ({
    name: service,
    href: `/${service.replace(/\s+/g, "-").toLowerCase()}`,
  }));
  const pathname = usePathname();
  const [isOpenPrestations, setIsOpenPrestations] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`flex justify-center items-center fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-lg text-gray-900"
          : "bg-transparent text-white"
      }`}
    >
      <div className="flex justify-between w-full customContainer ">
        <Link href="/">
          <Image src={"/logoCrop.png"} height={110} width={110} alt="Logo" />
        </Link>

        <ul className="flex gap-2 items-center justify-center px-4 uppercase font-semibold text-sm mr-40">
          <li
            className={`px-5 py-2 transition-all duration-150 
  ${
    pathname === "/"
      ? "border-b-2 border-current"
      : "border-b-0 border-transparent"
  }`}
          >
            <Link href="/">{APP_NAME}</Link>
          </li>
          <li className="relative">
            <button
              className={`flex gap-2 items-center px-5 py-2 uppercase font-semibold text-sm  transition-all duration-150  ${
                pathname.includes("nettoyage")
                  ? "border-b-2 border-current"
                  : "border-b-0 border-transparent"
              }`}
              onMouseEnter={() => setIsOpenPrestations(true)}
              onMouseLeave={() => setIsOpenPrestations(false)}
            >
              Préstations <ChevronDown size={14} />
            </button>

            {isOpenPrestations && (
              <ul
                className="absolute left-0 bg-white border border-gray-200 text-sm normal-case text-black transition-all duration-150"
                onMouseEnter={() => setIsOpenPrestations(true)}
                onMouseLeave={() => setIsOpenPrestations(false)}
              >
                {prestations.map((prestation, i) => (
                  <li key={i}>
                    <Link
                      href={prestation.href}
                      className="block px-5 py-3 hover:bg-gray-100 transition-colors  whitespace-nowrap"
                    >
                      {prestation.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li
            className={`px-5 py-2  transition-all duration-150   ${
              pathname === "/contact"
                ? "border-b-2 border-current"
                : "border-b-0 border-transparent"
            }`}
          >
            <Link className="flex items-center gap-2" href="/contact">
              <Phone size={14} className="" /> Contact
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
