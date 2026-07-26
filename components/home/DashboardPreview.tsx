import { Section, SectionHeading } from "@/components/layout/Section";
import { Reveal } from "@/components/shared/Reveal";

/**
 * Dashboard preview — a glass browser frame around a CLEARLY-FAKE account
 * overview (§0 design-mockups-only). Every figure is illustrative, tabular, and
 * stamped with a "Mock data" chip so it can never read as a real account (§4).
 * Chart is a static SVG with a reserved height — nothing here can shift layout.
 */

const CURVE = "0,120 40,112 80,118 120,98 160,104 200,86 240,92 280,70 320,78 360,58 400,64 440,40 480,46";

const TILES = [
  { label: "Win rate", value: "58.3%" },
  { label: "Avg RR", value: "1 : 2.1" },
  { label: "Trading days", value: "9" },
  { label: "Daily loss used", value: "1.8%" },
];

export function DashboardPreview() {
  return (
    <Section>
      <SectionHeading
        eyebrow="The dashboard"
        title="Every metric, in one place."
        intro="Targets, limits and progress tracked live on your account — you always know exactly where you stand."
        align="center"
      />

      <Reveal className="mx-auto mt-12 max-w-4xl">
        <div className="glass overflow-hidden rounded-[var(--radius-xl)]">
          {/* window chrome */}
          <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] px-5 py-3.5">
            <div className="flex gap-1.5" aria-hidden>
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="size-2.5 rounded-full bg-white/15" />
            </div>
            <span className="mx-auto rounded-full border border-[var(--border-subtle)] bg-white/[0.03] px-4 py-1 text-xs text-[var(--text-muted)]">
              gameofforex.com/dashboard
            </span>
            <span className="rounded-full bg-[var(--warning-bg)] px-2.5 py-1 text-[0.65rem] font-medium text-[var(--warning)]">
              Mock data
            </span>
          </div>

          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr]">
            {/* account overview — illustrative figures only */}
            <div>
              <p className="text-xs uppercase tracking-[0.1em] text-[var(--text-muted)]">
                $50K challenge · Phase 1
              </p>
              <p className="tabular mt-2 font-display text-4xl font-semibold text-[var(--text-primary)]">
                $52,140.50
              </p>
              <p className="tabular mt-1 text-sm" style={{ color: "var(--market-up)" }}>
                +$2,140.50 · +4.28%
              </p>

              <div className="mt-6">
                <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                  <span>Profit target</span>
                  <span className="tabular">$2,140 / $5,000</span>
                </div>
                <div
                  className="mt-2 h-2 overflow-hidden rounded-full bg-white/[0.06]"
                  role="progressbar"
                  aria-valuenow={43}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Profit target progress"
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: "43%",
                      background:
                        "linear-gradient(90deg, var(--color-blue-600), var(--color-blue-400))",
                    }}
                  />
                </div>
              </div>

              <dl className="mt-6 grid grid-cols-2 gap-3">
                {TILES.map((t) => (
                  <div
                    key={t.label}
                    className="rounded-[var(--radius)] border border-[var(--border-subtle)] bg-white/[0.03] p-3.5"
                  >
                    <dt className="text-[0.65rem] uppercase tracking-[0.1em] text-[var(--text-muted)]">
                      {t.label}
                    </dt>
                    <dd className="tabular mt-1 font-display text-lg font-semibold text-[var(--text-primary)]">
                      {t.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* equity curve — static SVG, fixed height (no CLS) */}
            <div className="flex flex-col rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-white/[0.02] p-5">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.1em] text-[var(--text-muted)]">
                  Equity
                </p>
                <p className="tabular text-xs text-[var(--text-secondary)]">
                  Last 14 days
                </p>
              </div>
              <svg
                viewBox="0 0 480 160"
                preserveAspectRatio="none"
                className="mt-4 h-48 w-full flex-1"
                aria-hidden
              >
                <defs>
                  <linearGradient id="dp-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" style={{ stopColor: "var(--color-blue-500)", stopOpacity: 0.28 }} />
                    <stop offset="100%" style={{ stopColor: "var(--color-blue-500)", stopOpacity: 0 }} />
                  </linearGradient>
                </defs>
                {/* faint horizontal grid */}
                {[40, 80, 120].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    x2="480"
                    y1={y}
                    y2={y}
                    stroke="rgb(255 255 255 / 0.06)"
                    strokeWidth="1"
                  />
                ))}
                <polygon points={`${CURVE} 480,160 0,160`} fill="url(#dp-fill)" />
                <polyline
                  points={CURVE}
                  fill="none"
                  stroke="var(--color-blue-400)"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
          </div>
        </div>
      </Reveal>

      <p className="mt-5 text-center text-xs text-[var(--text-muted)]">
        Preview with illustrative data — the dashboard is a design mockup.
      </p>
    </Section>
  );
}
