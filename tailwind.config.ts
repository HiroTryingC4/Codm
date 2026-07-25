import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#fdf9ec",
          100: "#faf0cd",
          200: "#f5df9b",
          300: "#eecb64",
          400: "#e5b23a",
          500: "#d4a017",
          600: "#b3830f",
          700: "#8f660e",
          800: "#755314",
          900: "#624616",
          950: "#392509",
        },
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-in-left": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out both",
        "fade-in-up": "fade-in-up 0.45s ease-out both",
        "slide-in-right": "slide-in-right 0.3s ease-out both",
        "slide-in-left": "slide-in-left 0.3s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
