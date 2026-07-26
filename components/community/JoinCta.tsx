import { Reveal } from "@/components/shared/Reveal";
import { CtaButton } from "@/components/shared/CtaButton";

/**
 * Closing join CTA — the ONLY accent fill on the page (§3 rule 1).
 * Links are placeholders until the client supplies live invites.
 */
export function JoinCta() {
  return (
    <Reveal>
      <div className="ring-accent glass relative mx-auto max-w-3xl overflow-hidden rounded-[var(--radius-xl)] px-6 py-14 text-center sm:px-12">
        <div
          aria-hidden
          className="glow-hero pointer-events-none absolute inset-x-0 -top-1/2 -z-10 h-3/4 opacity-70"
        />
        <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] sm:text-4xl">
          Pull up a chair.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[var(--text-secondary)]">
          Evaluation or funded, the room is the same — show your work, ask real
          questions, and keep each other sharp.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <CtaButton href="#" variant="primary">
            Join the Discord
          </CtaButton>
          <CtaButton href="#" variant="secondary">
            Open WhatsApp
          </CtaButton>
        </div>
        <p className="mt-6 text-xs text-[var(--text-muted)]">
          {/* NEEDS CLIENT INPUT — live invite links. */}
          Invite links go live once confirmed by the team.
        </p>
      </div>
    </Reveal>
  );
}
