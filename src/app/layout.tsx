import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Last Game Reborn — Tryouts",
  description: "Last Game Reborn clan tryout applications and evaluation board",
};

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var theme = stored === "light" || stored === "dark" ? stored : "dark";
    document.documentElement.classList.toggle("dark", theme === "dark");
  } catch (e) {
    document.documentElement.classList.add("dark");
  }
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 min-h-screen antialiased transition-colors">
        {children}
      </body>
    </html>
  );
}
