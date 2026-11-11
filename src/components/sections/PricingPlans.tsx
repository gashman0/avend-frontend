import type { ReactNode } from "react";

export interface Plan {
  audience: string;
  name: string;
  /** The coloured part of the plan name, e.g. "LITE" or "PRO" */
  accentName: string;
  accent: "blue" | "red";
  features: ReactNode[];
}

export interface PricingPlansProps {
  title?: string;
  plans?: Plan[];
  detailsHref?: string;
  className?: string;
}

const Sup = ({ children }: { children: string }) => (
  <sup className="ml-0.5 align-super text-[0.6em] font-normal leading-none">{children}</sup>
);

const DEFAULT_PLANS: Plan[] = [
  {
    audience: "Occasional Traders",
    name: "IBKR",
    accentName: "LITE",
    accent: "blue",
    features: [
      <>
        <strong className="text-[1.15em] font-semibold">$0</strong>
        <Sup>3</Sup> <strong className="font-semibold">Commissions</strong> on US stocks and ETFs
      </>,
      <>
        Margin as low as <strong className="font-semibold">USD 6.38%</strong>
      </>,
      <>
        Interest up to <strong className="font-semibold">USD 2.38%</strong>
      </>,
    ],
  },
  {
    audience: "Active Traders",
    name: "IBKR",
    accentName: "PRO",
    accent: "red",
    features: [
      <>
        <strong className="text-[1.15em] font-semibold">$0.005</strong>{" "}
        <strong className="font-semibold">per share</strong>
        <Sup>4</Sup> on US Stocks and ETFs
      </>,
      <>
        Margin as low as <strong className="font-semibold">USD 4.38%</strong>
      </>,
      <>
        Interest up to <strong className="font-semibold">USD 3.38%</strong>
      </>,
      <>Enhanced price execution</>,
      <>
        Extra protection on uninvested cash<Sup>5</Sup>
      </>,
    ],
  },
];

const ACCENT_TEXT = {
  blue: "text-[#4d7ff0]",
  red: "text-[#e63a3c]",
} as const;

const PILL_BG = {
  blue: "bg-[#1f2a3c]",
  red: "bg-[#262634]",
} as const;

function Check() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="mt-[5px] h-4 w-4 shrink-0 text-[#d91222]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 8.5 3.2 3.2L13 4.8" />
    </svg>
  );
}

export default function PricingPlans({
  title = "Pricing for Any Trading Style",
  plans = DEFAULT_PLANS,
  detailsHref = "#",
  className = "",
}: PricingPlansProps) {
  return (
    <section
      aria-labelledby="pricing-heading"
      className={`w-full bg-[#15181e] font-sans text-white antialiased ${className}`}
    >
      <div className="mx-auto w-full max-w-[1400px] px-4 py-10 sm:px-8 sm:py-12">
        <h2
          id="pricing-heading"
          className="text-balance text-center text-2xl font-semibold tracking-tight sm:text-[28px]"
        >
          {title}
        </h2>

        <div className="mt-8 bg-gradient-to-b from-[#1c2635] to-[#191f2a] px-5 py-12 sm:mt-10 sm:px-10 lg:px-16 lg:py-16">
          <ul className="grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-10 lg:gap-16">
            {plans.map((plan) => (
              <li key={plan.accentName} className="flex flex-col items-center">
                <span
                  className={`rounded-full px-5 py-2 text-xs font-semibold sm:text-[13px] ${PILL_BG[plan.accent]}`}
                >
                  {plan.audience}
                </span>

                <h3 className="mt-8 text-lg font-semibold tracking-wide sm:text-xl">
                  {plan.name} <span className={ACCENT_TEXT[plan.accent]}>{plan.accentName}</span>
                </h3>

                <ul className="mt-6 w-full max-w-[420px] space-y-3.5 text-[15px] leading-6 sm:text-base">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <div className="mt-12 text-center">
            <a
              href={detailsHref}
              className="rounded text-sm font-semibold text-white transition-colors hover:text-white/75 hover:underline hover:underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              See Pricing Details
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}