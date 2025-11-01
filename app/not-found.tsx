import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="max-w-lg text-center">
        {/* 404 épuré */}
        <h1 className="text-[150px] md:text-[200px] font-bold text-white leading-none mb-4">
          404
        </h1>

        {/* Message simple */}
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
          Page introuvable
        </h2>

        <p className="text-gray-400 mb-12 text-lg">
          La page que vous recherchez n&apos;existe pas.
        </p>

        {/* Bouton simple */}
        <Link
          href="/"
          className="inline-block px-8 py-4 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
