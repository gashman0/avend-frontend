import { Fragment } from "react";

/* -------------------------------------------------------------------------- */
/*  Types & data                                                              */
/* -------------------------------------------------------------------------- */

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterGroup {
  title: string;
  links: FooterLink[];
}

export interface FooterProps {
  /** Each entry is a visual column holding one or more stacked groups */
  columns?: FooterGroup[][];
  legalLinks?: FooterLink[];
  affiliatesHref?: string;
  className?: string;
}

const L = (label: string, href = "#"): FooterLink => ({ label, href });

const DEFAULT_COLUMNS: FooterGroup[][] = [
  [
    {
      title: "Account",
      links: [L("Log In"), L("Open Account"), L("Finish Application"), L("Account Types"), L("Free Trial"), L("Refer a Friend")],
    },
    {
      title: "Software & Downloads",
      links: [L("Trader Workstation"), L("IBKR Desktop"), L("IBKR Mobile"), L("APIs")],
    },
  ],
  [
    {
      title: "Support",
      links: [
        L("Fund Your Account"),
        L("For Individuals"),
        L("For Institutions"),
        L("Institutional Sales Contacts"),
        L("Browse our FAQs"),
        L("System Status"),
      ],
    },
    { title: "Vendor Support", links: [L("Supplier Information")] },
  ],
  [
    {
      title: "About Us",
      links: [
        L("Awards"),
        L("Careers"),
        L("Information and History"),
        L("Investor Relations"),
        L("News @ IBKR"),
        L("Press and Media"),
        L("Regulatory Reports"),
        L("Affiliate Programs"),
      ],
    },
  ],
  [
    {
      title: "Connect with Us",
      links: [
        L("Discover IBKR on Social Media"),
        L("Facebook"),
        L("Instagram"),
        L("LinkedIn"),
        L("Reddit"),
        L("X (Twitter)"),
        L("YouTube"),
      ],
    },
  ],
];

const DEFAULT_LEGAL: FooterLink[] = [
  L("Accessibility Policy"),
  L("Anti-Fraud Notice"),
  L("Customer Identification Program Notice"),
  L("Customer Relationship Summary"),
  L("Warning on Frauds and Scams"),
  L("Forms and Disclosures"),
  L("Privacy"),
  L("Site Map"),
];

/* -------------------------------------------------------------------------- */
/*  Small pieces                                                              */
/* -------------------------------------------------------------------------- */

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

const linkClass = `rounded text-white/95 transition-colors hover:text-white hover:underline hover:underline-offset-2 ${focusRing}`;

function InlineLink({ href = "#", children }: { href?: string; children: string }) {
  return (
    <a href={href} className={`underline underline-offset-2 hover:text-white/75 ${focusRing} rounded`}>
      {children}
    </a>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true" className="h-3 w-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M6 1.5v9M1.5 6h9" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Footer                                                                    */
/* -------------------------------------------------------------------------- */

export default function Footer({
  columns = DEFAULT_COLUMNS,
  legalLinks = DEFAULT_LEGAL,
  affiliatesHref = "#",
  className = "",
}: FooterProps) {
  return (
    <footer className={`w-full bg-[#0f1114] font-sans text-white antialiased ${className}`}>
      <div className="mx-auto w-full max-w-[1760px] px-5 sm:px-8 lg:px-[72px]">
        {/* ---------------------------- Link columns ---------------------------- */}
        <nav aria-label="Footer" className="border-t border-[#454b4d] pb-12 pt-8 sm:pb-16 lg:pb-[52px]">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-x-10">
            {columns.map((col, ci) => (
              <div key={ci} className="space-y-9">
                {col.map((group) => (
                  <section key={group.title} aria-labelledby={`footer-${ci}-${group.title.replace(/\W+/g, "-")}`}>
                    <h2
                      id={`footer-${ci}-${group.title.replace(/\W+/g, "-")}`}
                      className="text-xs font-semibold"
                    >
                      {group.title}
                    </h2>
                    <ul className="mt-3.5 space-y-[7px] text-xs leading-[15px]">
                      {group.links.map((l) => (
                        <li key={l.label}>
                          <a href={l.href} className={`inline-block py-0.5 ${linkClass}`}>
                            {l.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            ))}
          </div>
        </nav>

        {/* ----------------------------- Legal links ---------------------------- */}
        <nav aria-label="Legal" className="border-y border-[#454b4d] py-4">
          <ul className="flex flex-wrap items-center justify-center gap-y-2 text-[11px] sm:text-xs">
            {legalLinks.map((l, i) => (
              <Fragment key={l.label}>
                <li>
                  <a href={l.href} className={`px-3 py-1 ${linkClass}`}>
                    {l.label}
                  </a>
                </li>
                {i < legalLinks.length - 1 && (
                  <li aria-hidden="true" className="hidden h-3 w-px bg-[#e1161f]/80 sm:block" />
                )}
              </Fragment>
            ))}
          </ul>
        </nav>

        {/* ----------------------------- Company info --------------------------- */}
        <div className="flex flex-col items-center px-2 pb-12 pt-12 text-center text-[11px] leading-5 sm:pt-14 sm:text-xs">
          <p className="font-semibold">Interactive Brokers LLC</p>

          <p className="mt-3 max-w-[780px]">
            Is a member <InlineLink>NYSE</InlineLink> - <InlineLink>FINRA</InlineLink> -{" "}
            <InlineLink>SIPC</InlineLink> and regulated by the US Securities and Exchange Commission
            and the Commodity Futures Trading Commission.
          </p>

          <p className="mt-0.5">
            <span className="font-semibold">Headquarters:</span> One Pickwick Plaza, Greenwich, CT
            06830 USA
          </p>

          <p className="mt-0.5">
            <span className="font-semibold">Website:</span>{" "}
            <InlineLink href="https://www.interactivebrokers.com">www.interactivebrokers.com</InlineLink>
          </p>

          <a
            href={affiliatesHref}
            className={`mt-12 inline-flex items-center gap-2 rounded font-semibold transition-colors hover:text-white/80 ${focusRing} sm:mt-14`}
          >
            <PlusIcon />
            Information on Other Interactive Brokers Affiliates
          </a>
        </div>
      </div>
    </footer>
  );
}