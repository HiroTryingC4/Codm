"use client";

import { useState } from "react";
import ScrollReveal from "./scroll-reveal";
import DivisionModal, { type DivisionInfo } from "./division-modal";

type DivisionIcon = "swords" | "target" | "medal" | "globe" | "diamond" | "lock";

const DIVISIONS: {
  name: string;
  tag: string;
  icon: DivisionIcon;
  img?: string;
  description: string;
  locked?: boolean;
}[] = [
  {
    name: "LG Original",
    tag: "CODM Battle Royale",
    icon: "swords",
    img: "/images/divisions/original.jpg",
    description:
      "Our Battle Royale roster — home of BR mains. Built around aggressive rotations, squad coordination, and end-game positioning.",
  },
  {
    name: "LG Reborn",
    tag: "CODM Multiplayer",
    icon: "target",
    img: "/images/divisions/reborn.jpg",
    description:
      "The original Last Game division — Call of Duty Mobile Multiplayer, home of MP mains focused on ranked play and structured tryouts.",
  },
  {
    name: "LG Warzie",
    tag: "Warzone Mobile",
    icon: "medal",
    img: "/images/divisions/warzie.jpg",
    description:
      "Our Warzone Mobile squad — home of Warzone mains, built for large-scale firefights, looting strategy, and long-range engagements.",
  },
  {
    name: "LG Highrise",
    tag: "Open World",
    icon: "globe",
    img: "/images/divisions/highrise.jpg",
    description:
      "Our open-world crew, playing outside the usual shooter format together as a community with the same LG teamwork and vibe.",
  },
  {
    name: "LG Aether",
    tag: "Mobile Legends",
    icon: "diamond",
    img: "/images/divisions/aether.jpg",
    description:
      "Our Mobile Legends roster, bringing MOBA strategy, lane coordination, and team fighting into the Last Game family.",
  },
  {
    name: "LG Roblox",
    tag: "Development Phase",
    icon: "lock",
    description: "This division is still being set up. Check back soon.",
    locked: true,
  },
];

function DivisionIconGlyph({ icon, className = "w-7 h-7" }: { icon: DivisionIcon; className?: string }) {
  const common = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
  };
  switch (icon) {
    case "swords":
      return (
        <svg {...common}>
          <line x1="5" y1="19" x2="19" y2="5" />
          <line x1="19" y1="19" x2="5" y2="5" />
          <path d="M15 5h4v4M9 19H5v-4" />
        </svg>
      );
    case "target":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1" fill="currentColor" />
        </svg>
      );
    case "medal":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="5" />
          <path d="M9 12.5 7 21l5-3 5 3-2-8.5" />
        </svg>
      );
    case "globe":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-6-3.5-9s1-6.5 3.5-9Z" />
        </svg>
      );
    case "diamond":
      return (
        <svg {...common}>
          <path d="M6 3h12l4 6-10 12L2 9Z" />
          <path d="M2 9h20M9 3l-2 6 5 12 5-12-2-6" />
        </svg>
      );
    case "lock":
      return (
        <svg {...common}>
          <rect x="4" y="11" width="16" height="9" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
      );
  }
}

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
  const [selected, setSelected] = useState<DivisionInfo | null>(null);

  return (
    <section id="divisions" className="py-24 sm:py-32 px-4 max-w-6xl mx-auto">
      <ScrollReveal className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
        <div className="space-y-2">
          <p className={kickerClass}>Divisions</p>
          <h3 className="text-2xl sm:text-4xl font-bold">Operational Commands</h3>
        </div>
        <p className="text-xs text-neutral-500 dark:text-neutral-500 font-medium">
          Active rosters: 05 / 06
        </p>
      </ScrollReveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {DIVISIONS.map((division, i) =>
          division.locked ? (
            <ScrollReveal key={division.name} delayMs={i * 60}>
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
            <ScrollReveal key={division.name} delayMs={i * 60}>
              <button
                type="button"
                onClick={() => setSelected(division)}
                className="group w-full text-left overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500 hover:shadow-lg dark:hover:shadow-black/30"
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
              </button>
            </ScrollReveal>
          )
        )}
      </div>

      <DivisionModal division={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
