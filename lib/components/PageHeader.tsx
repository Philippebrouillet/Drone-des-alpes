import Link from "next/link";

interface Crumb {
  name: string;
  href?: string;
}

interface PageHeaderProps {
  crumbs: Crumb[];
  title: string;
  lead?: React.ReactNode;
}

/** En-tête des pages sans photo (FAQ, pages légales) : fond bleu nuit, titre à gauche. */
export default function PageHeader({ crumbs, title, lead }: PageHeaderProps) {
  return (
    <section className="bg-primary text-white pt-40 pb-16 md:pt-48 md:pb-20 flex justify-center">
      <div className="customContainer">
        <nav aria-label="Fil d'Ariane" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-white/70">
            {crumbs.map((crumb, i) => (
              <li key={crumb.name} className="flex items-center gap-2">
                {i > 0 && (
                  <span aria-hidden="true" className="text-white/40">
                    /
                  </span>
                )}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-white transition-colors duration-150"
                  >
                    {crumb.name}
                  </Link>
                ) : (
                  <span className="text-white" aria-current="page">
                    {crumb.name}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="text-4xl md:text-[56px] font-medium leading-[1.08] tracking-[-0.03em] max-w-[16em] text-balance">
          {title}
        </h1>
        {lead && (
          <div className="mt-5 text-lg text-white/75 max-w-2xl leading-relaxed">
            {lead}
          </div>
        )}
      </div>
    </section>
  );
}
