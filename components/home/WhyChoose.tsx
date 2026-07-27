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
        title="Why traders choose Game of Forex."
        intro="Real funding, transparent rules, and the tools to trade them — not a highlight reel of numbers."
        align="center"
      />

      <div className="mx-auto mt-14 grid max-w-6xl gap-4 md:grid-cols-3">
        {/* Row 1 — the visual cards */}
        <Reveal as="div">
          <Card>
            <CardHead
              title="Your account, at a glance"
              sub="Balance, drawdown and target progress — live, in one view."
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
              sub="Funded accounts on real capital — your fills reach the live market."
            />
            <CommunityOrbit />
          </Card>
        </Reveal>

        <Reveal as="div" delay={0.16}>
          <Card>
            {/* NEEDS CLIENT INPUT — payout schedule is unconfirmed (§8). */}
            <CardHead
              title="Get paid daily"
              sub="Request your split as often as every trading day."
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

function CommunityOrbit() {
  // Stock placeholders (randomuser.me) — NEEDS CLIENT PHOTOS before launch (§4).
  const photos = [
    "https://randomuser.me/api/portraits/men/32.jpg",
    "https://randomuser.me/api/portraits/women/44.jpg",
    "https://randomuser.me/api/portraits/men/54.jpg",
    "https://randomuser.me/api/portraits/women/68.jpg",
    "https://randomuser.me/api/portraits/men/76.jpg",
    "https://randomuser.me/api/portraits/women/12.jpg",
  ];
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
        {/* website icon (blue circle + white G) in the middle */}
        <span className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gradient-to-br from-[#3D74FF] to-[#1B45D8] shadow-[0_0_34px_-4px_rgb(59_99_255/0.85)]">
          <span className="font-[Arial,Helvetica,sans-serif] text-2xl font-black leading-none text-white">
            G
          </span>
        </span>
        <div className="anim-orbit absolute inset-0">
          {photos.map((src, i) => {
            const angle = (i / photos.length) * 2 * Math.PI;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            return (
              <span
                key={i}
                className="absolute left-1/2 top-1/2"
                style={{ transform: `translate(-50%, -50%) translate(${x}px, ${y}px)` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  width={40}
                  height={40}
                  loading="lazy"
                  className="anim-orbit-rev size-10 rounded-full object-cover shadow-[0_0_0_1px_rgb(255_255_255/0.12)] ring-1 ring-[var(--accent)]/25"
                />
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
  // Proper candlesticks (wick + body) on a rising trend — the faint backdrop.
  const N = 13;
  const candles = Array.from({ length: N }, (_, i) => {
    const base = 150 - i * 7.5; // rising trend
    const up = i % 3 !== 1;
    const bodyH = 14 + (i % 4) * 6;
    const wickH = bodyH + 20;
    return { x: 16 + i * 24, base, bodyH, wickH, up };
  });
  return (
    <div className="relative mt-6 flex-1 overflow-hidden rounded-[var(--radius)] border border-[var(--border-subtle)] bg-[var(--bg-base)]/60 p-4">
      {/* faint candlestick chart */}
      <svg
        aria-hidden
        viewBox="0 0 320 190"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full opacity-40"
      >
        {candles.map((c, i) => {
          const color = c.up ? "var(--market-up)" : "var(--market-down)";
          return (
            <g key={i}>
              <line
                x1={c.x}
                y1={c.base - c.wickH / 2}
                x2={c.x}
                y2={c.base + c.wickH / 2}
                stroke={color}
                strokeWidth="1.5"
              />
              <rect
                x={c.x - 4.5}
                y={c.base - c.bodyH / 2}
                width="9"
                height={c.bodyH}
                rx="2"
                fill={color}
              />
            </g>
          );
        })}
      </svg>
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
