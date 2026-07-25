import Link from "next/link";
import ThemeToggle from "@/components/theme-toggle";
import ScrollReveal from "@/components/scroll-reveal";
import DivisionsSection from "@/components/divisions-section";

const NAV_LINKS = [
  { href: "#divisions", label: "Divisions" },
  { href: "#timeline", label: "Timeline" },
  { href: "#events", label: "Events" },
  { href: "#staff", label: "Staff" },
  { href: "#reborn", label: "Reborn" },
];

const TIMELINE = [
  {
    year: "2021",
    title: "Org Founded",
    body: "The inception of Last Game. Established as a mobile-first competitive entity with a focus on tactical shooters.",
  },
  {
    year: "2022",
    title: "First Championship",
    body: "LG Original secures the Global CODM BR Invitational, marking our first major international trophy.",
  },
  {
    year: "2023",
    title: "Division Expansion",
    body: 'Launch of the Aether and Warzie divisions. Structural rebranding to "Last Game Reborn" (LG).',
  },
];

const EVENTS = [
  { date: "Oct 24, 2024", title: "CODM BR Master Series", meta: "Qualifiers • Online" },
  { date: "Nov 02, 2024", title: "Warzone Mobile: Night Ops", meta: "Tournament • LAN Event" },
  { date: "Dec 15, 2024", title: "MLBB Reborn Open", meta: "Open Invitational • Online" },
];

const STAFF = [
  {
    name: "LG.Kronos",
    role: "Head Admin",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGAbXghRF3qPFjszDqdC076-MXiVzt67ATAaZH4mE1axBXq4lza8VzIErfdgZNsytTo_0ieGvrRysIG_Io_czMh-15R-_yZWlNxLf-LdCTUcyP12_YU1mke1KunjrbllzchjhftOX11hfcCmkyNJw0FOazIAZU-sqJgB4a_J4qu5qODwNvBV9LV-Ok73Qnfgi1HD6_aBi6gqfUqn0MOE9wgQD8ebOebUG70WHHwCkU0cc0zdT4lFQil5vTMd32DOkiPvpZX4vvACA",
    alt: "A cinematic black and white portrait of a focused esports executive in a high-end, minimalist suit, standing against a dark, architecturally sharp background with subtle gold lighting accents.",
  },
  {
    name: "LG.Vortex",
    role: "CODM Director",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCY0cxtBDg1nSDLgX_yT2vxXXIMHQVEwSMirYyz_gF8morsiy1aMrGhWap5XJhflUj1WLk2sWqcreFsc3eiqO96TQD6C1Olq3NOmDtgHXQCuluvCP-PImGIECrFIS_hYufFEuhoAhm4X81qENrE7CkOcT4WmsPxhOIMeMH2TaMelNVm7jWkJulSxGMnWc1nNE_1aF_0IvLHuSg8QleA7f6elplJE4YF247w-bizIQvyAhhghh_jROrh5Bdm71SEA45OCYZ9jodNk5g",
    alt: "A portrait of a sharp, modern esports division manager in a dark techwear jacket, posing in a dimly lit, high-contrast gaming facility with glowing amber and gold elements.",
  },
  {
    name: "LG.Nova",
    role: "Ops Manager",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjHWecIp2iA-jr7GCOIanKmfMPV3uCvhyJd249l6o-EtvCgkf7k3klz0PECfZbCw3Lk7c1V6v3DSeoEgub_NPztN5OoJOQL7zjVqr2j6Qn0QR8K65mDMNftRmqKRM5HerH1die-yJuSUk4QePrUrlTnMK2eW87skJi273XdzuTAiFL7_Mp70M_Y2BVdCnDr-7LeQbD1ngJke88cF559NP8j6e7MS4T2AlAL8iBTOmlXtScA8NIRAlPRjajYTALUC65rGR9EMIVDAQ",
    alt: "A professional portrait of an esports operations manager with a calm, authoritative expression, set in a sleek, minimalist command center with dark wood paneling and hidden gold lighting.",
  },
  {
    name: "LG.Echo",
    role: "Talent Scout",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxoflU2NC-fXTz2HD7Ygj-ZP4QrLigua24xaUnFHdXmO5sC3nx7cP8sUtm0SyqRn30Dr4HwUnNR27VX75jwffomtCVYpiGBC-s1gLezdgmHVkF2_wAnkSYoa7Bixt7XB-LEBhsiX7R-RA_Y8YNrOwPy_IDL066kYsx360JOu7DFXmvznSDUVxEETIPPu92FtTgZ3oomBdreED-MXpcrZJ0aWd1uYl7bwYwlGDZDBP584vJxK_-0KIRNVAKhRkgMMALXHLK0wJONFk",
    alt: "A portrait of a competitive gaming talent scout in a minimalist dark environment, featuring sharp shadows and luminous gold rim lighting.",
  },
];

const SOCIALS = ["Instagram", "Twitter", "Discord", "YouTube"];

const kickerClass =
  "text-xs font-semibold tracking-widest text-gold-700 dark:text-gold-500 uppercase";

const primaryButtonClass =
  "rounded-lg bg-gold-600 text-white px-8 py-3 text-sm font-semibold transition-all duration-150 hover:bg-gold-500 hover:scale-[1.02] active:scale-[0.98]";

const outlineButtonClass =
  "rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 px-8 py-3 text-sm font-semibold transition-all duration-150 hover:border-gold-500 hover:text-gold-700 dark:hover:text-gold-400";

export default function HomePage() {
  return (
    <div className="bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white transition-colors">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 grid grid-cols-[1fr_auto_1fr] items-center">
          <span className="font-display text-2xl tracking-wide">LG</span>
          <div className="hidden md:flex gap-8 justify-self-center">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3 justify-self-end">
            <ThemeToggle />
            <Link href="/apply" className={primaryButtonClass}>
              Join Elite
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section
        id="reborn"
        className="relative flex flex-col items-center justify-center min-h-screen px-4 pt-16 text-center overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/cover.jpg')" }}
        />
        <div className="absolute inset-0 bg-white/90 dark:bg-neutral-950/90 transition-colors duration-300" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,160,23,0.12),_transparent_60%)]" />
        <div className="relative animate-fade-in-up">
          <h1 className="font-display text-[96px] sm:text-[140px] leading-none tracking-tight select-none">
            LG
          </h1>
          <p className="mt-3 text-xs sm:text-sm font-semibold tracking-[0.5em] uppercase text-neutral-500 dark:text-neutral-500">
            Last Game
          </p>
          <p className="mt-2 text-xs sm:text-sm font-semibold tracking-[0.4em] uppercase text-gold-700 dark:text-gold-500">
            Elite Performance. Reborn.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#divisions" className={`${primaryButtonClass} px-10 py-3.5 w-full sm:w-auto`}>
              View Teams
            </a>
            <a href="#about" className={`${outlineButtonClass} px-10 py-3.5 w-full sm:w-auto`}>
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* About / Mission */}
      <section id="about" className="py-24 sm:py-32 border-t border-neutral-200 dark:border-neutral-800 px-4">
        <ScrollReveal className="max-w-3xl mx-auto text-center space-y-6">
          <p className={kickerClass}>Our Mission</p>
          <h2 className="font-display text-3xl sm:text-5xl tracking-tight">
            Defined by precision. Driven by excellence.
          </h2>
          <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Last Game Reborn is the pinnacle of competitive esports performance. We believe in
            structural clarity and refined execution, fostering an environment where elite
            potential meets professional stability.
          </p>
        </ScrollReveal>
      </section>

      <DivisionsSection />

      {/* Timeline */}
      <section id="timeline" className="py-24 sm:py-32 bg-neutral-50 dark:bg-neutral-900/40 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-4xl mx-auto px-4">
          <ScrollReveal>
            <p className={`${kickerClass} mb-12`}>Chronicle</p>
          </ScrollReveal>
          <div className="space-y-16">
            {TIMELINE.map((item, i) => (
              <ScrollReveal
                key={item.year}
                delayMs={i * 80}
                className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-start"
              >
                <div className="font-display text-4xl text-neutral-300 dark:text-neutral-800 leading-none sm:w-24 shrink-0">
                  {item.year}
                </div>
                <div className="border-l-2 border-gold-500 pl-6">
                  <h4 className="font-bold text-lg text-neutral-900 dark:text-white mb-2">{item.title}</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-xl leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section id="events" className="py-24 sm:py-32 px-4 max-w-4xl mx-auto">
        <ScrollReveal className="mb-12">
          <p className={`${kickerClass} mb-2`}>Upcoming</p>
          <h3 className="font-display text-3xl sm:text-5xl tracking-tight">Deployment Schedule</h3>
        </ScrollReveal>
        <div>
          {EVENTS.map((event, i) => (
            <ScrollReveal
              key={event.title}
              delayMs={i * 60}
              className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-b border-neutral-200 dark:border-neutral-800"
            >
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 items-center text-center sm:text-left">
                <div className="text-xs font-semibold text-gold-700 dark:text-gold-500 sm:w-28 shrink-0">
                  {event.date}
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 dark:text-white">{event.title}</h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-500">{event.meta}</p>
                </div>
              </div>
              <button
                type="button"
                className="rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 px-6 py-2 text-xs font-semibold transition-all duration-150 hover:bg-gold-600 hover:border-gold-600 hover:text-white"
              >
                View Details
              </button>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Staff */}
      <section id="staff" className="py-24 sm:py-32 bg-neutral-50 dark:bg-neutral-900/40 border-t border-neutral-200 dark:border-neutral-800 px-4">
        <div className="max-w-6xl mx-auto">
          <p className={`${kickerClass} mb-12 text-center`}>Leadership</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
            {STAFF.map((member, i) => (
              <ScrollReveal key={member.name} delayMs={i * 60} className="group text-center">
                <div className="relative w-full aspect-[3/4] max-w-[180px] mx-auto mb-4 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 transition-all duration-300 group-hover:border-gold-500">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-300"
                    alt={member.alt}
                    src={member.img}
                  />
                </div>
                <h5 className="font-bold text-neutral-900 dark:text-white text-sm">{member.name}</h5>
                <p className="text-xs font-semibold text-gold-700 dark:text-gold-500 mt-1">{member.role}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800 px-4 py-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left space-y-1">
            <div className="font-display text-xl tracking-wide">LG</div>
            <p className="text-xs text-neutral-500 dark:text-neutral-600">
              © {new Date().getFullYear()} Last Game Reborn. All rights reserved.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <div className="flex gap-6">
              {SOCIALS.map((label) => (
                <a
                  key={label}
                  href="#"
                  className="text-xs font-medium text-neutral-500 dark:text-neutral-500 hover:text-gold-600 dark:hover:text-gold-500 transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
            <Link href="/apply" className={primaryButtonClass}>
              Join Tryouts
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
