export interface RateCard {
  /** Small line above the figure, e.g. "Earn interest up to" */
  intro: string;
  currency?: string;
  rate: string;
  /** Lines under the figure. Each string renders on its own line. */
  description: string[];
  linkLabel: string;
  href: string;
}

export interface RateCardsProps {
  title?: string;
  cards?: RateCard[];
  className?: string;
}

const DEFAULT_CARDS: RateCard[] = [
  {
    intro: "Earn interest up to",
    currency: "USD",
    rate: "3.38%",
    description: ["on uninvested cash.", "Automatically."],
    linkLabel: "Compare Interest Rates",
    href: "#",
  },
  {
    intro: "Borrow for as low as",
    currency: "USD",
    rate: "4.38%",
    description: ["Among the lowest", "margin rates globally."],
    linkLabel: "Compare Margin Rates",
    href: "#",
  },
];

// Card surfaces sampled from the reference: the first is a blue-tinted
// gradient, the second is a flatter, darker surface.
const CARD_SURFACES = [
  "bg-gradient-to-b from-[#1c2534] to-[#191f2a]",
  "bg-gradient-to-b from-[#191f29] to-[#171c24]",
];

export default function RateCards({
  title = "Your Money Works Harder Here",
  cards = DEFAULT_CARDS,
  className = "",
}: RateCardsProps) {
  return (
    <section
      aria-labelledby="rates-heading"
      className={`w-full bg-[#15181e] font-sans text-white antialiased ${className}`}
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 py-10 sm:px-8 sm:py-12 lg:py-14">
        <h2
          id="rates-heading"
          className="text-balance text-center text-[28px] font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
        >
          {title}
        </h2>

        <ul className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 md:grid-cols-2 lg:gap-8">
          {cards.map((card, i) => (
            <li
              key={card.intro}
              className={`flex min-h-[300px] flex-col items-center justify-center px-6 py-12 text-center sm:min-h-[340px] lg:min-h-[326px] ${
                CARD_SURFACES[i % CARD_SURFACES.length]
              }`}
            >
              <p className="text-xl font-light sm:text-2xl">{card.intro}</p>

              <p className="mt-2 flex items-baseline justify-center gap-2 sm:gap-3" aria-label={`${card.currency ?? ""} ${card.rate}`.trim()}>
                {card.currency && (
                  <span aria-hidden="true" className="text-xl font-medium uppercase sm:text-2xl">
                    {card.currency}
                  </span>
                )}
                <span aria-hidden="true" className="text-[56px] font-semibold leading-none tracking-tight sm:text-[68px] lg:text-[72px]">
                  {card.rate}
                </span>
              </p>

              <p className="mt-4 text-sm leading-[1.5] sm:text-base">
                {card.description.map((line, j) => (
                  <span key={j} className="block">
                    {line}
                  </span>
                ))}
              </p>

              <a
                href={card.href}
                className="mt-8 rounded text-xs font-semibold text-white transition-colors hover:text-white/75 hover:underline hover:underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-sm"
              >
                {card.linkLabel}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}