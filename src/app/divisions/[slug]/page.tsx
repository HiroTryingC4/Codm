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
      <nav className="border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          <Link
            href="/#divisions"
            className="inline-flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Divisions
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 sm:py-16">
        {division.img && (
          <div className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 mb-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={division.img}
              alt={division.name}
              className="w-full aspect-video object-cover"
            />
          </div>
        )}

        <p className="text-xs font-semibold tracking-widest text-gold-700 dark:text-gold-500 uppercase mb-2">
          {division.tag}
        </p>
        <h1 className="text-3xl sm:text-5xl font-bold mb-6">{division.name}</h1>
        <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl mb-10">
          {division.description}
        </p>

        <Link
          href="/apply"
          className="inline-block rounded-lg bg-gold-600 text-white px-8 py-3 text-sm font-semibold transition-all duration-150 hover:bg-gold-500 hover:scale-[1.02] active:scale-[0.98]"
        >
          Join Tryouts
        </Link>
      </div>
    </main>
  );
}
