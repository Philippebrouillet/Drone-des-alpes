import Link from "next/link";
import { ArrowRightIcon, Phone } from "lucide-react";
import { phoneContact, phoneContactRaw } from "@/lib/constant";

interface CtaBandProps {
  title?: string;
  text?: string;
}

/** Bandeau de fin de page : devis en action principale, téléphone en secondaire. */
export default function CtaBand({
  title = "Demander un devis",
  text = "Décrivez votre bâtiment, nous répondons sous 48 heures dans la mesure du possible",
}: CtaBandProps) {
  return (
    <section className="py-20 md:py-24 bg-primary flex justify-center">
      <div className="customContainer flex flex-col md:flex-row md:items-end md:justify-between gap-10">
        <div>
          <h2 className="text-3xl md:text-[40px] font-medium text-white leading-[1.15] tracking-[-0.02em] text-balance">
            {title}
          </h2>
          <p className="mt-4 text-lg text-white/75 max-w-xl leading-relaxed">
            {text}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <Link
            href="/#contact"
            className="inline-flex h-12 items-center justify-center gap-2 px-6 rounded-[10px] bg-white text-primary font-medium hover:bg-primary-50 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Demander un devis
            <ArrowRightIcon size={16} strokeWidth={1.75} />
          </Link>
          <a
            href={`tel:${phoneContactRaw}`}
            className="inline-flex h-12 items-center justify-center gap-2 px-6 rounded-[10px] border border-white/25 text-white font-medium hover:bg-white/10 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <Phone size={16} strokeWidth={1.75} />
            <span className="tabular-nums">{phoneContact}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
