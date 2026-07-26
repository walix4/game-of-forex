import { RULES } from "@/lib/challenges";

/**
 * "Drawdown, visualised" — presentational equity-curve illustration showing the
 * two loss limits relative to the starting balance. Pure SVG, no data; the real
 * explanation lives in the adjacent text (SVG is aria-hidden). Danger lines use
 * the market-down token (§3 rule 4 — never accent for loss semantics).
 */
export function DrawdownVisual() {
  return (
    <div className="ring-accent glass overflow-hidden rounded-[var(--radius-xl)]">
      <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
        {/* chart panel — aspect ratio reserves space, no CLS */}
        <div className="relative aspect-[2/1] min-h-[260px] w-full lg:aspect-auto lg:min-h-[320px]">
          <style>{`
            .gof-equity-draw {
              stroke-dasharray: 1400;
              stroke-dashoffset: 1400;
              animation: gof-equity-dash 2.6s cubic-bezier(0.22, 1, 0.36, 1) 0.3s forwards;
            }
            @keyframes gof-equity-dash { to { stroke-dashoffset: 0; } }
            @media (prefers-reduced-motion: reduce) {
              .gof-equity-draw { animation: none; stroke-dashoffset: 0; }
            }
          `}</style>
          <svg
            viewBox="0 0 640 320"
            preserveAspectRatio="none"
            aria-hidden
            className="absolute inset-0 h-full w-full"
          >
            <defs>
              <linearGradient id="gof-equity-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-blue-400)" stopOpacity="0.22" />
                <stop offset="100%" stopColor="var(--color-blue-400)" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* faint grid */}
            {[64, 128, 192, 256].map((y) => (
              <line
                key={`h${y}`}
                x1="0"
                y1={y}
                x2="640"
                y2={y}
                stroke="rgb(255 255 255 / 0.05)"
                vectorEffect="non-scaling-stroke"
              />
            ))}
            {[128, 256, 384, 512].map((x) => (
              <line
                key={`v${x}`}
                x1={x}
                y1="0"
                x2={x}
                y2="320"
                stroke="rgb(255 255 255 / 0.05)"
                vectorEffect="non-scaling-stroke"
              />
            ))}

            {/* starting balance */}
            <line
              x1="0"
              y1="160"
              x2="640"
              y2="160"
              stroke="rgb(255 255 255 / 0.28)"
              strokeDasharray="2 6"
              vectorEffect="non-scaling-stroke"
            />
            {/* max daily loss — resets each day, drawn dashed */}
            <line
              x1="0"
              y1="204"
              x2="640"
              y2="204"
              stroke="var(--market-down)"
              strokeOpacity="0.55"
              strokeDasharray="6 6"
              vectorEffect="non-scaling-stroke"
            />
            {/* max total loss — hard floor, solid */}
            <line
              x1="0"
              y1="248"
              x2="640"
              y2="248"
              stroke="var(--market-down)"
              strokeOpacity="0.9"
              vectorEffect="non-scaling-stroke"
            />

            {/* equity path: dips toward the daily limit, never touches, then climbs */}
            <path
              d="M0,160 C48,150 72,178 104,186 C136,194 160,168 192,158 C224,148 248,182 280,178 C312,174 336,138 372,128 C408,118 432,146 468,132 C504,118 536,88 576,72 C600,62 620,58 640,52 L640,320 L0,320 Z"
              fill="url(#gof-equity-fill)"
            />
            <path
              d="M0,160 C48,150 72,178 104,186 C136,194 160,168 192,158 C224,148 248,182 280,178 C312,174 336,138 372,128 C408,118 432,146 468,132 C504,118 536,88 576,72 C600,62 620,58 640,52"
              fill="none"
              stroke="var(--color-blue-400)"
              strokeWidth="2.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              className="gof-equity-draw"
            />
          </svg>

          {/* floating label chips — positioned to match the SVG lines */}
          <span className="pointer-events-none absolute left-4 top-[50%] -translate-y-[calc(100%+6px)] rounded-full border border-[var(--border-subtle)] bg-[var(--bg-frame)]/70 px-2.5 py-1 text-[0.65rem] text-[var(--text-secondary)] backdrop-blur-sm">
            Starting balance
          </span>
          <span className="tabular pointer-events-none absolute right-4 top-[63.75%] -translate-y-[calc(100%+4px)] rounded-full border border-[var(--market-down)]/40 bg-[var(--bg-frame)]/70 px-2.5 py-1 text-[0.65rem] text-[var(--market-down)] backdrop-blur-sm">
            Max daily loss −{RULES.maxDailyLoss}%
          </span>
          <span className="tabular pointer-events-none absolute right-4 top-[77.5%] translate-y-[6px] rounded-full border border-[var(--market-down)]/40 bg-[var(--bg-frame)]/70 px-2.5 py-1 text-[0.65rem] text-[var(--market-down)] backdrop-blur-sm">
            Max total loss −{RULES.maxTotalLoss}%
          </span>
        </div>

        {/* explanation panel */}
        <div className="border-t border-[var(--border-subtle)] p-7 sm:p-9 lg:border-l lg:border-t-0">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--accent)]">
            Drawdown, visualised
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
            Two limits. One account.
          </h2>
          <dl className="mt-6 space-y-5 text-sm leading-relaxed">
            <div>
              <dt className="flex items-center gap-2 font-medium text-[var(--text-primary)]">
                <span
                  aria-hidden
                  className="inline-block h-0 w-5 border-t-2 border-dashed border-[var(--market-down)]/70"
                />
                Daily loss limit
              </dt>
              <dd className="mt-1.5 text-[var(--text-secondary)]">
                Equity may not drop more than {RULES.maxDailyLoss}% below the
                day&apos;s starting balance. It resets every trading day — one bad
                day never has to end the evaluation.
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-2 font-medium text-[var(--text-primary)]">
                <span
                  aria-hidden
                  className="inline-block h-0 w-5 border-t-2 border-[var(--market-down)]"
                />
                Total loss limit
              </dt>
              <dd className="mt-1.5 text-[var(--text-secondary)]">
                The account may never fall more than {RULES.maxTotalLoss}% below
                its starting balance. This is the hard floor — breaching it ends
                the evaluation.
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-2 font-medium text-[var(--text-primary)]">
                <span
                  aria-hidden
                  className="inline-block h-0 w-5 border-t-2 border-[var(--color-blue-400)]"
                />
                Your equity
              </dt>
              <dd className="mt-1.5 text-[var(--text-secondary)]">
                Stay above both lines while working toward the phase target.
                Absolute dollar amounts for every limit are shown on each
                challenge before you buy.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
