export type DivisionIcon = "swords" | "target" | "medal" | "globe" | "diamond" | "lock";

export type Division = {
  slug: string;
  name: string;
  tag: string;
  icon: DivisionIcon;
  img?: string;
  description: string;
  locked?: boolean;
};

export const DIVISIONS: Division[] = [
  {
    slug: "original",
    name: "LG Original",
    tag: "CODM Battle Royale",
    icon: "swords",
    img: "/images/divisions/original.jpg",
    description:
      "Our Battle Royale roster — home of BR mains. Built around aggressive rotations, squad coordination, and end-game positioning.",
  },
  {
    slug: "reborn",
    name: "LG Reborn",
    tag: "CODM Multiplayer",
    icon: "target",
    img: "/images/divisions/reborn.jpg",
    description:
      "The original Last Game division — Call of Duty Mobile Multiplayer, home of MP mains focused on ranked play and structured tryouts.",
  },
  {
    slug: "warzie",
    name: "LG Warzie",
    tag: "Warzone Mobile",
    icon: "medal",
    img: "/images/divisions/warzie.jpg",
    description:
      "Our Warzone Mobile squad — home of Warzone mains, built for large-scale firefights, looting strategy, and long-range engagements.",
  },
  {
    slug: "highrise",
    name: "LG Highrise",
    tag: "Open World",
    icon: "globe",
    img: "/images/divisions/highrise.jpg",
    description:
      "Our open-world crew, playing outside the usual shooter format together as a community with the same LG teamwork and vibe.",
  },
  {
    slug: "aether",
    name: "LG Aether",
    tag: "Mobile Legends",
    icon: "diamond",
    img: "/images/divisions/aether.jpg",
    description:
      "Our Mobile Legends roster, bringing MOBA strategy, lane coordination, and team fighting into the Last Game family.",
  },
  {
    slug: "roblox",
    name: "LG Roblox",
    tag: "Development Phase",
    icon: "lock",
    description: "This division is still being set up. Check back soon.",
    locked: true,
  },
];
