import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/shared/Reveal";
import { CtaButton } from "@/components/shared/CtaButton";
import { RiskDisclosure } from "@/components/shared/RiskDisclosure";

/**
 * Single closing CTA (§5.8): one action, risk disclosure adjacent. The accent
 * FILL here is never on screen with the hero's, so §3 rule 1 holds. Account-size
 * chips reflect the real offer structure (§0) — outline pills, never a second
 * fill that could read as a competing primary. Figures use `.tabular` (§3).
 */
const ACCOUNT_SIZES = ["$10K", "$25K", "$50K", "$100K", "$200K"];

export function ClosingCta() {
  return (
    <section className="relative isolate overflow-hidden py-24 sm:py-32">
      <div
        className="glow-hero pointer-events-none absolute inset-0 -z-10 opacity-80"
        aria-hidden
      />
      <Container>
        <Reveal>
          <div className="ring-accent glass relative mx-auto max-w-4xl overflow-hidden rounded-[var(--radius-xl)] px-6 py-14 text-center sm:px-14 sm:py-20">
            {/* faint grid, faded toward the edges */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10"
              style={{
                backgroundImage:
                  "linear-gradient(rgb(255 255 255 / 0.045) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.045) 1px, transparent 1px)",
                backgroundSize: "46px 46px",
                maskImage:
                  "radial-gradient(120% 80% at 50% 0%, #000 25%, transparent 72%)",
                WebkitMaskImage:
                  "radial-gradient(120% 80% at 50% 0%, #000 25%, transparent 72%)",
              }}
            />
            {/* accent glow pooling from the top edge */}
            <div
              aria-hidden
              className="glow-hero pointer-events-none absolute inset-x-0 -top-1/2 -z-10 h-3/4 opacity-70"
            />

            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--bg-frame)]/50 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.12em] text-[var(--text-secondary)]">
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
              />
              Two-phase evaluation
            </span>

            <h2 className="mt-6 font-display text-4xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] sm:text-5xl">
              Prove your edge. <span className="text-gradient">Get funded.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[var(--text-secondary)] sm:text-lg">
              Pick a size, pass both phases, and trade our capital. Your split
              starts with the first payout.
            </p>

            <div
              className="mt-8 flex flex-wrap items-center justify-center gap-2.5"
              aria-label="Available account sizes"
            >
              {ACCOUNT_SIZES.map((size) => (
                <span
                  key={size}
                  className="tabular rounded-full border border-[var(--border-default)] bg-[var(--bg-frame)]/30 px-3.5 py-1.5 text-sm text-[var(--text-secondary)]"
                >
                  {size}
                </span>
              ))}
            </div>

            <div className="mt-9 flex justify-center">
              <CtaButton href="/challenges" variant="primary" className="group">
                Buy challenge
              </CtaButton>
            </div>

            <p className="mt-6 text-sm text-[var(--text-muted)]">
              Profit split from your first payout · Transparent rules, shown
              before you buy
            </p>

            {/* §4 — risk note stays adjacent to the purchase CTA; client asked
                for minimal, so the banner became this quiet inline line. */}
            <RiskDisclosure
              variant="inline"
              className="mx-auto mt-8 max-w-xl text-center"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
