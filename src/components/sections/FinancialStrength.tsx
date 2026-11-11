import type { ReactNode } from "react";

export interface Stat {
  /** Small line above the figure */
  before?: ReactNode;
  /** The large figure */
  value: string;
  /** Small line under the figure */
  after?: ReactNode;
}

export interface FinancialStrengthProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  badge?: string;
  stats?: Stat[];
  linkLabel?: string;
  linkHref?: string;
  className?: string;
}

const Sup = ({ children }: { children: string }) => (
  <sup className="align-super text-[0.65em] leading-none">{children}</sup>
);

const DEFAULT_STATS: Stat[] = [
  { before: "Trusted by over", value: "5 Million", after: <>clients worldwide<Sup>6</Sup></> },
  { before: "Executing more than", value: "4 Million", after: <>trades daily<Sup>6</Sup></> },
  { before: "Nasdaq-listed", value: "IBKR" },
  { before: "Member of the", value: "S&P500" },
  { before: <>Client assets<Sup>6</Sup> over</>, value: "$964 Billion" },
  { before: <>Total equity<Sup>6</Sup> exceeding</>, value: "$23 Billion" },
  {
    before: "Over",
    value: "$5 Million",
    after: <>In account protection coverage for uninvested cash<Sup>5</Sup></>,
  },
  { before: "Nearly", value: "50 Years", after: "of Innovation" },
];

function ShieldCheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        d="M12 2 3.500 5.200v6c0 5 3.600 9 8.500 10.800 4.900-1.800 8.500-5.800 8.500-10.800v-6L12 2Z"
        fill="currentColor"
      />
      <path
        d="m8 12.200 2.800 2.800 5.200-5.600"
        fill="none"
        stroke="#15181e"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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

export default function FinancialStrength({
  eyebrow = "Financial Strength",
  title = "Security You Can Trust",
  description = "Your assets are backed by strong capital, automated risk controls, and a commitment to transparency.",
  badge = "IBKR at a Glance",
  stats = DEFAULT_STATS,
  linkLabel = "IBKR Strength and Security",
  linkHref = "#",
  className = "",
}: FinancialStrengthProps) {
  return (
    <section
      aria-labelledby="strength-heading"
      className={`w-full bg-[#15181e] font-sans text-white antialiased ${className}`}
    >
      <div className="mx-auto flex w-full max-w-[1300px] flex-col items-center px-5 py-12 text-center sm:px-8 sm:py-16 lg:py-20">
        <p className="flex items-center gap-2 text-sm font-semibold">
          <ShieldCheckIcon className="h-5 w-5 text-[#3b82f6]" />
          {eyebrow}
        </p>

        <h2
          id="strength-heading"
          className="mt-8 text-balance text-[30px] font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[40px]"
        >
          {title}
        </h2>

        <p className="mt-4 max-w-[520px] text-balance text-[15px] leading-7 sm:text-base lg:text-[17px]">
          {description}
        </p>

        <span className="mt-5 rounded-full bg-[#23262b] px-4 py-2 text-[11px] font-semibold">
          {badge}
        </span>

        <ul className="mt-12 grid w-full grid-cols-2 gap-x-4 gap-y-12 sm:mt-14 lg:grid-cols-4 lg:gap-y-16">
          {stats.map((s, i) => (
            <li key={i} className="flex flex-col items-center px-1">
              {s.before && <p className="text-xs sm:text-[13px]">{s.before}</p>}
              <p className="mt-1 text-[28px] font-light leading-tight tracking-tight sm:text-4xl lg:text-[40px]">
                {s.value}
              </p>
              {s.after && (
                <p className="mt-1 max-w-[260px] text-xs leading-[1.5] sm:text-[13px]">{s.after}</p>
              )}
            </li>
          ))}
        </ul>

        <a
          href={linkHref}
          className="group mt-12 inline-flex items-center gap-2 rounded text-xs font-semibold text-white transition-colors hover:text-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:mt-14"
        >
          {linkLabel}
          <ArrowRight />
        </a>
      </div>
    </section>
  );
}