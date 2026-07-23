import Link from "next/link";
import { CtaButton } from "@/components/shared/CtaButton";
import { RULES, usd, amountOf } from "@/lib/challenges";

/**
 * Dashboard overview — DESIGN MOCKUP with fabricated-but-labelled figures
 * (CLAUDE.md §0). No real account, no live data. Numbers are illustrative.
 */

// Mock active account.
const ACC = {
  size: 100_000,
  phase: 1,
  balance: 106_200,
  startBalance: 100_000,
  profit: 6_200,
  tradingDays: 6,
  dailyLossUsed: 1.8, // %
  totalLossUsed: 0, // %
  login: "51042287",
  server: "GameOfForex-Live",
};

function Bar({
  value,
  max,
  tone,
}: {
  value: number;
  max: number;
  tone: "up" | "down";
}) {
  const pctW = Math.min(100, Math.max(0, (value / max) * 100));
  const color = tone === "up" ? "var(--market-up)" : "var(--market-down)";
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--bg-inset)]">
      <div
        className="h-full rounded-full"
        style={{ width: `${pctW}%`, background: color }}
      />
    </div>
  );
}

function StatTile({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-raised)] p-5">
      <p className="text-xs uppercase tracking-[0.1em] text-[var(--text-muted)]">{label}</p>
      <p className="tabular mt-2 font-display text-2xl font-semibold text-[var(--text-primary)]">
        {value}
      </p>
      {sub && <p className="tabular mt-1 text-xs text-[var(--text-muted)]">{sub}</p>}
    </div>
  );
}

export default function DashboardPage() {
  const targetAmt = amountOf(ACC.size, RULES.phase1Target);
  const targetProgress = (ACC.profit / targetAmt) * 100;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
            Welcome back, Waqas
          </h1>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Here&apos;s where your evaluation stands.
          </p>
        </div>
        <CtaButton href="/challenges" variant="secondary" className="h-10 px-5 text-sm">
          Buy another challenge
        </CtaButton>
      </div>

      {/* Active account */}
      <section
        id="challenges"
        className="ring-accent glass rounded-[var(--radius-xl)] p-6 sm:p-8"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="tabular font-display text-xl font-semibold text-[var(--text-primary)]">
              {usd(ACC.size)} Challenge
            </span>
            <span className="rounded-full bg-[var(--warning-bg)] px-2.5 py-1 text-xs font-medium text-[var(--warning)]">
              Phase {ACC.phase} · in progress
            </span>
          </div>
          <span className="tabular text-sm text-[var(--text-muted)]">
            Login {ACC.login} · {ACC.server}
          </span>
        </div>

        {/* profit target progress */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--text-secondary)]">Profit target</span>
            <span className="tabular text-[var(--text-primary)]">
              {usd(ACC.profit)} / {usd(targetAmt)}
            </span>
          </div>
          <div className="mt-2">
            <Bar value={ACC.profit} max={targetAmt} tone="up" />
          </div>
          <p className="tabular mt-1.5 text-xs text-[var(--market-up)]">
            {targetProgress.toFixed(0)}% of Phase {ACC.phase} target
          </p>
        </div>

        {/* loss usage */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--text-secondary)]">Daily loss used</span>
              <span className="tabular text-[var(--text-primary)]">
                {ACC.dailyLossUsed}% / {RULES.maxDailyLoss}%
              </span>
            </div>
            <div className="mt-2">
              <Bar value={ACC.dailyLossUsed} max={RULES.maxDailyLoss} tone="down" />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--text-secondary)]">Overall loss used</span>
              <span className="tabular text-[var(--text-primary)]">
                {ACC.totalLossUsed}% / {RULES.maxTotalLoss}%
              </span>
            </div>
            <div className="mt-2">
              <Bar value={ACC.totalLossUsed} max={RULES.maxTotalLoss} tone="down" />
            </div>
          </div>
        </div>
      </section>

      {/* stat tiles */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Balance" value={usd(ACC.balance)} />
        <StatTile label="Profit" value={usd(ACC.profit)} sub={`+${((ACC.profit / ACC.startBalance) * 100).toFixed(1)}%`} />
        <StatTile label="Trading days" value={`${ACC.tradingDays}`} sub={`min ${RULES.minTradingDays}`} />
        <StatTile label="Profit split" value={`${RULES.profitSplit}%`} sub="on funding" />
      </div>

      {/* credentials + rules */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-raised)] p-6">
          <h2 className="font-display text-lg font-semibold text-[var(--text-primary)]">
            Account credentials
          </h2>
          <dl className="mt-4 space-y-2.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-[var(--text-muted)]">Login</dt>
              <dd className="tabular text-[var(--text-primary)]">{ACC.login}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[var(--text-muted)]">Server</dt>
              <dd className="tabular text-[var(--text-primary)]">{ACC.server}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[var(--text-muted)]">Password</dt>
              <dd className="tabular text-[var(--text-primary)]">••••••••</dd>
            </div>
          </dl>
          {/* Mock — no real file. */}
          <button className="mt-5 inline-flex h-10 items-center rounded-[var(--radius)] border border-[var(--border-default)] px-4 text-sm text-[var(--text-primary)] transition-colors hover:border-[var(--border-accent)]">
            Download credentials
          </button>
        </section>

        <section id="rules" className="rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-raised)] p-6">
          <h2 className="font-display text-lg font-semibold text-[var(--text-primary)]">
            Your rules
          </h2>
          <dl className="mt-4 space-y-2.5 text-sm">
            <Rule label="Phase 1 target" value={usd(targetAmt)} />
            <Rule label="Max daily loss" value={usd(amountOf(ACC.size, RULES.maxDailyLoss))} />
            <Rule label="Max total loss" value={usd(amountOf(ACC.size, RULES.maxTotalLoss))} />
            <Rule label="Min trading days" value={`${RULES.minTradingDays}`} />
            <Rule label="Trading period" value={RULES.tradingPeriod} />
          </dl>
          <Link href="/rules" className="mt-5 inline-block text-sm text-[var(--accent)] hover:text-[var(--accent-hover)]">
            Full rules →
          </Link>
        </section>
      </div>

      <p id="payouts" className="text-xs text-[var(--text-muted)]">
        Design preview — figures are illustrative and no real account is connected.
      </p>
    </div>
  );
}

function Rule({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-[var(--text-muted)]">{label}</dt>
      <dd className="tabular text-[var(--text-primary)]">{value}</dd>
    </div>
  );
}
