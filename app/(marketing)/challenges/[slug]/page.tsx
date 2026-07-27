import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/shared/Reveal";
import { CtaButton } from "@/components/shared/CtaButton";
import { RiskDisclosure } from "@/components/shared/RiskDisclosure";
import {
  challenges,
  getChallenge,
  RULES,
  usd,
  amountOf,
} from "@/lib/challenges";

export function generateStaticParams() {
  return challenges.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getChallenge(slug);
  if (!c) return { title: "Challenge not found" };
  return {
    title: `${usd(c.size)} Challenge`,
    description: `The ${usd(c.size)} EZE Funded challenge. Two phases, up to ${RULES.profitSplit}% profit split, fee back with your first payout.`,
  };
}

export default async function ChallengeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getChallenge(slug);
  if (!c) notFound();

  const rows: { label: string; value: string }[] = [
    { label: "Account size", value: usd(c.size) },
    { label: "Phase 1 profit target", value: `${usd(amountOf(c.size, RULES.phase1Target))} (${RULES.phase1Target}%)` },
    { label: "Phase 2 profit target", value: `${usd(amountOf(c.size, RULES.phase2Target))} (${RULES.phase2Target}%)` },
    { label: "Maximum daily loss", value: `${usd(amountOf(c.size, RULES.maxDailyLoss))} (${RULES.maxDailyLoss}%)` },
    { label: "Maximum total loss", value: `${usd(amountOf(c.size, RULES.maxTotalLoss))} (${RULES.maxTotalLoss}%)` },
    { label: "Minimum trading days", value: `${RULES.minTradingDays} days` },
    { label: "Trading period", value: RULES.tradingPeriod },
    { label: "Profit split", value: `Up to ${RULES.profitSplit}%` },
    { label: "Refund", value: RULES.refund },
    { label: "Rewards", value: RULES.rewards },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Challenge"
        title={`${usd(c.size)} Challenge`}
        intro="Same rules as every other size. Pass both phases and this becomes your funded account."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_0.55fr]">
          <Reveal>
            <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-subtle)]">
              <table className="w-full text-sm">
                <caption className="sr-only">
                  Trading rules for the {usd(c.size)} challenge
                </caption>
                <tbody>
                  {rows.map((r, i) => (
                    <tr
                      key={r.label}
                      className={i % 2 ? "bg-[var(--bg-raised)]/40" : ""}
                    >
                      <th
                        scope="row"
                        className="px-5 py-3.5 text-left font-normal text-[var(--text-muted)]"
                      >
                        {r.label}
                      </th>
                      <td className="tabular px-5 py-3.5 text-right font-medium text-[var(--text-primary)]">
                        {r.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-8">
              <RiskDisclosure />
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <aside className="ring-accent glass glow-mint sticky top-24 rounded-[var(--radius-lg)] p-7">
              <p className="text-sm text-[var(--text-muted)]">One-time fee</p>
              <p className="tabular font-display text-4xl font-semibold text-[var(--text-primary)]">
                {usd(c.price)}
              </p>
              <ul className="mt-6 space-y-2.5 text-sm text-[var(--text-secondary)]">
                <li className="flex gap-2.5">
                  <span className="text-[var(--market-up)]">✓</span> {usd(c.size)} funded account on passing
                </li>
                <li className="flex gap-2.5">
                  <span className="text-[var(--market-up)]">✓</span> Up to {RULES.profitSplit}% profit split
                </li>
                <li className="flex gap-2.5">
                  <span className="text-[var(--market-up)]">✓</span> {RULES.tradingPeriod} trading period
                </li>
              </ul>
              {/* Design mockup — non-functional. Buy routes to the (mock) login. */}
              <div className="mt-7">
                <CtaButton
                  href={`/login?buy=${c.slug}`}
                  variant="primary"
                  className="w-full"
                >
                  Buy {usd(c.size)} challenge
                </CtaButton>
                <p className="mt-3 text-center text-[0.7rem] text-[var(--text-muted)]">
                  {/* NEEDS BACKEND — payment provider unresolved (Pakistan). */}
                  Checkout is a design preview — no payment is taken.
                </p>
              </div>
              <Link
                href="/challenges"
                className="mt-4 block text-center text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              >
                All challenges
              </Link>
            </aside>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
