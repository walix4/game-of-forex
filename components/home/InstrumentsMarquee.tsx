/**
 * Markets strip — two counter-scrolling rows of instrument pills.
 * Prices/deltas are static ILLUSTRATIVE placeholders (NEEDS CLIENT INPUT /
 * live feed in production via the dashboard, not this strip). Up/down colour
 * uses --market-up/--market-down ONLY (§3 rule 4 — never mint/signal green).
 */

type Instrument = { sym: string; price: string; delta: string; up: boolean };

const ROW_A: Instrument[] = [
  { sym: "EURUSD", price: "1.0842", delta: "+0.12%", up: true },
  { sym: "GBPUSD", price: "1.2718", delta: "−0.08%", up: false },
  { sym: "XAUUSD", price: "2,384.60", delta: "+0.34%", up: true },
  { sym: "USDJPY", price: "153.42", delta: "+0.21%", up: true },
  { sym: "US30", price: "39,118", delta: "−0.15%", up: false },
  { sym: "NAS100", price: "17,682", delta: "+0.42%", up: true },
];

const ROW_B: Instrument[] = [
  { sym: "BTCUSD", price: "64,210", delta: "+1.08%", up: true },
  { sym: "USDCAD", price: "1.3706", delta: "−0.05%", up: false },
  { sym: "AUDUSD", price: "0.6614", delta: "+0.09%", up: true },
  { sym: "XAGUSD", price: "28.14", delta: "−0.27%", up: false },
  { sym: "GER40", price: "18,204", delta: "+0.18%", up: true },
  { sym: "USDCHF", price: "0.8892", delta: "−0.11%", up: false },
];

function Pill({ i }: { i: Instrument }) {
  return (
    <span className="flex shrink-0 items-center gap-3 rounded-full border border-[var(--border-subtle)] bg-white/[0.03] px-5 py-2.5">
      <span className="text-sm font-medium text-[var(--text-primary)]">
        {i.sym}
      </span>
      <span className="tabular text-sm text-[var(--text-secondary)]">
        {i.price}
      </span>
      <span
        className="tabular text-xs font-medium"
        style={{ color: i.up ? "var(--market-up)" : "var(--market-down)" }}
      >
        {i.delta}
      </span>
    </span>
  );
}

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: Instrument[];
  reverse?: boolean;
}) {
  return (
    <div className={`flex w-max gap-3 ${reverse ? "anim-marquee-rev" : "anim-marquee"}`}>
      {/* two copies so the -50% translate loops seamlessly */}
      <div className="flex gap-3 pr-3">
        {items.map((i) => (
          <Pill key={i.sym} i={i} />
        ))}
      </div>
      <div className="flex gap-3 pr-3" aria-hidden>
        {items.map((i) => (
          <Pill key={i.sym} i={i} />
        ))}
      </div>
    </div>
  );
}

export function InstrumentsMarquee() {
  return (
    <section aria-label="Markets" className="relative overflow-hidden py-10 sm:py-14">
      <div
        className="flex flex-col gap-3"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
        }}
      >
        <MarqueeRow items={ROW_A} />
        <MarqueeRow items={ROW_B} reverse />
      </div>
      <p className="mt-4 text-center text-xs text-[var(--text-muted)]">
        {/* NEEDS CLIENT INPUT — replace with a live feed in production. */}
        Illustrative prices — live markets are shown in the dashboard.
      </p>
    </section>
  );
}
