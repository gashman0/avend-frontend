export interface PlatformLink {
  label: string;
  href: string;
  /** Tailwind text colour class for the arrow icon */
  accent?: string;
}

export interface PlatformsProps {
  /** Your devices image (laptop + tablet + phone) */
  imageSrc: string;
  imageAlt?: string;
  eyebrow?: string;
  /** Heading lines; each string is rendered on its own line on larger screens */
  titleLines?: string[];
  description?: string[];
  links?: PlatformLink[];
  className?: string;
}

const DEFAULT_LINKS: PlatformLink[] = [
  { label: "IBKR Desktop", href: "#", accent: "text-[#3b82f6]" },
  { label: "Client Portal", href: "#", accent: "text-[#f5b301]" },
  { label: "IBKR Mobile", href: "#", accent: "text-[#e1597a]" },
  { label: "Trader Workstation", href: "#", accent: "text-white" },
];

function PlatformsIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Up / down arrows */}
      <path d="M8 20V4M4.5 7.500 8 4l3.500 3.500" />
      <path d="M16 4v16M12.500 16.500 16 20l3.500-3.500" />
    </svg>
  );
}

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden="true"
      className={`h-3 w-3 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m4.25 2 4 4-4 4" />
    </svg>
  );
}

export default function Platforms({
  imageSrc,
  imageAlt = "Interactive Brokers trading platforms on laptop, tablet and phone",
  eyebrow = "IBKR Platforms",
  titleLines = ["Institutional-Grade Tools.", "Built for You."],
  description = [
    "Lightning-fast, advanced trading platforms",
    "for precision and insight — on any device.",
  ],
  links = DEFAULT_LINKS,
  className = "",
}: PlatformsProps) {
  return (
    <section
      aria-labelledby="platforms-heading"
      className={`w-full overflow-hidden bg-[#15181e] font-sans text-white antialiased ${className}`}
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center px-5 pb-12 pt-10 text-center sm:px-8 sm:pb-16 sm:pt-12 lg:pb-20">
        <p className="flex items-center gap-2 text-sm font-semibold">
          <PlatformsIcon className="h-5 w-5 text-[#3b82f6]" />
          {eyebrow}
        </p>

        <h2
          id="platforms-heading"
          className="mt-8 text-balance text-[30px] font-semibold leading-[1.15] tracking-tight sm:mt-10 sm:text-4xl lg:text-5xl"
        >
          {titleLines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h2>

        <p className="mt-5 max-w-[520px] text-balance text-sm leading-6 sm:mt-6 sm:text-base sm:leading-7">
          {description.map((line, i) => (
            <span key={i} className="sm:block">
              {line}{" "}
            </span>
          ))}
        </p>

        <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:mt-6 sm:gap-x-8">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="group inline-flex items-center gap-2 rounded text-xs font-semibold text-white transition-colors hover:text-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-[13px]"
              >
                {l.label}
                <ArrowRight className={l.accent ?? "text-white"} />
              </a>
            </li>
          ))}
        </ul>

        <img
          src={imageSrc}
          alt={imageAlt}
          loading="lazy"
          decoding="async"
          className="mt-10 h-auto w-full max-w-[920px] select-none sm:mt-14"
        />
      </div>
    </section>
  );
}