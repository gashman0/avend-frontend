export interface AccountLink {
  label: string;
  href: string;
}

export interface GetStartedProps {
  /** URL / import of your background image (the Earth image) */
  backgroundSrc: string;
  eyebrow?: string;
  title?: string;
  description?: string[];
  ctaLabel?: string;
  onCtaClick?: () => void;
  ctaHref?: string;
  accountsTitle?: string;
  accounts?: AccountLink[];
  className?: string;
}

const DEFAULT_ACCOUNTS: AccountLink[] = [
  { label: "Individual Account", href: "#" },
  { label: "Joint or Trust Account", href: "#" },
  { label: "Retirement Account", href: "#" },
  { label: "Non-Professional Advisor", href: "#" },
  { label: "Institutional Accounts", href: "#" },
];

function ArrowRight() {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden="true"
      className="h-3 w-3 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
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

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

export default function GetStarted({
  backgroundSrc,
  eyebrow = "Get Started",
  title = "Join 5 Million Clients Worldwide",
  description = [
    "Apply in minutes and experience",
    "the global advantage of Interactive Brokers.",
  ],
  ctaLabel = "Start Trading",
  onCtaClick,
  ctaHref,
  accountsTitle = "View Accounts Designed for Your Goals",
  accounts = DEFAULT_ACCOUNTS,
  className = "",
}: GetStartedProps) {
  const ctaClass = `mt-7 inline-flex h-10 w-full max-w-[280px] items-center justify-center bg-[#d91222] px-6 text-sm text-[#1a0507] transition-colors hover:bg-[#ef1a2c] ${focusRing} sm:w-[156px]`;

  return (
    <section
      aria-labelledby="get-started-heading"
      className={`relative isolate w-full overflow-hidden bg-[#15181e] font-sans text-white antialiased ${className}`}
    >
      {/* Background image with fades into the page colour */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundSrc})` }}
        />
        {/* Soft darkening so text stays legible over the bright limb of the Earth */}
        <div className="absolute inset-0 bg-[#15181e]/30" />
        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-[#15181e] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#15181e] to-transparent" />
        <div className="absolute inset-y-0 left-0 w-[8%] bg-gradient-to-r from-[#15181e] to-transparent" />
        <div className="absolute inset-y-0 right-0 w-[8%] bg-gradient-to-l from-[#15181e] to-transparent" />
      </div>

      <div className="mx-auto flex min-h-[560px] w-full max-w-[1300px] flex-col items-center px-5 pb-20 pt-24 text-center sm:min-h-[640px] sm:px-8 sm:pt-28 lg:min-h-[676px] lg:pt-[140px]">
        <p className="text-sm font-semibold sm:text-base">{eyebrow}</p>

        <h2
          id="get-started-heading"
          className="mt-8 text-balance text-[28px] font-semibold leading-tight tracking-tight sm:mt-10 sm:text-4xl lg:text-[40px]"
        >
          {title}
        </h2>

        <p className="mt-4 max-w-[520px] text-balance text-[15px] leading-7 sm:text-base lg:text-[17px]">
          {description.map((line, i) => (
            <span key={i} className="sm:block">
              {line}{" "}
            </span>
          ))}
        </p>

        {ctaHref ? (
          <a href={ctaHref} className={ctaClass}>
            {ctaLabel}
          </a>
        ) : (
          <button type="button" onClick={onCtaClick} className={ctaClass}>
            {ctaLabel}
          </button>
        )}

        <h3 className="mt-14 text-sm font-semibold sm:mt-16 sm:text-base">{accountsTitle}</h3>

        <ul className="mt-4 flex max-w-[960px] flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-7">
          {accounts.map((a) => (
            <li key={a.label}>
              <a
                href={a.href}
                className={`group inline-flex items-center gap-2 rounded text-xs font-medium text-white transition-colors hover:text-white/80 hover:underline hover:underline-offset-4 ${focusRing} sm:text-[13px]`}
              >
                {a.label}
                <ArrowRight />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}