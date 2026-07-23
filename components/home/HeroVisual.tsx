"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Hero visual — a stylised trading terminal. Glass candlesticks, an ascending
 * price line with a teal glow, and floating pair chips. Decorative and honest:
 * no performance figures, just market reference (candles use --market-up /
 * --market-down, never mint — §3 rule 4). Rendered as inline SVG so it stays
 * crisp, themeable via tokens, and light on the LCP budget.
 */

type Candle = {
  cx: number;
  wickTop: number;
  wickBottom: number;
  bodyTop: number;
  bodyBottom: number;
  up: boolean;
};

const CANDLES: Candle[] = [
  { cx: 40, wickTop: 212, wickBottom: 272, bodyTop: 232, bodyBottom: 262, up: true },
  { cx: 84, wickTop: 198, wickBottom: 250, bodyTop: 214, bodyBottom: 244, up: true },
  { cx: 128, wickTop: 202, wickBottom: 256, bodyTop: 224, bodyBottom: 250, up: false },
  { cx: 172, wickTop: 168, wickBottom: 232, bodyTop: 184, bodyBottom: 222, up: true },
  { cx: 216, wickTop: 158, wickBottom: 206, bodyTop: 174, bodyBottom: 200, up: true },
  { cx: 260, wickTop: 172, wickBottom: 216, bodyTop: 184, bodyBottom: 210, up: false },
  { cx: 304, wickTop: 118, wickBottom: 186, bodyTop: 138, bodyBottom: 180, up: true },
  { cx: 348, wickTop: 98, wickBottom: 150, bodyTop: 114, bodyBottom: 146, up: true },
  { cx: 392, wickTop: 78, wickBottom: 128, bodyTop: 94, bodyBottom: 124, up: true },
];

const BODY_W = 20;

// Smooth-ish line across the candle tops (close prices).
const LINE = "M40 240 L84 220 L128 232 L172 190 L216 180 L260 192 L304 146 L348 120 L392 100";
const AREA = `${LINE} L392 300 L40 300 Z`;

const EASE = [0.22, 1, 0.36, 1] as const;

export function HeroVisual() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="relative w-full"
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
    >
      {/* Ambient float */}
      <motion.div
        animate={reduce ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 9, ease: "easeInOut", repeat: Infinity }}
        className="relative rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--bg-raised)]/70 p-4 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur-sm sm:p-5"
      >
        {/* teal glow bloom behind the peak */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-6 -z-10 opacity-80"
          style={{ background: "var(--glow-hero)" }}
        />

        {/* terminal header */}
        <div className="mb-3 flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="tabular text-sm font-semibold text-[var(--text-primary)]">
              EUR/USD
            </span>
            <span className="tabular rounded bg-[var(--market-up-bg)] px-1.5 py-0.5 text-xs font-medium text-[var(--market-up)]">
              ▲ 0.42%
            </span>
          </div>
          <div className="flex gap-1.5" aria-hidden>
            <span className="size-2 rounded-full bg-[var(--border-strong)]" />
            <span className="size-2 rounded-full bg-[var(--border-strong)]" />
            <span className="size-2 rounded-full bg-[var(--accent)]" />
          </div>
        </div>

        <svg
          viewBox="0 0 432 312"
          className="w-full"
          role="img"
          aria-label="Illustrative forex candlestick chart trending upward"
        >
          <defs>
            <linearGradient id="gof-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-blue-500)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="var(--color-blue-500)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="gof-up" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--market-up)" stopOpacity="0.95" />
              <stop offset="100%" stopColor="var(--market-up)" stopOpacity="0.55" />
            </linearGradient>
            <linearGradient id="gof-down" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--market-down)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="var(--market-down)" stopOpacity="0.5" />
            </linearGradient>
            <filter id="gof-soft" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>

          {/* grid */}
          <g stroke="var(--border-subtle)" strokeWidth="1">
            {[60, 110, 160, 210, 260].map((y) => (
              <line key={y} x1="8" y1={y} x2="424" y2={y} />
            ))}
          </g>

          {/* area + line */}
          <path d={AREA} fill="url(#gof-area)" />
          <motion.path
            d={LINE}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#gof-soft)"
            opacity="0.5"
          />
          <motion.path
            d={LINE}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduce ? undefined : { pathLength: 0 }}
            animate={reduce ? undefined : { pathLength: 1 }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.6 }}
          />

          {/* candles — glass bodies with a highlight */}
          {CANDLES.map((c, i) => {
            const fill = c.up ? "url(#gof-up)" : "url(#gof-down)";
            const stroke = c.up ? "var(--market-up)" : "var(--market-down)";
            return (
              <motion.g
                key={c.cx}
                initial={reduce ? undefined : { opacity: 0, y: 10 }}
                animate={reduce ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE, delay: 0.4 + i * 0.05 }}
              >
                <line
                  x1={c.cx}
                  y1={c.wickTop}
                  x2={c.cx}
                  y2={c.wickBottom}
                  stroke={stroke}
                  strokeWidth="1.5"
                  opacity="0.8"
                />
                <rect
                  x={c.cx - BODY_W / 2}
                  y={c.bodyTop}
                  width={BODY_W}
                  height={c.bodyBottom - c.bodyTop}
                  rx="3"
                  fill={fill}
                  stroke={stroke}
                  strokeOpacity="0.5"
                />
                <rect
                  x={c.cx - BODY_W / 2 + 2}
                  y={c.bodyTop + 2}
                  width={3}
                  height={Math.max(4, c.bodyBottom - c.bodyTop - 6)}
                  rx="1.5"
                  fill="#fff"
                  opacity="0.18"
                />
              </motion.g>
            );
          })}

          {/* live dot at the peak */}
          <circle cx="392" cy="100" r="4" fill="var(--accent)" />
          {!reduce && (
            <motion.circle
              cx="392"
              cy="100"
              r="4"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.5"
              initial={{ r: 4, opacity: 0.8 }}
              animate={{ r: 14, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
          )}
        </svg>
      </motion.div>

      {/* Floating pair chips */}
      <FloatingChip
        className="-left-3 top-[42%] sm:-left-7"
        reduce={reduce}
        delay={0.9}
        pair="GBP/USD"
        change="+0.31%"
        up
      />
      <FloatingChip
        className="-right-2 bottom-8 sm:-right-6"
        reduce={reduce}
        delay={1.05}
        pair="USD/JPY"
        change="-0.18%"
        up={false}
      />
    </motion.div>
  );
}

function FloatingChip({
  pair,
  change,
  up,
  className,
  delay,
  reduce,
}: {
  pair: string;
  change: string;
  up: boolean;
  className: string;
  delay: number;
  reduce: boolean | null;
}) {
  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.9, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE, delay }}
      className={`absolute flex items-center gap-2 rounded-[var(--radius)] border border-[var(--border-default)] bg-[var(--bg-frame)]/90 px-3 py-2 shadow-lg backdrop-blur-md ${className}`}
    >
      <span className="tabular text-xs font-semibold text-[var(--text-primary)]">
        {pair}
      </span>
      <span
        className="tabular text-xs font-medium"
        style={{ color: up ? "var(--market-up)" : "var(--market-down)" }}
      >
        {up ? "▲" : "▼"} {change}
      </span>
    </motion.div>
  );
}
