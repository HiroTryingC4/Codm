import Link from "next/link";
import ThemeToggle from "@/components/theme-toggle";
import { getSession } from "@/lib/auth";

export default async function HomePage() {
  const session = await getSession();

  return (
    <main className="relative min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white transition-colors">
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          <span className="text-xl font-extrabold tracking-tight">LG</span>
          <div className="flex items-center gap-3">
            {session && (
              <Link
                href="/admin"
                className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                Admin
              </Link>
            )}
            <ThemeToggle />
            <Link
              href="/apply"
              className="rounded-lg bg-gold-600 text-white px-4 py-2 text-xs font-semibold tracking-wide uppercase transition-all duration-150 hover:bg-gold-500 hover:scale-[1.02] active:scale-[0.98]"
            >
              Join Tryouts
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative flex flex-col items-center justify-center min-h-screen px-4 pt-16 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,160,23,0.12),_transparent_60%)]" />
        <div className="relative animate-fade-in-up">
          <h1 className="text-[96px] sm:text-[140px] font-extrabold leading-none tracking-tighter select-none">
            LG
          </h1>
          <p className="mt-2 text-xs sm:text-sm font-semibold tracking-[0.4em] uppercase text-gold-700 dark:text-gold-500">
            Call of Duty Mobile — Home of MP Mains
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/apply"
              className="w-full sm:w-auto rounded-lg bg-gold-600 text-white px-10 py-3.5 text-sm font-semibold uppercase tracking-wide transition-all duration-150 hover:bg-gold-500 hover:scale-[1.02] active:scale-[0.98]"
            >
              Join Tryouts
            </Link>
            <a
              href="#about"
              className="w-full sm:w-auto rounded-lg border border-neutral-300 dark:border-neutral-700 px-10 py-3.5 text-sm font-semibold uppercase tracking-wide transition-all duration-150 hover:border-gold-500 hover:text-gold-700 dark:hover:text-gold-400"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="py-24 sm:py-32 border-t border-neutral-200 dark:border-neutral-800 px-4"
      >
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <p className="text-xs font-semibold tracking-widest uppercase text-gold-700 dark:text-gold-500">
            Our Mission
          </p>
          <h2 className="text-2xl sm:text-4xl font-bold">
            Discipline, teamwork, and respect — on and off the battlefield.
          </h2>
          <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Last Game Reborn is a Call of Duty Mobile multiplayer clan built around structured
            tryouts, real teamwork, and a community that shows up for each other. We&apos;re
            looking for players who bring skill, consistency, and good sportsmanship to every
            match.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-28 border-t border-neutral-200 dark:border-neutral-800 px-4 bg-neutral-50 dark:bg-neutral-900/40">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold">Ready to prove yourself?</h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            Fill out the tryout form and one of our admins will get back to you.
          </p>
          <Link
            href="/apply"
            className="inline-block rounded-lg bg-gold-600 text-white px-10 py-3.5 text-sm font-semibold uppercase tracking-wide transition-all duration-150 hover:bg-gold-500 hover:scale-[1.02] active:scale-[0.98]"
          >
            Join Tryouts
          </Link>
        </div>
      </section>

      <footer className="border-t border-neutral-200 dark:border-neutral-800 px-4 py-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-lg font-extrabold tracking-tight">LG</span>
          <p className="text-xs text-neutral-500 dark:text-neutral-600 tracking-wide">
            © {new Date().getFullYear()} Last Game Reborn. All rights reserved.
          </p>
          <Link
            href="/admin"
            className="text-xs text-neutral-500 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
          >
            Admin
          </Link>
        </div>
      </footer>
    </main>
  );
}
