export interface Testimonial {
  quote: string;
  source: string;
  date?: string;
}

export interface AiIntegrationProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  linkLabel?: string;
  linkHref?: string;
  testimonial?: Testimonial;
  className?: string;
}

function SparklesIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M11 4.500c.700 4.600 2.900 6.800 7.500 7.500-4.600.700-6.800 2.900-7.500 7.500-.700-4.600-2.900-6.800-7.500-7.500C8.100 11.300 10.300 9.100 11 4.500Z" />
      <path d="M21 15c.400 2.700 1.700 4 4.400 4.400-2.700.400-4 1.700-4.400 4.400-.400-2.700-1.700-4-4.400-4.400 2.700-.400 4-1.700 4.400-4.400Z" />
    </svg>
  );
}

function QuoteMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 32" aria-hidden="true" className={className} fill="currentColor">
      <path d="M0 18.500C0 9.500 4.600 3 13.200 0l1.800 3.300C10.500 5.300 8.400 8.200 8.200 12.200c.900-.4 1.800-.6 2.900-.6 3.400 0 6.200 2.500 6.200 6.400 0 4-3.100 7.700-7.300 7.700C4.100 25.700 0 23.200 0 18.500Zm22.700 0C22.700 9.500 27.300 3 35.900 0l1.800 3.300c-4.500 2-6.600 4.900-6.800 8.900.900-.4 1.800-.6 2.900-.6 3.400 0 6.200 2.500 6.200 6.400 0 4-3.100 7.700-7.300 7.700-5.700 0-9.800-2.500-9.800-7.200Z" />
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

export default function AiIntegration({
  eyebrow = "Integrated",
  title = "AI Assists. You Decide.",
  description = "Connect AI platforms that support Model Context Protocol (MCP), including ChatGPT, Claude, Grok, and Perplexity directly to your IBKR account to analyze portfolios, research opportunities, and generate trade instructions.",
  linkLabel = "Learn About AI Integration",
  linkHref = "#",
  testimonial = {
    quote:
      "In all, IBKR tops our list of brokerages: it is the highest-rated broker at BrokerChooser.",
    source: "BrokerChooser",
    date: "April 7, 2026",
  },
  className = "",
}: AiIntegrationProps) {
  return (
    <section
      aria-labelledby="ai-heading"
      className={`w-full bg-[#15181e] font-sans text-white antialiased ${className}`}
    >
      <div className="mx-auto flex w-full max-w-[1000px] flex-col items-center px-5 pb-12 pt-10 text-center sm:px-8 sm:pb-16 sm:pt-12 lg:pb-20">
        <p className="flex items-center gap-2 text-sm font-semibold">
          <SparklesIcon className="h-6 w-6 text-[#3b82f6]" />
          {eyebrow}
        </p>

        <h2
          id="ai-heading"
          className="mt-8 text-balance text-[30px] font-semibold leading-tight tracking-tight sm:mt-10 sm:text-4xl lg:text-[40px]"
        >
          {title}
        </h2>

        <p className="mt-4 max-w-[780px] text-pretty text-[15px] leading-7 sm:text-base lg:text-[17px] lg:leading-[1.65]">
          {description}
        </p>

        <a
          href={linkHref}
          className="group mt-5 inline-flex items-center gap-2 rounded text-xs font-semibold text-white transition-colors hover:text-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          {linkLabel}
          <ArrowRight />
        </a>

        {/* Testimonial */}
        <figure className="mt-16 w-full bg-gradient-to-b from-[#1c2635] to-[#191f2a] px-6 py-10 sm:mt-24 sm:px-12 sm:py-14 lg:mt-32">
          <QuoteMark className="mx-auto h-7 w-9 text-white/90 sm:h-8 sm:w-10" />

          <blockquote className="mx-auto mt-6 max-w-[720px] text-balance text-lg font-light italic leading-snug sm:text-xl lg:text-[22px]">
            “{testimonial.quote}”
          </blockquote>

          <figcaption className="mt-5 text-xs font-medium sm:text-[13px]">
            – {testimonial.source}
            {testimonial.date && <> | {testimonial.date}</>}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}