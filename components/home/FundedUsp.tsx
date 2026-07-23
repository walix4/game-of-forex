import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/shared/Reveal";

/**
 * The USP: real funded (A-Book) vs demo-funded competitors (CLAUDE.md §0).
 * ⚠️ The comparison and "first / real funded" framing is NEEDS LEGAL SIGN-OFF —
 * it is a competitive claim the client must be able to substantiate (§4).
 */
const US = [
  "Funded traders trade real capital in the live market",
  "A-Book model — your fills are real orders",
  "Transparent rules, shown before you buy",
  "Profit split paid on real trading results",
];

const TYPICAL = [
  "“Funded” accounts often stay on demo/simulation",
  "B-Book — your trades may never reach the market",
  "Rules and payout terms buried in fine print",
  "Only rare traders ever reach real capital",
];

export function FundedUsp() {
  return (
    <Section>
      <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--accent)]">
            Why we&apos;re different
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] sm:text-4xl">
            Real funding, not a{" "}
            <span className="text-gradient">simulation.</span>
          </h2>
          <p className="mt-5 text-[var(--text-secondary)]">
            Most prop firms evaluate — and even &ldquo;fund&rdquo; — traders on
            demo infrastructure. Our long-term model is real funded (A-Book)
            accounts, so a funded trader&apos;s results come from the live market.
          </p>
          <p className="mt-4 text-xs text-[var(--text-muted)]">
            {/* NEEDS LEGAL SIGN-OFF — competitive claim to be substantiated. */}
            Positioning claim pending client substantiation and legal review.
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="ring-accent glass rounded-[var(--radius-lg)] p-6">
              <h3 className="font-display text-base font-semibold text-[var(--accent)]">
                Game of Forex
              </h3>
              <ul className="mt-4 space-y-3">
                {US.map((t) => (
                  <li key={t} className="flex gap-2.5 text-sm text-[var(--text-secondary)]">
                    <span aria-hidden className="mt-0.5 text-[var(--market-up)]">
                      ✓
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-raised)] p-6">
              <h3 className="font-display text-base font-semibold text-[var(--text-muted)]">
                Typical prop firms
              </h3>
              <ul className="mt-4 space-y-3">
                {TYPICAL.map((t) => (
                  <li key={t} className="flex gap-2.5 text-sm text-[var(--text-muted)]">
                    <span aria-hidden className="mt-0.5 text-[var(--market-down)]">
                      ✕
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
