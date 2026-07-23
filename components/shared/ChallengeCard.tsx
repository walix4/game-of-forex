import Link from "next/link";
import { CtaButton } from "@/components/shared/CtaButton";
import { RULES, usd, amountOf, type Challenge } from "@/lib/challenges";
import { cn } from "@/lib/utils";

/**
 * Challenge product card. `emphasis` renders the mint FILL buy button (used on
 * pages where this card is the primary action). Elsewhere pass emphasis={false}
 * so only one mint fill shows per viewport (§3 rule 1).
 */
export function ChallengeCard({
  challenge,
  emphasis = false,
}: {
  challenge: Challenge;
  emphasis?: boolean;
}) {
  const { size, price, popular, slug } = challenge;
  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-[var(--radius-lg)] p-7",
        popular
          ? "ring-accent glass glow-mint"
          : "glass-card",
      )}
    >
      {popular && (
        <span className="absolute -top-3 left-7 rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-semibold text-[var(--text-on-accent)]">
          Most popular
        </span>
      )}

      <p className="text-sm text-[var(--text-muted)]">Account size</p>
      <p className="tabular font-display text-3xl font-semibold text-[var(--text-primary)]">
        {usd(size)}
      </p>

      <div className="mt-5 flex items-baseline gap-1.5">
        <span className="tabular text-2xl font-semibold text-[var(--accent)]">
          {usd(price)}
        </span>
        <span className="text-sm text-[var(--text-muted)]">one-time</span>
      </div>

      <dl className="mt-6 space-y-2.5 border-t border-[var(--border-subtle)] pt-5 text-sm">
        <Row label="Phase 1 target" value={usd(amountOf(size, RULES.phase1Target))} />
        <Row label="Phase 2 target" value={usd(amountOf(size, RULES.phase2Target))} />
        <Row label="Max daily loss" value={usd(amountOf(size, RULES.maxDailyLoss))} />
        <Row label="Max total loss" value={usd(amountOf(size, RULES.maxTotalLoss))} />
        <Row label="Profit split" value={`${RULES.profitSplit}%`} />
      </dl>

      <div className="mt-7 flex flex-col gap-2">
        {emphasis ? (
          <CtaButton href={`/challenges/${slug}`} variant="primary" className="w-full">
            Buy {usd(size)}
          </CtaButton>
        ) : (
          <CtaButton href={`/challenges/${slug}`} variant="secondary" className="w-full">
            View challenge
          </CtaButton>
        )}
        <Link
          href={`/challenges/${slug}`}
          className="text-center text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]"
        >
          Full rules →
        </Link>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-[var(--text-muted)]">{label}</dt>
      <dd className="tabular text-[var(--text-primary)]">{value}</dd>
    </div>
  );
}
