export interface HeroProps {
  onGetStarted?: () => void;
  disclosureHref?: string;
  className?: string;
}

function Sup({ children }: { children: string }) {
  return (
    <sup className="ml-[1px] mr-1 align-super text-[0.55em] font-normal leading-none">
      {children}
    </sup>
  );
}

export default function Hero({
  onGetStarted,
  disclosureHref = "#",
  className = "",
}: HeroProps) {
  return (
    <section
      aria-labelledby="hero-heading"
      className={`w-full bg-[#15181e] font-sans text-white antialiased ${className}`}
    >
      <div className="mx-auto flex w-full max-w-[1100px] flex-col items-center px-5 pb-14 pt-10 text-center sm:px-8 sm:pb-16 sm:pt-12 lg:pb-20">
        <h1
          id="hero-heading"
          className="text-balance text-[34px] font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-[56px]"
        >
          Lower Costs. Better Returns.
        </h1>

        <p className="mt-6 max-w-[860px] text-balance text-base leading-[1.9] text-white sm:mt-8 sm:text-lg lg:text-[22px] lg:leading-[1.8]">
          Earn <strong className="font-semibold">up to USD 3.38%</strong>
          <Sup>1</Sup>
          on uninvested cash,{" "}
          <strong className="font-semibold">pay up to 54% less</strong>
          <Sup>2</Sup>
          on margin, and trade with{" "}
          <strong className="font-semibold">commissions starting at $0</strong>
          <Sup>3</Sup>
          across <strong className="font-semibold">175+ markets worldwide</strong>.
        </p>

        <button
          type="button"
          onClick={onGetStarted}
          className="mt-8 inline-flex h-11 w-full max-w-[320px] items-center justify-center bg-[#d91222] px-6 text-sm text-[#1a0507] transition-colors hover:bg-[#ef1a2c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:mt-10 sm:w-[180px]"
        >
          Get Started
        </button>

        <a
          href={disclosureHref}
          className="mt-10 text-xs font-medium text-white/75 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:mt-12"
        >
          Lower Cost Disclosure
        </a>
      </div>
    </section>
  );
}