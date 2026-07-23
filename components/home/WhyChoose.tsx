import { Section, SectionHeading } from "@/components/layout/Section";
import { Reveal } from "@/components/shared/Reveal";
import { RULES, usd } from "@/lib/challenges";
import { cn } from "@/lib/utils";

/**
 * Bento "why choose us" grid — looping animated cards (Alpha-Capital-style).
 * COMPLIANCE (§4): no invented growth/user stats. Every figure here is a real
 * product parameter (profit split, account size, symbols, unlimited period) or
 * is clearly a feature illustration. Community avatars are monogram placeholders
 * (NEEDS CLIENT PHOTOS), and no fabricated member/country counts are shown.
 */

const cardBase =
  "relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-[var(--bg-raised)] p-7";

export function WhyChoose() {
  return (
    <Section>
      <SectionHeading
        eyebrow="The advantage"
        title="Why traders choose Game of Forex."
        intro="Real funding, transparent rules, and the tools to trade them — not a highlight reel of numbers."
        align="center"
      />

      <div className="mx-auto mt-14 grid max-w-5xl auto-rows-[minmax(0,1fr)] gap-4 md:grid-cols-3">
        {/* A — analytics (tall) */}
        <Reveal className="md:row-span-2">
          <div className={cn(cardBase, "flex h-full flex-col")}>
            <h3 className="font-display text-xl font-semibold text-[var(--text-primary)]">
              Account analytics
            </h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Track balance, drawdown and target progress in real time.
            </p>
            <AnalyticsChart />
          </div>
        </Reveal>

        {/* B — community orbit (tall, center) */}
        <Reveal className="md:row-span-2">
          <div className={cn(cardBase, "flex h-full flex-col")}>
            <h3 className="font-display text-xl font-semibold text-[var(--text-primary)]">
              A global community
            </h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Trade alongside people, not on your own.
            </p>
            <CommunityOrbit />
          </div>
        </Reveal>

        {/* C — real funding USP */}
        <Reveal>
          <div className={cn(cardBase, "ring-accent glass h-full")}>
            <div className="relative grid size-12 place-items-center">
              <span className="anim-ping-ring absolute inset-0 rounded-full border border-[var(--accent)]" />
              <span className="grid size-12 place-items-center rounded-full bg-[var(--accent-subtle)] text-[var(--accent)]">
                ★
              </span>
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold text-[var(--text-primary)]">
              Real funded accounts
            </h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Our model funds traders on real capital (A-Book) — not a permanent
              demo.
              {/* NEEDS LEGAL SIGN-OFF on the positioning claim (§4). */}
            </p>
          </div>
        </Reveal>

        {/* E — profit split big number */}
        <Reveal>
          <div className={cn(cardBase, "h-full")}>
            <p className="text-sm text-[var(--text-muted)]">Keep up to</p>
            <p className="tabular text-gradient anim-float-slow font-display text-5xl font-semibold">
              {RULES.profitSplit}%
            </p>
            <h3 className="mt-2 font-display text-lg font-semibold text-[var(--text-primary)]">
              Profit split
            </h3>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Paid from your first funded payout.
            </p>
          </div>
        </Reveal>

        {/* D — wide market access marquee (spans full width on md) */}
        <Reveal className="md:col-span-3">
          <div className={cn(cardBase)}>
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div>
                <h3 className="font-display text-lg font-semibold text-[var(--text-primary)]">
                  Wide market access
                </h3>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  Trade the pairs and indices you actually use.
                </p>
              </div>
              <span className="tabular rounded-full border border-[var(--border-subtle)] px-3 py-1 text-xs text-[var(--text-muted)]">
                {RULES.tradingPeriod} period · up to {usd(200_000)}
              </span>
            </div>
            <SymbolMarquee />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ----- animated pieces ----- */

function AnalyticsChart() {
  const bars = [0.5, 0.7, 0.45, 0.9, 0.6, 1, 0.55, 0.8, 0.65, 0.95];
  return (
    <div className="mt-auto">
      <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-subtle)] px-2.5 py-1 text-xs font-medium text-[var(--accent)]">
        <span aria-hidden>↗</span> Live tracking
      </div>
      <div className="rounded-[var(--radius)] border border-[var(--border-subtle)] bg-[var(--bg-base)]/60 p-4">
        <p className="mb-3 text-xs text-[var(--text-muted)]">Performance</p>
        <div className="flex h-24 items-end gap-1.5" aria-hidden>
          {bars.map((h, i) => (
            <span
              key={i}
              className="anim-bar flex-1 rounded-sm bg-gradient-to-t from-[var(--color-mint-600)] to-[var(--color-mint-300)]"
              style={
                {
                  height: `${h * 100}%`,
                  ["--h-from" as string]: h * 0.7,
                  ["--h-to" as string]: 1,
                  animationDelay: `${i * 0.12}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function CommunityOrbit() {
  // Monogram placeholder avatars (NEEDS CLIENT PHOTOS). Orbit on a ring; each
  // avatar counter-rotates so the initials stay upright.
  const people = ["A", "R", "S", "M", "K", "J"];
  const radius = 92;
  return (
    <div className="mt-auto grid place-items-center pb-2 pt-6">
      <div className="relative size-56">
        {/* rings */}
        <span className="absolute inset-0 rounded-full border border-[var(--border-subtle)]" />
        <span className="absolute inset-8 rounded-full border border-[var(--border-subtle)]" />
        {/* center logo */}
        <span className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[var(--accent)] font-display text-sm font-bold text-[var(--text-on-accent)]">
          GF
        </span>
        {/* orbiting avatars */}
        <div className="anim-orbit absolute inset-0">
          {people.map((p, i) => {
            const angle = (i / people.length) * 2 * Math.PI;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            return (
              <span
                key={p}
                className="absolute left-1/2 top-1/2"
                style={{ transform: `translate(-50%, -50%) translate(${x}px, ${y}px)` }}
              >
                <span className="anim-orbit-rev grid size-10 place-items-center rounded-full border border-[var(--border-default)] bg-[var(--bg-frame-alt)] text-xs font-semibold text-[var(--text-primary)]">
                  {p}
                </span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SymbolMarquee() {
  const symbols = [
    "EUR/USD", "GBP/USD", "USD/JPY", "XAU/USD", "AUD/JPY", "NAS100",
    "US500", "GER40", "BTC/USD", "USD/CAD",
  ];
  const loop = [...symbols, ...symbols];
  return (
    <div className="relative mt-5 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <div className="anim-marquee flex w-max gap-2.5">
        {loop.map((s, i) => (
          <span
            key={`${s}-${i}`}
            className="tabular shrink-0 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-base)]/60 px-4 py-2 text-sm text-[var(--text-secondary)]"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
