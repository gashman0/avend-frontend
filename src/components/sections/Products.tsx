export interface ProductLink {
  label: string;
  href: string;
}

export interface ProductsProps {
  /** URL / import of your background image (planet + candlesticks) */
  backgroundSrc: string;
  eyebrow?: string;
  title?: string;
  products?: ProductLink[];
  exploreHref?: string;
  /** Heading shown at the bottom of the section. Pass "" to hide it. */
  footerTitle?: string;
  className?: string;
}

const DEFAULT_PRODUCTS: ProductLink[] = [
  { label: "Stocks", href: "#" },
  { label: "ETFs", href: "#" },
  { label: "Options", href: "#" },
  { label: "Futures", href: "#" },
  { label: "Bonds", href: "#" },
  { label: "Prediction Markets", href: "#" },
  { label: "Currencies", href: "#" },
  { label: "Mutual Funds", href: "#" },
  { label: "US Spot Gold", href: "#" },
];

function GlobeSearchIcon({ className = "" }: { className?: string }) {
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
      <path d="M20.2 11.2A8.5 8.5 0 1 0 12 20.5" />
      <path d="M3.7 12h8.6M12 3.5c-2.200 2.300-3.300 5.200-3.300 8.500s1.100 6.200 3.300 8.500M12 3.500c1.500 1.600 2.500 3.600 3 5.800" />
      <circle cx="17" cy="17" r="3" />
      <path d="m19.200 19.200 2.300 2.300" />
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
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m4.25 2 4 4-4 4" />
    </svg>
  );
}

export default function Products({
  backgroundSrc,
  eyebrow = "Products",
  title = "Access 175+ Markets in One Platform",
  products = DEFAULT_PRODUCTS,
  exploreHref = "#",
  footerTitle = "Your Money Works Harder Here",
  className = "",
}: ProductsProps) {
  return (
    <section
      aria-labelledby="products-heading"
      className={`relative isolate w-full overflow-hidden bg-[#15181e] font-sans text-white antialiased ${className}`}
    >
      {/* Background image + fades into the page colour */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-[position:50%_100%] bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundSrc})` }}
        />
        <div className="absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-[#15181e] via-[#15181e]/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-[#15181e] to-transparent" />
        <div className="absolute inset-y-0 left-0 w-[10%] bg-gradient-to-r from-[#15181e] to-transparent" />
        <div className="absolute inset-y-0 right-0 w-[10%] bg-gradient-to-l from-[#15181e] to-transparent" />
      </div>

      <div className="mx-auto flex min-h-[640px] w-full max-w-[1400px] flex-col items-center justify-between px-5 pb-10 pt-4 text-center sm:min-h-[760px] sm:px-8 lg:min-h-[880px] lg:pb-14">
        {/* Top copy */}
        <div className="flex w-full flex-col items-center">
          <p className="flex items-center gap-2 text-sm font-semibold">
            <GlobeSearchIcon className="h-5 w-5 text-[#3b82f6]" />
            {eyebrow}
          </p>

          <h2
            id="products-heading"
            className="mt-4 text-balance text-[26px] font-semibold leading-tight tracking-tight sm:text-[32px] lg:text-[36px]"
          >
            {title}
          </h2>

          <ul className="mt-5 flex max-w-[1100px] flex-wrap items-center justify-center gap-x-6 gap-y-2 text-base sm:gap-x-8 sm:text-lg lg:text-[21px]">
            {products.map((p) => (
              <li key={p.label}>
                <a
                  href={p.href}
                  className="rounded text-white/95 transition-colors hover:text-white hover:underline hover:underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  {p.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={exploreHref}
            className="group mt-8 inline-flex items-center gap-2 rounded text-xs font-semibold text-white transition-colors hover:text-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-sm"
          >
            Explore Products
            <ArrowRight />
          </a>
        </div>

        {/* Bottom heading (sits below the planet) */}
        {footerTitle && (
          <h3 className="mt-24 text-balance text-2xl font-semibold tracking-tight sm:text-[28px]">
            {footerTitle}
          </h3>
        )}
      </div>
    </section>
  );
}