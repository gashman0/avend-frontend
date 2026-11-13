
import { useEffect, useId, useRef, useState } from "react";

/* -------------------------------------------------------------------------- */
/* Types & data                                                               */
/* -------------------------------------------------------------------------- */

export interface NavChild {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href?: string;
  children?: NavChild[];
}

export interface NavBarProps {
  items?: NavItem[];
  onLogin?: () => void;
  onOpenAccount?: () => void;
  onLanguageClick?: () => void;
  className?: string;
}

const DEFAULT_ITEMS: NavItem[] = [
  {
    label: "Why IBKR",
    children: [
      { label: "Overview", href: "#" },
      { label: "Our Edge", href: "#" },
    ],
  },
  {
    label: "Products",
    children: [
      { label: "Stocks", href: "#" },
      { label: "Options", href: "#" },
      { label: "Futures", href: "#" },
    ],
  },
  {
    label: "Platforms",
    children: [
      { label: "Trader Workstation", href: "#" },
      { label: "Mobile", href: "#" },
    ],
  },
  {
    label: "Accounts",
    children: [
      { label: "Individual", href: "#" },
      { label: "Advisors", href: "#" },
    ],
  },
  {
    label: "Pricing",
    children: [
      { label: "Commissions", href: "#" },
      { label: "Margin Rates", href: "#" },
    ],
  },
  {
    label: "Education",
    children: [
      { label: "Traders' Academy", href: "#" },
      { label: "Webinars", href: "#" },
    ],
  },
  {
    label: "Support",
    children: [
      { label: "Contact Us", href: "#" },
      { label: "Help Center", href: "#" },
    ],
  },
  {
    label: "About Us",
    children: [
      { label: "Company", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Icons                                                                      */
/* -------------------------------------------------------------------------- */

function Chevron({
  open = false,
  className = "",
}: {
  open?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden="true"
      className={`h-3 w-3 shrink-0 transition-transform duration-200 ${
        open ? "rotate-180" : ""
      } ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 4.25 6 8l4-3.75" />
    </svg>
  );
}

function TranslateIcon({ className = "" }: { className?: string }) {
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
      <path d="M3 5h9M7.5 3v2M5 5c.4 3 2.4 5.6 5.5 7M10.5 5c-.5 3.4-3 6.2-6.5 7.5" />
      <path d="m12.5 21 4.25-10 4.25 10M13.9 17.7h5.7" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      {open ? (
        <path d="M6 6l12 12M18 6 6 18" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" />
      )}
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Logo                                                                       */
/* -------------------------------------------------------------------------- */

function Logo({ className = "" }: { className?: string }) {
  return (
    <a
      href="/"
      aria-label="Interactive Brokers home"
      className={`inline-flex items-center gap-1.5 text-white ${className}`}
    >
      <svg
        viewBox="0 0 32 40"
        aria-hidden="true"
        className="h-8 w-auto sm:h-10"
      >
        <path
          d="M17.5 0 5.2 17.2c-1.1 1.6-1.6 3.1-1.6 4.6 0 3.3 2.1 5.7 5.2 6.4L11 40l-2.5-9.4c-1.8-.3-3.2-1.5-3.2-3.5 0-1.1.5-2.3 1.5-3.8L17.5 0Z"
          fill="#E1161F"
        />
        <path
          d="M12.8 21.3c-1.2 1.7-1.6 2.9-1.6 4 0 2 1.2 3.4 3.4 3.4h4.9c3.4 0 5.7-2.2 5.7-5.1 0-1.8-.8-3.4-2.4-4.7L17.5 12l-4.7 9.3Z"
          fill="#E1161F"
        />
        <path
          d="M9.6 28.4c.7.1 1.5.1 2.2.1h2.4l-3.6 5.6-1-5.7Z"
          fill="#A60F17"
        />
      </svg>

      <span className="select-none text-[22px] leading-none tracking-tight sm:text-[30px]">
        <span className="font-bold">Interactive</span>
        <span className="font-normal">Brokers</span>
      </span>
    </a>
  );
}

/* -------------------------------------------------------------------------- */
/* Desktop dropdown item                                                      */
/* -------------------------------------------------------------------------- */

function DesktopItem({
  item,
  open,
  onOpen,
  onClose,
  onNavigate,
}: {
  item: NavItem;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onNavigate: () => void;
}) {
  const menuId = useId();
  const hasChildren = !!item.children?.length;

  const base =
    "group inline-flex items-center gap-2 whitespace-nowrap rounded px-1 py-2 text-[15px] font-medium text-white/95 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E1161F]";

  if (!hasChildren) {
    return (
      <li>
        <a
          href={item.href ?? "#"}
          className={base}
          onClick={onNavigate}
        >
          {item.label}
        </a>
      </li>
    );
  }

  return (
    <li
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <button
        type="button"
        className={base}
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={() => (open ? onClose() : onOpen())}
        onFocus={onOpen}
      >
        {item.label}

        <Chevron open={open} className="text-white/80" />
      </button>

      <div
        id={menuId}
        className={`absolute left-1/2 top-full z-50 min-w-[200px] -translate-x-1/2 pt-2 transition duration-150 ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1 opacity-0 pointer-events-none"
        }`}
      >
        <ul className="overflow-hidden rounded-md border border-white/10 bg-[#1f2329] py-1 shadow-2xl shadow-black/50">
          {item.children!.map((child) => (
            <li key={child.label}>
              <a
                href={child.href}
                onClick={onNavigate}
                className="block px-4 py-2.5 text-sm text-white/85 transition-colors hover:bg-white/5 hover:text-white focus-visible:bg-white/10 focus-visible:outline-none"
              >
                {child.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

/* -------------------------------------------------------------------------- */
/* NavBar                                                                     */
/* -------------------------------------------------------------------------- */

export default function NavBar({
  items = DEFAULT_ITEMS,
  onLogin,
  onOpenAccount,
  onLanguageClick,
  className = "",
}: NavBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDesktop, setOpenDesktop] = useState<string | null>(null);
  const [openMobile, setOpenMobile] = useState<string | null>(null);

  const navRef = useRef<HTMLElement>(null);
  const drawerId = useId();
  const mobilePanelId = useId();

  /* ------------------------------------------------------------------------ */
  /* Close menus when clicking outside                                       */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenDesktop(null);
        setOpenMobile(null);
        setMobileOpen(false);
      }
    };

    const onClick = (event: MouseEvent) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        setOpenDesktop(null);
        setOpenMobile(null);
        setMobileOpen(false);
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  /* ------------------------------------------------------------------------ */
  /* Lock body scrolling when mobile drawer is open                           */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  /* ------------------------------------------------------------------------ */
  /* Close menus when navigating                                              */
  /* ------------------------------------------------------------------------ */

  const closeMenus = () => {
    setOpenDesktop(null);
    setOpenMobile(null);
    setMobileOpen(false);
  };

  /* ------------------------------------------------------------------------ */
  /* Button styles                                                            */
  /* ------------------------------------------------------------------------ */

  const loginBtn =
    "inline-flex h-10 items-center justify-center border border-[#E1161F] px-5 text-[15px] text-[#E1161F] transition-colors hover:bg-[#E1161F]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white cursor-pointer";

  const openBtn =
    "inline-flex h-10 items-center justify-center border border-[#E1161F] bg-[#E1161F] px-5 text-[15px] font-medium text-[#1a0507] transition-colors hover:bg-[#f01b25] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white cursor-pointer";

  /* ------------------------------------------------------------------------ */
  /* Render                                                                   */
  /* ------------------------------------------------------------------------ */

  return (
    <header
      className={`relative w-full bg-[#181b20] font-sans text-white antialiased ${className}`}
    >
      <nav
        ref={navRef}
        aria-label="Main"
        className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8"
      >
        {/* Top row */}

        <div className="flex items-center justify-between gap-4 py-4 lg:items-start lg:py-0 lg:pt-8">
          <Logo className="lg:mt-0" />

          {/* Desktop action buttons */}

          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              onClick={onLogin}
              className={loginBtn}
            >
              Log In
            </button>

            <button
              type="button"
              onClick={onOpenAccount}
              className={openBtn}
            >
              Open Account
            </button>
          </div>

          {/* Mobile controls */}

          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={onOpenAccount}
              className={`${openBtn} !h-9 !px-3 !text-sm`}
            >
              Open Account
            </button>

            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls={drawerId}
              onClick={() => {
                setMobileOpen((previous) => !previous);
                setOpenMobile(null);
              }}
              className="inline-flex h-10 w-10 items-center justify-center rounded text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E1161F]"
            >
              <MenuIcon open={mobileOpen} />
            </button>
          </div>
        </div>

        {/* Desktop navigation */}

        <div className="hidden items-center justify-end gap-8 pb-4 pt-3 lg:flex">
          <ul className="flex items-center gap-x-7 xl:gap-x-10">
            {items.map((item) => (
              <DesktopItem
                key={item.label}
                item={item}
                open={openDesktop === item.label}
                onOpen={() => setOpenDesktop(item.label)}
                onClose={() =>
                  setOpenDesktop((current) =>
                    current === item.label ? null : current
                  )
                }
                onNavigate={closeMenus}
              />
            ))}
          </ul>

          <button
            type="button"
            aria-label="Change language"
            onClick={onLanguageClick}
            className="inline-flex h-7 w-10 items-center justify-center rounded-md border border-white/70 text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E1161F]"
          >
            <TranslateIcon className="h-[18px] w-[18px]" />
          </button>
        </div>

        {/* Mobile drawer */}

        <div
          id={drawerId}
          className={`lg:hidden ${
            mobileOpen ? "block" : "hidden"
          } absolute inset-x-0 top-full z-50 max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-white/10 bg-[#181b20] shadow-2xl shadow-black/60`}
        >
          <ul className="px-4 py-2 sm:px-6">
            {items.map((item, index) => {
              const isOpen = openMobile === item.label;
              const panelId = `${mobilePanelId}-${index}`;

              return (
                <li
                  key={item.label}
                  className="border-b border-white/10 last:border-b-0"
                >
                  {item.children?.length ? (
                    <>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() =>
                          setOpenMobile(
                            isOpen ? null : item.label
                          )
                        }
                        className="flex w-full items-center justify-between py-4 text-left text-base font-medium"
                      >
                        {item.label}

                        <Chevron
                          open={isOpen}
                          className="h-4 w-4"
                        />
                      </button>

                      <ul
                        id={panelId}
                        className={`${
                          isOpen ? "block" : "hidden"
                        } pb-3 pl-3`}
                      >
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <a
                              href={child.href}
                              onClick={closeMenus}
                              className="block py-2.5 text-[15px] text-white/75 transition-colors hover:text-white"
                            >
                              {child.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <a
                      href={item.href ?? "#"}
                      onClick={closeMenus}
                      className="block py-4 text-base font-medium"
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Mobile bottom actions */}

          <div className="flex items-center gap-3 border-t border-white/10 px-4 py-4 sm:px-6">
            <button
              type="button"
              onClick={() => {
                closeMenus();
                onLogin?.();
              }}
              className={`${loginBtn} flex-1`}
            >
              Log In
            </button>

            <button
              type="button"
              aria-label="Change language"
              onClick={() => {
                closeMenus();
                onLanguageClick?.();
              }}
              className="inline-flex h-10 w-12 items-center justify-center rounded-md border border-white/70 text-white transition-colors hover:bg-white/10"
            >
              <TranslateIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
