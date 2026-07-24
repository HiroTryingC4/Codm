import Link from "next/link";
import { notFound } from "next/navigation";
import ThemeToggle from "@/components/theme-toggle";
import { DIVISIONS } from "@/lib/divisions-data";

export function generateStaticParams() {
  return DIVISIONS.filter((d) => !d.locked).map((d) => ({ slug: d.slug }));
}

export default function DivisionPage({ params }: { params: { slug: string } }) {
  const division = DIVISIONS.find((d) => d.slug === params.slug && !d.locked);
  if (!division) notFound();

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white transition-colors">
      <nav className="border-b border-neutral-200 dark:border-neutral-800 font-serif">
        <div className="max-w-2xl mx-auto px-4 sm:px-8 h-14 flex items-center justify-between">
          <Link
            href="/#divisions"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-600 dark:text-neutral-400 hover:text-gold-700 dark:hover:text-gold-500 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3.5 h-3.5 transition-transform duration-150 group-hover:-translate-x-1"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="border-b border-transparent group-hover:border-current pb-0.5">
              Back to Divisions
            </span>
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 sm:px-8 py-10 sm:py-16 font-serif">
        {/* Masthead */}
        <div className="text-center border-b-4 border-double border-neutral-900 dark:border-neutral-100 pb-4 mb-8">
          <p className="text-[11px] tracking-[0.3em] uppercase text-gold-700 dark:text-gold-500 mb-3">
            The Last Game Gazette — Division Report
          </p>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-none">
            {division.name}
          </h1>
          <div className="flex items-center justify-center gap-3 mt-4 text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-500">
            <span className="h-px w-8 bg-neutral-400 dark:bg-neutral-700" />
            <span>{division.tag}</span>
            <span className="h-px w-8 bg-neutral-400 dark:bg-neutral-700" />
          </div>
        </div>

        {/* Lead photo */}
        {division.img && (
          <figure className="mb-8">
            <div className="border border-neutral-300 dark:border-neutral-700 p-2 bg-white dark:bg-neutral-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={division.img} alt={division.name} className="w-full h-auto" />
            </div>
            <figcaption className="text-[11px] italic text-neutral-500 dark:text-neutral-500 mt-2 text-center">
              Official cover art — LG {division.tag} division.
            </figcaption>
          </figure>
        )}

        {/* Body copy */}
        <p className="text-[17px] leading-relaxed text-justify text-neutral-800 dark:text-neutral-300 first-letter:float-left first-letter:text-6xl first-letter:font-bold first-letter:pr-2 first-letter:leading-[0.8]">
          {division.description}
        </p>

        <div className="clear-both mt-12 text-center border-t border-neutral-300 dark:border-neutral-700 pt-8">
          <Link
            href="/apply"
            className="inline-block border-2 border-neutral-900 dark:border-neutral-100 px-8 py-3 text-sm font-semibold uppercase tracking-widest transition-colors duration-150 hover:bg-neutral-900 hover:text-white dark:hover:bg-neutral-100 dark:hover:text-neutral-900"
          >
            Join Tryouts
          </Link>
        </div>
      </div>
    </main>
  );
}
