import type { DivisionIcon } from "@/lib/divisions-data";

export default function DivisionIconGlyph({
  icon,
  className = "w-7 h-7",
}: {
  icon: DivisionIcon;
  className?: string;
}) {
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
