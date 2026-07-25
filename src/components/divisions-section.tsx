import Link from "next/link";
import ScrollReveal from "./scroll-reveal";
import DivisionIconGlyph from "./division-icon";
import { DIVISIONS } from "@/lib/divisions-data";

function ArrowForwardIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

const kickerClass =
  "text-xs font-semibold tracking-widest text-gold-700 dark:text-gold-500 uppercase";

export default function DivisionsSection() {
  return (
    <section id="divisions" className="py-24 sm:py-32 px-4 max-w-6xl mx-auto">
      <ScrollReveal className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
        <div className="space-y-2">
          <p className={kickerClass}>Divisions</p>
          <h3 className="font-display text-3xl sm:text-5xl tracking-tight">Operational Commands</h3>
        </div>
        <p className="text-xs text-neutral-500 dark:text-neutral-500 font-medium">
          Active rosters: 05 / 06
        </p>
      </ScrollReveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {DIVISIONS.map((division, i) =>
          division.locked ? (
            <ScrollReveal key={division.slug} delayMs={i * 60}>
              <div className="group relative overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 opacity-60 transition-all duration-300 hover:-translate-y-1">
                <div className="absolute inset-0 flex items-center justify-center bg-white/70 dark:bg-neutral-950/70 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <span className="text-xs font-semibold tracking-widest uppercase text-gold-700 dark:text-gold-500">
                    Coming Soon
                  </span>
                </div>
                <div className="aspect-square w-full flex items-center justify-center bg-neutral-100 dark:bg-neutral-900 text-neutral-400 dark:text-neutral-600">
                  <DivisionIconGlyph icon={division.icon} className="w-10 h-10" />
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-neutral-500 dark:text-neutral-500 mb-1">{division.name}</h4>
                  <p className="text-xs text-neutral-400 dark:text-neutral-600">{division.tag}</p>
                </div>
              </div>
            </ScrollReveal>
          ) : (
            <ScrollReveal key={division.slug} delayMs={i * 60}>
              <Link
                href={`/divisions/${division.slug}`}
                className="group block overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500 hover:shadow-lg dark:hover:shadow-black/30"
              >
                <div className="aspect-square w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                  {division.img ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={division.img}
                      alt={division.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gold-600 dark:text-gold-500">
                      <DivisionIconGlyph icon={division.icon} className="w-10 h-10" />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-neutral-900 dark:text-white mb-1">{division.name}</h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-500 mb-10">{division.tag}</p>
                  <div className="flex justify-end items-center">
                    <span className="text-neutral-400 dark:text-neutral-600 group-hover:text-gold-600 dark:group-hover:text-gold-500 group-hover:translate-x-1 transition-all">
                      <ArrowForwardIcon />
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          )
        )}
      </div>
    </section>
  );
}
