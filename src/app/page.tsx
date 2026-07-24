import Link from "next/link";

const NAV_LINKS = [
  { href: "#divisions", label: "DIVISIONS" },
  { href: "#timeline", label: "TIMELINE" },
  { href: "#events", label: "EVENTS" },
  { href: "#staff", label: "STAFF" },
  { href: "#reborn", label: "REBORN" },
];

type DivisionIcon = "swords" | "target" | "medal" | "globe" | "diamond" | "lock";

const DIVISIONS: {
  name: string;
  tag: string;
  stat: string;
  badge: string | null;
  icon: DivisionIcon;
  locked?: boolean;
}[] = [
  { name: "LG ORIGINAL", tag: "CODM BATTLE ROYALE", stat: "RANK #1 GLOBAL", badge: "ELITE", icon: "swords" },
  { name: "LG REBORN", tag: "CODM MULTIPLAYER", stat: "RANK #4 GLOBAL", badge: "ELITE", icon: "target" },
  { name: "LG WARZIE", tag: "WARZONE MOBILE", stat: "RANK #7 GLOBAL", badge: "PRO", icon: "medal" },
  { name: "LG HIGHRISE", tag: "OPEN WORLD", stat: "TIER 1 EXPLORATION", badge: "OPEN", icon: "globe" },
  { name: "LG AETHER", tag: "MOBILE LEGENDS", stat: "RANK #2 REGIONAL", badge: "ELITE", icon: "diamond" },
  { name: "LG ROBLOX", tag: "DEVELOPMENT PHASE", stat: "", badge: null, icon: "lock", locked: true },
];

const TIMELINE = [
  {
    year: "2021",
    title: "ORG FOUNDED",
    body: "The inception of Last Game. Established as a mobile-first competitive entity with a focus on tactical shooters.",
  },
  {
    year: "2022",
    title: "FIRST CHAMPIONSHIP",
    body: "LG Original secures the Global CODM BR Invitational, marking our first major international trophy.",
  },
  {
    year: "2023",
    title: "DIVISION EXPANSION",
    body: 'Launch of the Aether and Warzie divisions. Structural rebranding to "Last Game Reborn" (LG).',
  },
];

const EVENTS = [
  { date: "OCT 24, 2024", title: "CODM BR MASTER SERIES", meta: "QUALIFIERS • ONLINE" },
  { date: "NOV 02, 2024", title: "WARZONE MOBILE: NIGHT OPS", meta: "TOURNAMENT • LAN EVENT" },
  { date: "DEC 15, 2024", title: "MLBB REBORN OPEN", meta: "OPEN INVITATIONAL • ONLINE" },
];

const STAFF = [
  {
    name: "LG.KRONOS",
    role: "HEAD ADMIN",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGAbXghRF3qPFjszDqdC076-MXiVzt67ATAaZH4mE1axBXq4lza8VzIErfdgZNsytTo_0ieGvrRysIG_Io_czMh-15R-_yZWlNxLf-LdCTUcyP12_YU1mke1KunjrbllzchjhftOX11hfcCmkyNJw0FOazIAZU-sqJgB4a_J4qu5qODwNvBV9LV-Ok73Qnfgi1HD6_aBi6gqfUqn0MOE9wgQD8ebOebUG70WHHwCkU0cc0zdT4lFQil5vTMd32DOkiPvpZX4vvACA",
    alt: "A cinematic black and white portrait of a focused esports executive in a high-end, minimalist suit, standing against a dark, architecturally sharp background with subtle gold lighting accents.",
  },
  {
    name: "LG.VORTEX",
    role: "CODM DIRECTOR",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCY0cxtBDg1nSDLgX_yT2vxXXIMHQVEwSMirYyz_gF8morsiy1aMrGhWap5XJhflUj1WLk2sWqcreFsc3eiqO96TQD6C1Olq3NOmDtgHXQCuluvCP-PImGIECrFIS_hYufFEuhoAhm4X81qENrE7CkOcT4WmsPxhOIMeMH2TaMelNVm7jWkJulSxGMnWc1nNE_1aF_0IvLHuSg8QleA7f6elplJE4YF247w-bizIQvyAhhghh_jROrh5Bdm71SEA45OCYZ9jodNk5g",
    alt: "A portrait of a sharp, modern esports division manager in a dark techwear jacket, posing in a dimly lit, high-contrast gaming facility with glowing amber and gold elements.",
  },
  {
    name: "LG.NOVA",
    role: "OPS MANAGER",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjHWecIp2iA-jr7GCOIanKmfMPV3uCvhyJd249l6o-EtvCgkf7k3klz0PECfZbCw3Lk7c1V6v3DSeoEgub_NPztN5OoJOQL7zjVqr2j6Qn0QR8K65mDMNftRmqKRM5HerH1die-yJuSUk4QePrUrlTnMK2eW87skJi273XdzuTAiFL7_Mp70M_Y2BVdCnDr-7LeQbD1ngJke88cF559NP8j6e7MS4T2AlAL8iBTOmlXtScA8NIRAlPRjajYTALUC65rGR9EMIVDAQ",
    alt: "A professional portrait of an esports operations manager with a calm, authoritative expression, set in a sleek, minimalist command center with dark wood paneling and hidden gold lighting.",
  },
  {
    name: "LG.ECHO",
    role: "TALENT SCOUT",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxoflU2NC-fXTz2HD7Ygj-ZP4QrLigua24xaUnFHdXmO5sC3nx7cP8sUtm0SyqRn30Dr4HwUnNR27VX75jwffomtCVYpiGBC-s1gLezdgmHVkF2_wAnkSYoa7Bixt7XB-LEBhsiX7R-RA_Y8YNrOwPy_IDL066kYsx360JOu7DFXmvznSDUVxEETIPPu92FtTgZ3oomBdreED-MXpcrZJ0aWd1uYl7bwYwlGDZDBP584vJxK_-0KIRNVAKhRkgMMALXHLK0wJONFk",
    alt: "A portrait of a competitive gaming talent scout in a minimalist dark environment, featuring sharp shadows and luminous gold rim lighting.",
  },
];

const SOCIALS = ["INSTAGRAM", "TWITTER", "DISCORD", "YOUTUBE"];

function DivisionIconGlyph({ icon }: { icon: DivisionIcon }) {
  const common = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "w-8 h-8",
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

function ArrowForwardIcon({ className = "w-5 h-5" }: { className?: string }) {
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

export default function HomePage() {
  return (
    <div className="bg-background text-on-surface font-body-md">
      {/* Top Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-outline-variant/10">
        <div className="flex justify-between items-center max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop h-20">
          <div className="font-display-lg text-3xl tracking-tighter text-on-surface">LG</div>
          <div className="hidden md:flex gap-12">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-label-caps text-label-caps text-on-surface-variant hover:text-secondary transition-all duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>
          <Link
            href="/apply"
            className="bg-secondary text-on-secondary px-8 py-3 font-label-caps text-label-caps hover:brightness-110 transition-all duration-200 active:scale-95"
          >
            JOIN ELITE
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="reborn"
        className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-margin-mobile md:px-margin-desktop overflow-hidden bg-primary-container"
      >
        <div className="relative z-10 text-center space-y-8 max-w-4xl">
          <h1 className="font-display-lg text-[96px] md:text-[180px] leading-none tracking-[-0.08em] text-on-surface select-none">
            LG
          </h1>
          <p className="font-label-caps text-label-caps text-secondary tracking-[0.5em] opacity-80 mb-12">
            ELITE PERFORMANCE. REBORN.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center pt-8">
            <a
              href="#divisions"
              className="bg-secondary text-on-secondary px-12 py-5 font-label-caps text-label-caps hover:brightness-110 transition-all duration-300 w-full md:w-auto"
            >
              VIEW TEAMS
            </a>
            <a
              href="#about"
              className="border border-on-surface text-on-surface px-12 py-5 font-label-caps text-label-caps hover:bg-on-surface hover:text-primary-container transition-all duration-300 w-full md:w-auto"
            >
              LEARN MORE
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-40 bg-primary-container border-y border-outline-variant/10">
        <div className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <h2 className="font-label-caps text-label-caps text-secondary mb-12">OUR MISSION</h2>
          <p className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-8">
            Defined by precision. Driven by excellence. Last Game Reborn is the pinnacle of
            competitive esports performance.
          </p>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            We believe in structural clarity and refined execution. Our organization serves as the
            architectural foundation for the world&apos;s most disciplined players, fostering an
            environment where elite potential meets professional stability.
          </p>
        </div>
      </section>

      {/* Divisions Showcase */}
      <section className="py-40 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto" id="divisions">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="space-y-4">
            <h2 className="font-label-caps text-label-caps text-secondary">DIVISIONS</h2>
            <h3 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">
              OPERATIONAL COMMANDS
            </h3>
          </div>
          <p className="font-label-caps text-label-caps text-on-surface-variant pb-2">
            ACTIVE ROSTERS: 05 / 06
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {DIVISIONS.map((division, i) =>
            division.locked ? (
              <div
                key={division.name}
                style={{ animationDelay: `${i * 60}ms` }}
                className="animate-fade-in-up bg-surface/30 border border-outline-variant/10 p-10 opacity-50 relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-[#0B0B0D]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <span className="font-label-caps text-label-caps text-secondary">COMING SOON</span>
                </div>
                <div className="flex justify-between items-start mb-12">
                  <span className="text-on-surface-variant">
                    <DivisionIconGlyph icon={division.icon} />
                  </span>
                </div>
                <h4 className="font-headline-md text-headline-md text-on-surface-variant mb-2">
                  {division.name}
                </h4>
                <p className="font-label-caps text-label-caps text-on-surface-variant/50 mb-12">
                  {division.tag}
                </p>
                <div className="h-0.5 bg-outline-variant/20 w-full" />
              </div>
            ) : (
              <div
                key={division.name}
                style={{ animationDelay: `${i * 60}ms` }}
                className="animate-fade-in-up group bg-surface border border-outline-variant/20 p-10 transition-all duration-500 hover:border-secondary"
              >
                <div className="flex justify-between items-start mb-12">
                  <span className="text-secondary">
                    <DivisionIconGlyph icon={division.icon} />
                  </span>
                  <span className="font-label-caps text-[10px] border border-secondary text-secondary px-2 py-1">
                    {division.badge}
                  </span>
                </div>
                <h4 className="font-headline-md text-headline-md text-on-surface mb-2">{division.name}</h4>
                <p className="font-label-caps text-label-caps text-on-surface-variant mb-12">
                  {division.tag}
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-data-point text-data-point text-on-surface-variant">
                    {division.stat}
                  </span>
                  <span className="text-on-surface-variant group-hover:translate-x-2 transition-transform">
                    <ArrowForwardIcon />
                  </span>
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* Milestones / Timeline */}
      <section className="py-40 bg-surface-container-lowest overflow-hidden" id="timeline">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <h2 className="font-label-caps text-label-caps text-secondary mb-24">CHRONICLE</h2>
          <div className="space-y-32">
            {TIMELINE.map((item, i) => (
              <div
                key={item.year}
                style={{ animationDelay: `${i * 80}ms` }}
                className="animate-fade-in-up flex flex-col md:flex-row gap-12 items-start"
              >
                <div className="font-label-caps text-display-lg text-outline-variant/30 leading-none md:w-1/4">
                  {item.year}
                </div>
                <div
                  className={`md:w-3/4 border-l border-secondary pl-12 ${
                    i < TIMELINE.length - 1 ? "pb-12" : ""
                  }`}
                >
                  <h4 className="font-headline-md text-headline-md text-on-surface mb-4">{item.title}</h4>
                  <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-40 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto" id="events">
        <div className="mb-24">
          <h2 className="font-label-caps text-label-caps text-secondary mb-4">UPCOMING</h2>
          <h3 className="font-display-lg text-display-lg text-on-surface">DEPLOYMENT SCHEDULE</h3>
        </div>
        <div className="space-y-0">
          {EVENTS.map((event, i) => (
            <div
              key={event.title}
              style={{ animationDelay: `${i * 60}ms` }}
              className="animate-fade-in-up group flex flex-col md:flex-row items-center justify-between py-12 border-b border-outline-variant/20 hover:bg-surface-container-high transition-colors px-6"
            >
              <div className="flex flex-col md:flex-row gap-12 items-center text-center md:text-left">
                <div className="font-label-caps text-label-caps text-secondary">{event.date}</div>
                <div>
                  <h4 className="font-headline-md text-headline-md text-on-surface">{event.title}</h4>
                  <p className="font-label-caps text-[10px] text-on-surface-variant">{event.meta}</p>
                </div>
              </div>
              <div className="mt-8 md:mt-0">
                <button
                  type="button"
                  className="border border-on-surface text-on-surface px-8 py-3 font-label-caps text-label-caps hover:bg-secondary hover:border-secondary hover:text-on-secondary transition-all"
                >
                  VIEW DETAILS
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Staff Section */}
      <section
        className="py-40 bg-primary-container border-t border-outline-variant/10 px-margin-mobile md:px-margin-desktop"
        id="staff"
      >
        <div className="max-w-container-max mx-auto">
          <h2 className="font-label-caps text-label-caps text-secondary mb-24 text-center">LEADERSHIP</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {STAFF.map((member, i) => (
              <div
                key={member.name}
                style={{ animationDelay: `${i * 60}ms` }}
                className="animate-fade-in-up group text-center"
              >
                <div className="relative w-48 h-64 mx-auto mb-8 bg-surface-container-high border border-outline-variant/20 transition-all duration-500 group-hover:border-secondary overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="w-full h-full object-cover grayscale brightness-75 group-hover:brightness-100 transition-all"
                    alt={member.alt}
                    src={member.img}
                  />
                </div>
                <h5 className="font-headline-md text-headline-md text-on-surface">{member.name}</h5>
                <p className="font-label-caps text-label-caps text-secondary mt-2">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-outline-variant/10">
        <div className="flex flex-col md:flex-row justify-between items-center py-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto gap-12">
          <div className="space-y-6 text-center md:text-left">
            <div className="font-display-lg text-3xl text-on-surface">LG</div>
            <p className="font-label-caps text-[10px] text-on-surface-variant tracking-widest">
              © {new Date().getFullYear()} LAST GAME REBORN. ALL RIGHTS RESERVED.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex gap-8">
              {SOCIALS.map((label) => (
                <a
                  key={label}
                  href="#"
                  className="font-label-caps text-label-caps text-on-surface-variant hover:text-secondary transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
            <Link
              href="/apply"
              className="bg-secondary text-on-secondary px-8 py-3 font-label-caps text-label-caps hover:brightness-110 transition-all duration-200"
            >
              JOIN TRYOUTS
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
