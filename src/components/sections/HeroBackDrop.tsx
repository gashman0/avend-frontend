import { useId, type ReactNode } from "react";

export interface HeroBackdropProps {
  /** Content shown on top of the backdrop (your laptop/phone image, headline, etc.) */
  children?: ReactNode;
  className?: string;
}

interface Streak {
  y: number; // where the streak starts on the outer edge (viewBox units)
  color: string;
  width: number;
  opacity: number;
}

// Base colours sampled from the reference: #15181e background, #d91222 red.
const STREAKS: Streak[] = [
  { y: 250, color: "#2f6bff", width: 2, opacity: 0.45 },
  { y: 320, color: "#ffffff", width: 1.5, opacity: 0.5 },
  { y: 372, color: "#8a1c2b", width: 22, opacity: 0.55 },
  { y: 405, color: "#e1161f", width: 12, opacity: 0.95 },
  { y: 432, color: "#ff4a57", width: 3, opacity: 1 },
  { y: 462, color: "#ffffff", width: 1.5, opacity: 0.7 },
  { y: 492, color: "#e1161f", width: 10, opacity: 0.85 },
  { y: 535, color: "#3b7bff", width: 3, opacity: 0.65 },
  { y: 578, color: "#ffffff", width: 1.5, opacity: 0.4 },
  { y: 625, color: "#7a2cff", width: 2, opacity: 0.4 },
];

const CENTER_Y = 450;
const REACH = 820; // how far a streak travels toward the centre

function StreakPaths({ blurId, softId }: { blurId: string; softId: string }) {
  return (
    <>
      {STREAKS.map((s, i) => {
        // Streaks converge gently toward the vertical centre.
        const endY = CENTER_Y + (s.y - CENTER_Y) * 0.22;
        const d = `M0 ${s.y} C ${REACH * 0.35} ${s.y}, ${REACH * 0.7} ${endY + (s.y - endY) * 0.2}, ${REACH} ${endY}`;
        return (
          <path
            key={i}
            d={d}
            fill="none"
            stroke={s.color}
            strokeWidth={s.width}
            strokeLinecap="round"
            opacity={s.opacity}
            filter={`url(#${s.width > 6 ? blurId : softId})`}
          />
        );
      })}
    </>
  );
}

export default function HeroBackdrop({ children, className = "" }: HeroBackdropProps) {
  const uid = useId().replace(/:/g, "");
  const fade = `fade-${uid}`;
  const blur = `blur-${uid}`;
  const soft = `soft-${uid}`;
  const mask = `mask-${uid}`;

  return (
    <section className={`relative isolate w-full overflow-hidden bg-[#15181e] ${className}`}>
      {/* ------------------------------ Backdrop ------------------------------ */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {/* Soft centre lift + darker bottom, like the reference */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_58%,rgba(60,66,80,0.28),transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-[#0f1115]/80" />

        {/* Light streaks (hidden detail on very small screens, scaled by "slice") */}
        <svg
          className="absolute left-1/2 top-[56%] h-[130%] w-[max(100%,1100px)] -translate-x-1/2 -translate-y-1/2 opacity-70 sm:opacity-90 lg:opacity-100"
          viewBox="0 0 1920 900"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Fades each streak: invisible at the outer edge, brightest near the device */}
            <linearGradient id={fade} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={REACH} y2="0">
              <stop offset="0" stopColor="#fff" stopOpacity="0" />
              <stop offset="0.45" stopColor="#fff" stopOpacity="0.55" />
              <stop offset="0.85" stopColor="#fff" stopOpacity="1" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <filter id={blur} x="-10%" y="-200%" width="120%" height="500%">
              <feGaussianBlur stdDeviation="7" />
            </filter>
            <filter id={soft} x="-10%" y="-200%" width="120%" height="500%">
              <feGaussianBlur stdDeviation="0.8" />
            </filter>
            <mask id={mask} maskUnits="userSpaceOnUse" x="0" y="0" width={REACH} height="900">
              <rect width={REACH} height="900" fill={`url(#${fade})`} />
            </mask>
          </defs>

          {/* Left side */}
          <g mask={`url(#${mask})`}>
            <StreakPaths blurId={blur} softId={soft} />
          </g>

          {/* Right side (mirror) */}
          <g transform="translate(1920 0) scale(-1 1)" mask={`url(#${mask})`}>
            <StreakPaths blurId={blur} softId={soft} />
          </g>
        </svg>

        {/* Edge vignette so streaks melt into #15181e at the sides */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#15181e_0%,transparent_12%,transparent_88%,#15181e_100%)]" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#15181e] to-transparent" />
      </div>

      {/* ------------------------------ Content ------------------------------ */}
      <div className="relative mx-auto flex min-h-[420px] w-full max-w-[1400px] items-center justify-center px-4 py-12 sm:min-h-[560px] sm:px-8 sm:py-16 lg:min-h-[800px]">
        {children}
      </div>
    </section>
  );
}