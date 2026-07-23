import { Section, SectionHeading } from "@/components/layout/Section";
import { Reveal } from "@/components/shared/Reveal";
import { RULES, usd } from "@/lib/challenges";

/**
 * Bento "why choose us" grid — the full Alpha-Capital-style set, lush + animated.
 * COMPLIANCE (§4): no invented growth/user stats. Community avatars are monogram
 * placeholders (NEEDS CLIENT PHOTOS); country/member counts are softened or
 * marked NEEDS CLIENT INPUT; the A-Book claim is NEEDS LEGAL SIGN-OFF.
 */
export function WhyChoose() {
  return (
    <Section id="advantage">
      <SectionHeading
        eyebrow="The advantage"
        title="Why traders choose Game of Forex."
        intro="Real funding, transparent rules, and the tools to trade them — not a highlight reel of numbers."
        align="center"
      />

      <div className="mx-auto mt-14 grid max-w-6xl gap-4 md:grid-cols-3">
        {/* Row 1 — the visual cards */}
        <Reveal as="div">
          <Card>
            <CardHead
              title="Account analytics"
              sub="Balance, drawdown and target progress in real time."
            />
            <AnalyticsChart />
          </Card>
        </Reveal>

        <Reveal as="div" delay={0.08}>
          <Card>
            <CardHead
              title="A global community"
              sub="Trade alongside people, not on your own."
            />
            <CommunityOrbit />
          </Card>
        </Reveal>

        <Reveal as="div" delay={0.16}>
          <Card>
            <CardHead
              title="Real-time insights"
              sub="Market context for smarter decisions."
            />
            <InsightsPanel />
          </Card>
        </Reveal>

        {/* Row 2 */}
        <Reveal as="div" delay={0.06}>
          <Card>
            <CardHead
              title="Global access"
              sub="Trade from wherever you are."
            />
            <FlagTiles />
          </Card>
        </Reveal>

        <Reveal as="div" delay={0.14}>
          <Card>
            <CardHead
              title="Wide market access"
              sub="The pairs and indices you actually use."
            />
            <SymbolGrid />
          </Card>
        </Reveal>

        <Reveal as="div" delay={0.22}>
          <RealFundingCard />
        </Reveal>
      </div>
    </Section>
  );
}

/* ----- shells ----- */
function Card({ children }: { children: React.ReactNode }) {
  return <div className="lush-card flex h-full flex-col p-7">{children}</div>;
}
function CardHead({ title, sub }: { title: string; sub: string }) {
  return (
    <div>
      <h3 className="font-display text-xl font-semibold text-[var(--text-primary)]">
        {title}
      </h3>
      <p className="mt-2 text-sm text-[var(--text-secondary)]">{sub}</p>
    </div>
  );
}

/* ----- card visuals ----- */
function AnalyticsChart() {
  const bars = [0.5, 0.68, 0.44, 0.86, 0.6, 1, 0.56, 0.8, 0.66, 0.94];
  const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O"];
  return (
    <div className="mt-6 flex flex-1 flex-col justify-end">
      <div className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-[var(--accent-subtle)] px-2.5 py-1 text-xs font-medium text-[var(--accent)]">
        <span aria-hidden>↗</span> Live tracking
      </div>
      <div className="relative overflow-hidden rounded-[var(--radius)] border border-[var(--border-subtle)] bg-[var(--bg-base)]/60 p-4">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-6 bottom-0 h-24"
          style={{ background: "var(--glow-accent)" }}
        />
        <p className="relative mb-3 text-xs text-[var(--text-muted)]">Performance</p>
        <div className="relative flex h-24 items-end gap-1.5" aria-hidden>
          {bars.map((h, i) => (
            <span
              key={i}
              className="anim-bar flex-1 rounded-t-sm bg-gradient-to-t from-[var(--color-blue-700)] via-[var(--color-blue-500)] to-[var(--color-blue-300)]"
              style={
                {
                  height: `${h * 100}%`,
                  ["--h-from" as string]: h * 0.72,
                  ["--h-to" as string]: 1,
                  animationDelay: `${i * 0.12}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
        <div className="relative mt-2 flex gap-1.5 text-[0.6rem] text-[var(--text-disabled)]">
          {months.map((m, i) => (
            <span key={i} className="flex-1 text-center">
              {m}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function CommunityOrbit() {
  const people = ["A", "R", "S", "M", "K", "J"];
  const radius = 88;
  return (
    <div className="grid flex-1 place-items-center pt-4">
      <div className="relative size-56">
        <div
          aria-hidden
          className="absolute inset-6 rounded-full opacity-70 blur-2xl"
          style={{ background: "var(--glow-accent)" }}
        />
        <span className="absolute inset-0 rounded-full border border-[var(--border-subtle)]" />
        <span className="absolute inset-10 rounded-full border border-[var(--border-subtle)]" />
        <span className="anim-spin-slow absolute inset-4 rounded-full border border-dashed border-[var(--accent)]/25" />
        <span className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gradient-to-br from-[var(--color-blue-400)] to-[var(--color-blue-600)] font-display text-sm font-bold text-white shadow-[0_0_30px_-4px_rgb(59_99_255/0.8)]">
          GF
        </span>
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
                <span className="anim-orbit-rev grid size-10 place-items-center rounded-full bg-gradient-to-br from-[var(--bg-frame-alt)] to-[var(--bg-frame)] text-xs font-semibold text-[var(--text-primary)] shadow-[0_0_0_1px_rgb(255_255_255/0.12)] ring-1 ring-[var(--accent)]/20">
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

function InsightsPanel() {
  const menu = [
    "Trading opportunity",
    "Volatility analysis",
    "Screener",
    "Market overview",
  ];
  const candles = [
    { up: true, h: 40 }, { up: false, h: 55 }, { up: true, h: 35 },
    { up: true, h: 60 }, { up: false, h: 45 }, { up: true, h: 70 },
    { up: false, h: 50 }, { up: true, h: 65 },
  ];
  return (
    <div className="relative mt-6 flex-1 overflow-hidden rounded-[var(--radius)] border border-[var(--border-subtle)] bg-[var(--bg-base)]/60 p-4">
      {/* faint candles */}
      <div aria-hidden className="absolute inset-0 flex items-center justify-around opacity-30">
        {candles.map((c, i) => (
          <span
            key={i}
            className="w-2 rounded-sm"
            style={{
              height: `${c.h}%`,
              background: c.up ? "var(--market-up)" : "var(--market-down)",
            }}
          />
        ))}
      </div>
      {/* dropdown menu */}
      <div className="relative w-fit rounded-[var(--radius)] border border-[var(--border-default)] bg-[var(--bg-raised)]/90 p-1.5 backdrop-blur-md">
        {menu.map((m, i) => (
          <div
            key={m}
            className={`rounded-[var(--radius-sm)] px-3 py-2 text-sm ${
              i === 0
                ? "bg-[var(--accent-subtle)] text-[var(--accent)]"
                : "text-[var(--text-secondary)]"
            }`}
          >
            {m}
          </div>
        ))}
      </div>
    </div>
  );
}

function FlagTiles() {
  // NEEDS CLIENT INPUT — regions the client actually serves.
  const flags = ["🇬🇧", "🇺🇸", "🇩🇪", "🇵🇰", "🇮🇳", "🇧🇷", "🇵🇭", "🇦🇪", "🇿🇦"];
  return (
    <div className="mt-6 flex flex-1 flex-col justify-center">
      <div className="grid grid-cols-3 gap-2.5">
        {flags.map((f) => (
          <span
            key={f}
            className="grid aspect-square place-items-center rounded-[var(--radius)] border border-[var(--border-subtle)] bg-[var(--bg-base)]/60 text-2xl"
          >
            {f}
          </span>
        ))}
      </div>
    </div>
  );
}

function SymbolGrid() {
  const symbols = [
    "EUR/USD", "GBP/USD", "USD/JPY", "XAU/USD",
    "NAS100", "US500", "GER40", "BTC/USD",
  ];
  return (
    <div className="mt-6 flex flex-1 flex-col justify-center">
      <div className="grid grid-cols-2 gap-2.5">
        {symbols.map((s) => (
          <span
            key={s}
            className="tabular rounded-full border border-[var(--border-subtle)] bg-gradient-to-b from-[var(--bg-raised)] to-[var(--bg-base)]/60 px-4 py-2.5 text-center text-sm text-[var(--text-secondary)]"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

function RealFundingCard() {
  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[var(--radius-xl)] bg-gradient-to-br from-[var(--color-blue-500)] to-[var(--color-blue-700)] p-7 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-white/15 blur-2xl"
      />
      <div className="relative">
        <span className="text-4xl" aria-hidden>🏆</span>
        <h3 className="mt-4 font-display text-xl font-semibold">
          Trade real funded capital
        </h3>
        <p className="mt-2 text-sm text-white/80">
          {/* NEEDS LEGAL SIGN-OFF — A-Book positioning (§4). */}
          Pass the evaluation and trade our capital on real funded accounts.
        </p>
      </div>
      <div className="relative mt-6">
        <p className="tabular font-display text-4xl font-semibold">
          {RULES.profitSplit}%
        </p>
        <p className="text-sm text-white/80">
          profit split · funded up to {usd(200_000)}
        </p>
      </div>
    </div>
  );
}
