import Link from "next/link";
import TryoutForm from "@/components/tryout-form";
import ThemeToggle from "@/components/theme-toggle";

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/cover.jpg')" }}
      />
      <div className="fixed inset-0 bg-white/85 dark:bg-neutral-950/80 transition-colors duration-300" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(234,88,12,0.12),_transparent_60%)]" />

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
