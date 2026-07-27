import { Section, SectionHeading } from "@/components/layout/Section";
import { Reveal } from "@/components/shared/Reveal";
import { MedalsImage } from "@/components/home/MedalsImage";
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
        title="Why traders pick EZE Funded."
        intro="Real capital behind funded accounts, and rules you can read in full before you pay."
        align="center"
      />

      <div className="mx-auto mt-14 grid max-w-6xl gap-4 md:grid-cols-3">
        {/* Row 1 — the visual cards */}
        <Reveal as="div">
          <Card>
            <CardHead
              title="Your account, at a glance"
              sub="Balance, drawdown and target progress in one live view."
            />
            <AnalyticsChart />
          </Card>
        </Reveal>

        <Reveal as="div" delay={0.08}>
          <Card>
            {/* ⚠️ NEEDS LEGAL SIGN-OFF — "world's first" is an unverifiable
                superlative (§4/§0); shipped on explicit client request. */}
            <CardHead
              title="The world's first A-Book platform"
              sub="Funded accounts run on real capital. Your fills hit the live market."
            />
            <ABookFlow />
          </Card>
        </Reveal>

        <Reveal as="div" delay={0.16}>
          <Card>
            {/* NEEDS CLIENT INPUT — payout schedule is unconfirmed (§8). */}
            <CardHead
              title="Get paid daily"
              sub="Request your split as often as every trading day."
            />
            <PayoutPanel />
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
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];
  return (
    <div className="mt-8 flex flex-1 flex-col justify-end">
      <div className="relative rounded-[var(--radius)] border border-[var(--border-subtle)] bg-[var(--bg-base)]/60 p-4">
        {/* blue "increase" pill, overhanging the top-right */}
        <div className="absolute -top-3.5 right-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-[var(--accent)] px-3 py-1.5 text-xs font-semibold text-white shadow-[0_10px_28px_-6px_rgb(59_99_255/0.85)]">
          {/* NEEDS CLIENT INPUT — performance figure (§4). */}
          <span aria-hidden>↗</span> 28% increase
        </div>
        <p className="mb-3 text-xs text-[var(--text-muted)]">Performance</p>
        {/* dark/monochrome bars, slow gentle animation */}
        <div className="flex h-24 items-end gap-1.5" aria-hidden>
          {bars.map((h, i) => (
            <span
              key={i}
              className="anim-bar flex-1 rounded-t-sm bg-gradient-to-t from-white/[0.05] to-white/[0.18]"
              style={
                {
                  height: `${h * 100}%`,
                  ["--h-from" as string]: h * 0.9,
                  ["--h-to" as string]: 1,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: "5s",
                } as React.CSSProperties
              }
            />
          ))}
        </div>
        <div className="mt-2 flex gap-0.5 text-[0.55rem] text-[var(--text-disabled)]">
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

function ABookFlow() {
  // Order-execution ticket: a terminal-style lifecycle trace — placed, routed,
  // filled in the live market. All values are illustrative mock data.
  const steps = [
    { label: "Order placed", time: "09:42:03.120", done: true },
    { label: "Routed to liquidity", time: "09:42:03.128", done: true },
    { label: "Filled in live market", time: "1.08427", done: true, final: true },
  ];
  return (
    <div className="mt-6 flex flex-1 flex-col justify-center">
      <div className="rounded-[var(--radius)] border border-[var(--border-subtle)] bg-[var(--bg-base)]/60 p-4">
        {/* ticket header */}
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-2.5">
            <span className="font-display text-sm font-semibold text-[var(--text-primary)]">
              EURUSD
            </span>
            <span className="tabular rounded-full bg-[var(--market-up)]/12 px-2 py-0.5 text-[0.65rem] font-semibold text-[var(--market-up)]">
              Buy 1.00
            </span>
          </span>
          <span className="rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-[var(--accent)]">
            A-Book
          </span>
        </div>

        {/* lifecycle timeline */}
        <ul className="mt-4">
          {steps.map((s, i) => (
            <li key={s.label} className="relative flex gap-3 pb-4 last:pb-0">
              {/* connector */}
              {i < steps.length - 1 && (
                <span
                  aria-hidden
                  className="absolute left-[9px] top-5 bottom-0 w-px bg-[var(--border-default)]"
                />
              )}
              {/* dot */}
              <span
                className={`relative z-10 mt-0.5 grid size-[19px] shrink-0 place-items-center rounded-full text-[0.6rem] ${
                  s.final
                    ? "bg-[var(--market-up)]/15 text-[var(--market-up)]"
                    : "bg-white/[0.07] text-[var(--text-muted)]"
                }`}
                aria-hidden
              >
                {s.final && (
                  <span className="anim-ping-ring absolute inset-0 rounded-full border border-[var(--market-up)]/50" />
                )}
                ✓
              </span>
              <span className="flex flex-1 items-baseline justify-between gap-2">
                <span
                  className={`text-sm ${
                    s.final
                      ? "font-medium text-[var(--text-primary)]"
                      : "text-[var(--text-secondary)]"
                  }`}
                >
                  {s.label}
                </span>
                <span
                  className={`tabular text-xs ${
                    s.final
                      ? "font-semibold text-[var(--market-up)]"
                      : "text-[var(--text-muted)]"
                  }`}
                >
                  {s.time}
                </span>
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-3 border-t border-[var(--border-subtle)] pt-2.5 text-center text-[0.6rem] text-[var(--text-muted)]">
          Illustrative execution trace
        </p>
      </div>
    </div>
  );
}

function PayoutPanel() {
  // Daily-payout mock: week strip + recent payout rows. All figures are
  // clearly-fake mock data (§0); schedule NEEDS CLIENT INPUT (§8).
  const days = [
    { d: "Mon", paid: true },
    { d: "Tue", paid: true },
    { d: "Wed", paid: true },
    { d: "Thu", paid: true },
    { d: "Fri", paid: false },
  ];
  const rows = [
    { date: "Thu, Jul 23", amount: "$412.20", status: "Paid" },
    { date: "Wed, Jul 22", amount: "$538.00", status: "Paid" },
    { date: "Fri, Jul 24", amount: "$291.10", status: "Processing" },
  ];
  return (
    <div className="relative mt-6 flex-1 overflow-hidden rounded-[var(--radius)] border border-[var(--border-subtle)] bg-[var(--bg-base)]/60 p-4">
      {/* week cadence strip */}
      <div className="flex items-center justify-between gap-1.5">
        {days.map((day) => (
          <span key={day.d} className="flex flex-1 flex-col items-center gap-1.5">
            <span
              className={`grid size-7 place-items-center rounded-full text-[0.65rem] ${
                day.paid
                  ? "bg-[var(--market-up)]/12 text-[var(--market-up)]"
                  : "border border-dashed border-[var(--border-default)] text-[var(--text-muted)]"
              }`}
              aria-hidden
            >
              {day.paid ? "✓" : "·"}
            </span>
            <span className="text-[0.6rem] text-[var(--text-muted)]">{day.d}</span>
          </span>
        ))}
      </div>

      {/* recent payouts */}
      <div className="mt-4 divide-y divide-[var(--border-subtle)] rounded-[var(--radius)] border border-[var(--border-default)] bg-[var(--bg-raised)]/90 backdrop-blur-md">
        {rows.map((r) => (
          <div key={r.date} className="flex items-center justify-between gap-2 px-3.5 py-2.5">
            <span className="tabular text-xs text-[var(--text-muted)]">{r.date}</span>
            <span className="tabular text-sm font-medium text-[var(--text-primary)]">
              {r.amount}
            </span>
            <span
              className={`rounded-full px-2 py-0.5 text-[0.6rem] font-semibold ${
                r.status === "Paid"
                  ? "bg-[var(--market-up)]/12 text-[var(--market-up)]"
                  : "bg-[var(--accent-subtle)] text-[var(--accent)]"
              }`}
            >
              {r.status}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-3 text-center text-[0.6rem] text-[var(--text-muted)]">
        Mock data — payout schedule to be confirmed
      </p>
    </div>
  );
}

function FlagTiles() {
  // Real flags (flagcdn) in a right-to-left marquee. NEEDS CLIENT INPUT — the
  // actual regions the client serves.
  const rowA = ["gb", "us", "de", "pk", "in", "br", "ph", "ae"];
  const rowB = ["za", "ng", "fr", "jp", "ca", "au", "sa", "id"];
  const tile =
    "grid size-16 shrink-0 place-items-center rounded-[var(--radius)] border border-[var(--border-subtle)] bg-[var(--bg-base)]/60";
  const Row = ({ codes }: { codes: string[] }) => (
    <div className="overflow-hidden">
      <div className="anim-marquee flex w-max gap-2.5">
        {[...codes, ...codes].map((c, i) => (
          <span key={`${c}-${i}`} className={tile}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://flagcdn.com/w80/${c}.png`}
              alt=""
              width={36}
              height={27}
              loading="lazy"
              className="h-7 w-10 rounded-[3px] object-cover shadow-[0_2px_6px_-2px_rgb(0_0_0/0.6)]"
            />
          </span>
        ))}
      </div>
    </div>
  );
  return (
    <div className="mt-6 flex flex-1 flex-col justify-center gap-3 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <Row codes={rowA} />
      <Row codes={rowB} />
    </div>
  );
}

function SymbolGrid() {
  const rows = [
    ["EUR/USD", "GBP/USD", "USD/JPY", "AUD/CHF", "USD/CAD"],
    ["XAU/USD", "NAS100", "US500", "JPN/225", "GER30"],
    ["BTC/USD", "US30", "US/OIL", "USD/CHF", "ETH/USD"],
  ];
  // row 1 → right-to-left, row 2 → left-to-right, row 3 → right-to-left
  const dirs = ["anim-marquee", "anim-marquee-rev", "anim-marquee"];
  const pill =
    "tabular shrink-0 rounded-full border border-[var(--border-subtle)] bg-gradient-to-b from-[var(--bg-raised)] to-[var(--bg-base)]/60 px-5 py-2.5 text-sm text-[var(--text-secondary)]";
  return (
    <div className="mt-6 flex flex-1 flex-col justify-center gap-2.5 [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
      {rows.map((r, ri) => (
        <div key={ri} className="overflow-hidden">
          <div className={`${dirs[ri]} flex w-max gap-2.5`}>
            {[...r, ...r].map((s, i) => (
              <span key={`${ri}-${s}-${i}`} className={pill}>
                {s}
              </span>
            ))}
          </div>
        </div>
      ))}
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
        {/* gold medals if supplied (public/medals.png), else a visible trophy */}
        <MedalsImage className="w-20 lg:w-24" />
        <h3 className="mt-5 font-display text-xl font-semibold">
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
