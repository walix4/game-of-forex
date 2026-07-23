import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/shared/Reveal";
import { CtaButton } from "@/components/shared/CtaButton";
import { RiskDisclosure } from "@/components/shared/RiskDisclosure";

/**
 * Single closing CTA (§5.8): one action, risk disclosure adjacent. The mint FILL
 * here is never on screen with the hero's, so §3 rule 1 holds.
 */
export function ClosingCta() {
  return (
    <section className="relative isolate overflow-hidden py-24 sm:py-32">
      <div className="glow-hero pointer-events-none absolute inset-0 -z-10 opacity-80" aria-hidden />
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] sm:text-5xl">
            Prove your edge. <span className="text-gradient">Get funded.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[var(--text-secondary)] sm:text-lg">
            Choose an account size, pass two phases, and trade real funded capital
            with a profit split from your first payout.
          </p>
          <div className="mt-9 flex justify-center">
            <CtaButton href="/challenges" variant="primary">
              Buy challenge
            </CtaButton>
          </div>
          <div className="mx-auto mt-10 max-w-xl text-left">
            <RiskDisclosure />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
