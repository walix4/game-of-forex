import { Section, SectionHeading } from "@/components/layout/Section";
import { Reveal } from "@/components/shared/Reveal";

const STEPS = [
  {
    n: "01",
    title: "Buy a challenge",
    body: "Choose your account size and pay a one-time fee. You get demo login credentials to start the evaluation.",
  },
  {
    n: "02",
    title: "Pass two phases",
    body: "Hit the Phase 1 and Phase 2 profit targets while respecting the daily-loss and total-loss limits. Unlimited time.",
  },
  {
    n: "03",
    title: "Get funded",
    body: "Clear both phases and receive a real funded account. Keep trading and take your share of the profit.",
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works" className="border-y border-[var(--border-subtle)]">
      <SectionHeading
        eyebrow="How it works"
        title="Three steps to funded."
        intro="No subscriptions, no hidden phases. Prove your edge, then trade our capital."
        align="center"
      />

      <ol className="mt-14 grid gap-6 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <Reveal as="li" key={s.n} delay={i * 0.08}>
            <div className="relative h-full rounded-[var(--radius-lg)] glass-card p-8">
              <span
                aria-hidden
                className="text-gradient font-display text-5xl font-semibold"
              >
                {s.n}
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-[var(--text-primary)]">
                {s.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                {s.body}
              </p>
              {i < STEPS.length - 1 && (
                <span
                  aria-hidden
                  className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-2xl text-[var(--accent)] md:block"
                >
                  →
                </span>
              )}
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
