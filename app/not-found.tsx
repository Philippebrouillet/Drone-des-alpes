import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0b1220] px-5 pt-24">
      <div className="max-w-lg">
        <p className="font-mono text-sm text-white/50">Erreur 404</p>
        <h1 className="mt-4 text-4xl md:text-5xl font-medium text-white tracking-[-0.03em]">
          Page introuvable
        </h1>
        <p className="mt-4 text-lg text-white/70 leading-relaxed">
          Cette page n&apos;existe pas ou a été déplacée.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center gap-2 px-6 rounded-[10px] bg-white text-primary font-medium hover:bg-primary-50 transition-colors duration-150"
          >
            Retour à l&apos;accueil
            <ArrowRightIcon size={16} strokeWidth={1.75} />
          </Link>
          <Link
            href="/#contact"
            className="inline-flex h-12 items-center justify-center px-6 rounded-[10px] border border-white/25 text-white font-medium hover:bg-white/10 transition-colors duration-150"
          >
            Nous contacter
          </Link>
        </div>
      </div>
    </main>
  );
}
