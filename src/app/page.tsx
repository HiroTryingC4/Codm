import Link from "next/link";
import TryoutForm from "@/components/tryout-form";
import ThemeToggle from "@/components/theme-toggle";
import { getSession } from "@/lib/auth";

export default async function HomePage() {
  const session = await getSession();

  return (
    <main className="relative min-h-screen">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/cover.jpg')" }}
      />
      <div className="fixed inset-0 bg-white/85 dark:bg-neutral-950/80 transition-colors duration-300" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(234,88,12,0.12),_transparent_60%)]" />

      {session && (
        <div className="fixed top-4 left-4 z-10">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-sm rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/60 text-neutral-600 dark:text-neutral-400 px-3 py-1.5 transition-all duration-150 hover:text-neutral-900 dark:hover:text-neutral-100 hover:border-neutral-300 dark:hover:border-neutral-700 hover:-translate-x-0.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
        </div>
      )}

      <div className="fixed top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <div className="relative max-w-md mx-auto px-4 py-10 sm:py-16">
        <TryoutForm />

        <div className="mt-6 text-center">
          <Link
            href="/admin"
            className="text-xs text-neutral-500 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-all duration-150 hover:-translate-y-0.5 inline-block"
          >
            Admin
          </Link>
        </div>
      </div>
    </main>
  );
}
