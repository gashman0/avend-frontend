import type { ReactNode } from "react";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

export interface Award {
  /** Publisher name, used for the accessible label of the logo */
  publisher: string;
  /** Logo element. Swap in your official SVG/<img> for production. */
  logo: ReactNode;
  /** One line per award */
  awards: string[];
}

export interface AwardsProps {
  title?: string;
  items?: Award[];
  viewAwardsHref?: string;
  transferHref?: string;
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*  Placeholder wordmarks (replace with the official logo files)              */
/* -------------------------------------------------------------------------- */

const LOGO_COLOR = "text-[#adaeb0]";

function BrokerChooserLogo() {
  return (
    <span className={`${LOGO_COLOR} text-[28px] font-extrabold uppercase tracking-tight sm:text-[32px] lg:text-[34px]`}>
      BrokerChooser
    </span>
  );
}

function StockBrokersLogo() {
  return (
    <span className={`${LOGO_COLOR} inline-flex items-center gap-2`}>
      <svg viewBox="0 0 24 32" aria-hidden="true" className="h-8 w-6 shrink-0" fill="currentColor">
        <path d="M12 0 24 13H0L12 0Z" />
        <path d="M0 19h24L12 32 0 19Z" opacity="0.85" />
      </svg>
      <span className="text-[30px] font-light leading-none tracking-tight sm:text-[36px] lg:text-[40px]">
        StockBrokers<span className="text-[0.7em]">.com</span>
      </span>
    </span>
  );
}

function InvestopediaLogo() {
  return (
    <span className={`${LOGO_COLOR} inline-flex items-center gap-1.5`}>
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8 shrink-0" fill="currentColor">
        <circle cx="16" cy="16" r="16" />
        <path d="M9 14c0-3 2.5-5 6-5h2v3h-2c-1.800 0-3 .9-3 2v1h5v3h-5v3H9v-7Z" fill="#15181e" />
      </svg>
      <span className="text-[30px] font-light leading-none tracking-tight sm:text-[36px] lg:text-[38px]">
        Investopedia
      </span>
    </span>
  );
}

function KiplingerLogo() {
  return (
    <span
      className={`${LOGO_COLOR} inline-block scale-x-[0.82] text-[40px] font-black leading-none tracking-tighter sm:text-[46px] lg:text-[50px]`}
      style={{ fontFamily: "'Oswald','Arial Narrow',Impact,sans-serif" }}
    >
      Kiplinger
    </span>
  );
}

const DEFAULT_ITEMS: Award[] = [
  {
    publisher: "BrokerChooser",
    logo: <BrokerChooserLogo />,
    awards: ["Best Online Broker", "Best Broker for Margin Trading"],
  },
  {
    publisher: "StockBrokers.com",
    logo: <StockBrokersLogo />,
    awards: ["#1 Professional Trading", "#1 International Trading"],
  },
  {
    publisher: "Investopedia",
    logo: <InvestopediaLogo />,
    awards: ["Best for Advanced Traders", "Best for International Trading"],
  },
  {
    publisher: "Kiplinger",
    logo: <KiplingerLogo />,
    awards: ["#1 Overall Online Broker", "#1 in Investment Choices"],
  },
];

/* -------------------------------------------------------------------------- */
/*  Small pieces                                                              */
/* -------------------------------------------------------------------------- */

function ArrowRight() {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden="true"
      className="h-3 w-3 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m4.25 2 4 4-4 4" />
    </svg>
  );
}

const linkClass =
  "group inline-flex items-center gap-2 rounded text-sm font-semibold text-white transition-colors hover:text-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

export default function Awards({
  title = "Awarded by Industry Leaders. Year After Year.",
  items = DEFAULT_ITEMS,
  viewAwardsHref = "#",
  transferHref = "#",
  className = "",
}: AwardsProps) {
  return (
    <section
      aria-labelledby="awards-heading"
      className={`w-full bg-[#15181e] font-sans text-white antialiased ${className}`}
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 py-12 sm:px-8 sm:py-14 lg:py-16">
        <h2
          id="awards-heading"
          className="text-balance text-center text-xl font-semibold tracking-tight sm:text-2xl"
        >
          {title}
        </h2>

        {/* Logos + awards */}
        <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:mt-12 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-y-0">
          {items.map((item) => (
            <li key={item.publisher} className="flex flex-col items-center text-center">
              <div
                role="img"
                aria-label={item.publisher}
                className="flex h-14 items-center justify-center sm:h-16"
              >
                {item.logo}
              </div>
              <div className="mt-5 space-y-1 text-base leading-7 text-white sm:text-[17px]">
                {item.awards.map((a) => (
                  <p key={a}>{a}</p>
                ))}
              </div>
            </li>
          ))}
        </ul>

        {/* Links */}
        <div className="mt-10 flex flex-col items-center gap-8 sm:mt-12">
          <a href={viewAwardsHref} className={linkClass}>
            View Awards
            <ArrowRight />
          </a>

          <p className="flex flex-col items-center gap-3 text-center text-sm font-semibold sm:flex-row sm:gap-4">
            <span>Switch to IBKR with Ease.</span>
            <a href={transferHref} className={linkClass}>
              Learn How Transfers Work
              <ArrowRight />
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}