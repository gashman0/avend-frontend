import type { ReactNode } from "react";

export interface DisclosuresProps {
  title?: string;
  /** Date shown in disclosure 1, e.g. "November 13, 2026" */
  asOfDate?: string;
  /** Provide your own list items to replace the defaults entirely */
  items?: ReactNode[];
  className?: string;
}

function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="underline underline-offset-2 transition-colors hover:text-white/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      {children}
    </a>
  );
}

export default function Disclosures({
  title = "Disclosures",
  asOfDate = "November 13, 2026",
  items,
  className = "",
}: DisclosuresProps) {
  const defaultItems: ReactNode[] = [
    <>
      Restrictions apply. See additional information on <A href="#">interest rates</A>. Credit
      interest rate as of {asOfDate}.
    </>,
    <>
      For complete information, see our <A href="#">margin rate comparison</A>.
    </>,
    <>
      IBKR Lite provides commission-free trades in US exchange-listed stocks and ETFs. For complete
      information, see <A href="#">ibkr.com/commissions</A>.
    </>,
    <>
      Fixed rate pricing. For more information, <A href="#">see pricing</A>.
    </>,
    <>
      Participation in the <A href="#">Insured Bank Deposit Sweep Program</A> required; restrictions
      apply.
    </>,
    <>
      For additional information and the latest quarterly metrics for Interactive Brokers Group and
      its affiliates, visit <A href="#">Quarterly Earnings on Investor Relations</A>. The number of
      client accounts displayed includes all account types across all IBG affiliates.
    </>,
  ];

  const list = items ?? defaultItems;

  return (
    <section
      aria-labelledby="disclosures-heading"
      className={`w-full bg-[#1a1d22] font-sans text-white antialiased ${className}`}
    >
      <div className="mx-auto w-full max-w-[1250px] px-5 py-10 sm:px-8 sm:py-12 lg:px-[110px] lg:py-14">
        <h2 id="disclosures-heading" className="text-xs font-semibold sm:text-[13px]">
          {title}
        </h2>

        <ol className="mt-5 space-y-3 text-xs leading-5 sm:text-[13px]">
          {list.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span aria-hidden="true" className="w-4 shrink-0 text-right tabular-nums">
                {i + 1}.
              </span>
              <span className="min-w-0 flex-1">{item}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}