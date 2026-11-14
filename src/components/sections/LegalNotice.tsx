import type { ReactNode } from "react";

export interface LegalNoticeProps {
  /** Replace the default paragraphs entirely. Each entry renders as one paragraph. */
  paragraphs?: ReactNode[];
  className?: string;
}

function A({ href = "#", children }: { href?: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="underline underline-offset-2 transition-colors hover:text-white/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      {children}
    </a>
  );
}

const SM = () => <sup className="align-super text-[0.7em] leading-none">SM</sup>;
const Reg = () => <sup className="align-super text-[0.7em] leading-none">®</sup>;

const DEFAULT_PARAGRAPHS: ReactNode[] = [
  <>
    Interactive Brokers
    <Reg />, IB
    <SM />, InteractiveBrokers.com
    <Reg />, Interactive Analytics
    <Reg />, IB Options Analytics
    <SM />, IB SmartRouting
    <SM />, BestX
    <SM />, PortfolioAnalyst
    <Reg />, IB Trader Workstation
    <SM /> and One World, One Account
    <SM /> are service marks and/or trademarks of Interactive Brokers LLC. Supporting
    documentation for any claims and statistical information will be provided upon request. Any
    trading symbols displayed are for illustrative purposes only and are not intended to portray
    recommendations.
  </>,
  <>
    The risk of loss in online trading of stocks, options, futures, currencies, foreign equities,
    and fixed income can be substantial.
  </>,
  <>
    Options involve risk and are not suitable for all investors. For more information read the{" "}
    <A>Characteristics and Risks of Standardized Options</A>, also known as the options disclosure
    document (ODD). Alternatively, please contact <A>IB Customer Service</A> to receive a copy of
    the ODD. Before trading, clients must read the relevant risk disclosure statements on our{" "}
    <A>Warnings and Disclosures page</A>. Trading on margin is only for experienced investors with
    high risk tolerance. You may lose more than your initial investment. For additional information
    about rates on margin loans, please see <A>Margin Loan Rates</A>. Security futures involve a
    high degree of risk and are not suitable for all investors. The amount you may lose may be
    greater than your initial investment. Before trading security futures, read the{" "}
    <A>Security Futures Risk Disclosure Statement</A>. Structured products and fixed income
    products such as bonds are complex products that are riskier and not suitable for all
    investors. Before trading, please read the <A>Risk Warning and Disclosure Statement</A>.
  </>,
  <>
    For information on the IBKR ATS and IBKR Eos ATS, please <A>visit the SEC site</A>.
  </>,
  <>40 countries include both countries and territories.</>,
  <>IBKR charges no custody fees. Custody fees may be charged by third parties.</>,
];

export default function LegalNotice({
  paragraphs = DEFAULT_PARAGRAPHS,
  className = "",
}: LegalNoticeProps) {
  return (
    <section
      aria-label="Legal notices"
      className={`w-full bg-[#15181e] font-sans text-white antialiased ${className}`}
    >
      <div className="mx-auto w-full max-w-[1700px] px-5 py-8 sm:px-8 sm:py-10 lg:px-[77px]">
        <div className="space-y-3.5 text-[11px] leading-[1.7] sm:text-xs sm:leading-5">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}