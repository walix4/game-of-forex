import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/shared/Reveal";

/**
 * The USP: real funded (A-Book) vs demo-funded competitors (CLAUDE.md §0).
 * ⚠️ The comparison and "first / real funded" framing is NEEDS LEGAL SIGN-OFF —
 * it is a competitive claim the client must be able to substantiate (§4).
 */
/** Paired rows so each claim sits directly across from its counterpart. */
const ROWS = [
  {
    aspect: "Capital",
    us: "Funded traders trade real capital in the live market",
    them: "“Funded” accounts often stay on demo/simulation",
  },
  {
    aspect: "Execution",
    us: "A-Book model — your fills are real orders",
    them: "B-Book — your trades may never reach the market",
  },
  {
    aspect: "Transparency",
    us: "Transparent rules, shown before you buy",
    them: "Rules and payout terms buried in fine print",
  },
  {
    aspect: "Payouts",
    us: "Profit split paid on real trading results",
    them: "Only rare traders ever reach real capital",
  },
];

export function FundedUsp() {
  return (
    <Section>
      <Reveal>
        <div className="max-w-2xl">
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
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <div className="ring-accent glass mt-10 overflow-hidden rounded-[var(--radius-lg)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <caption className="sr-only">
                Game of Forex compared with typical prop firms
              </caption>
              <thead>
                <tr className="border-b border-[var(--border-subtle)]">
                  <th
                    scope="col"
                    className="w-[18%] px-6 py-5 text-xs font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]"
                  >
                    <span className="sr-only">Comparison aspect</span>
                  </th>
                  <th
                    scope="col"
                    className="w-[41%] bg-[var(--accent)]/[0.06] px-6 py-5 font-display text-base font-semibold text-[var(--accent)]"
                  >
                    Game of Forex
                  </th>
                  <th
                    scope="col"
                    className="w-[41%] px-6 py-5 font-display text-base font-semibold text-[var(--text-muted)]"
                  >
                    Typical prop firms
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr
                    key={row.aspect}
                    className={
                      i !== 0 ? "border-t border-[var(--border-subtle)]" : undefined
                    }
                  >
                    <th
                      scope="row"
                      className="px-6 py-5 align-top text-xs font-medium uppercase tracking-[0.1em] text-[var(--text-muted)]"
                    >
                      {row.aspect}
                    </th>
                    <td className="bg-[var(--accent)]/[0.06] px-6 py-5 align-top text-sm text-[var(--text-secondary)]">
                      <span className="flex gap-2.5">
                        <span aria-hidden className="mt-0.5 text-[var(--market-up)]">
                          ✓
                        </span>
                        {row.us}
                      </span>
                    </td>
                    <td className="px-6 py-5 align-top text-sm text-[var(--text-muted)]">
                      <span className="flex gap-2.5">
                        <span aria-hidden className="mt-0.5 text-[var(--market-down)]">
                          ✕
                        </span>
                        {row.them}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>

      <p className="mt-4 text-xs text-[var(--text-muted)]">
        {/* NEEDS LEGAL SIGN-OFF — competitive claim to be substantiated. */}
        Positioning claim pending client substantiation and legal review.
      </p>
    </Section>
  );
}
