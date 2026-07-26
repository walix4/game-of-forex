import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/shared/Reveal";

/**
 * Founder hero — the trader, not the lifestyle (§4: no net-worth claims, no
 * income framing). Bio copy is placeholder until the client supplies a
 * verified account; the portrait is the client-owned photo already used on
 * the home hero.
 */
export function FounderHero() {
  return (
    <header className="relative isolate overflow-hidden pt-16 sm:pt-24">
      <div
        className="glow-hero pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 opacity-60"
        aria-hidden
      />
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-[var(--accent)]">
              About
            </p>
            <h1 className="font-display text-4xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] sm:text-5xl">
              The trader behind{" "}
              <span className="text-gradient">Game of Forex.</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[var(--text-secondary)]">
              Waqas Ahmed is a Pakistan-based forex trader who built the Game of
              Forex community — and turned it into a prop firm designed around
              real funded accounts and transparent rules.
            </p>

            <div className="mt-7 space-y-5 text-[var(--text-secondary)]">
              {/* NEEDS CLIENT INPUT — verified founder bio. No net-worth / income
                  claims (§4). Placeholder copy below. */}
              <p>
                This page will carry a verified account of Waqas Ahmed and why
                he built Game of Forex — the gap he saw between prop firms that
                &ldquo;fund&rdquo; on demo infrastructure and a model built on
                real capital. The text here is placeholder and will be replaced
                with facts the client can stand behind.
              </p>
              <p>
                What won&apos;t change is the standard: transparent rules, a
                real funding model, and a community that trades together. Game
                of Forex is a challenge provider — not a broker, not regulated,
                and not a source of financial advice.
              </p>
            </div>

            {/* factual descriptors only — never stats or outcomes (§4) */}
            <ul className="mt-7 flex flex-wrap gap-2">
              {["Founder", "Pakistan-based", "Community-first"].map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-[var(--border-default)] bg-[var(--bg-frame)]/40 px-3.5 py-1.5 text-xs font-medium text-[var(--text-secondary)]"
                >
                  {chip}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.06}>
            <figure className="relative mx-auto w-full max-w-md">
              <div
                className="glow-mint absolute inset-0 rounded-[var(--radius-xl)] opacity-40"
                aria-hidden
              />
              <div className="relative overflow-hidden rounded-[var(--radius-xl)] glass p-2">
                <div className="relative aspect-square overflow-hidden rounded-[var(--radius-lg)]">
                  <Image
                    src="/waqas-hero.png"
                    alt="Waqas Ahmed, founder of Game of Forex"
                    fill
                    sizes="(max-width: 1024px) 100vw, 448px"
                    className="object-cover"
                    priority
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)]/85 via-transparent to-transparent"
                  />
                </div>
                <figcaption className="absolute inset-x-2 bottom-2 flex items-center justify-between rounded-b-[var(--radius-lg)] p-4">
                  <span className="font-display text-base font-semibold text-[var(--text-primary)]">
                    Waqas Ahmed
                  </span>
                  <span className="rounded-full border border-[var(--border-default)] bg-[var(--bg-frame)]/70 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.1em] text-[var(--text-secondary)]">
                    Founder
                  </span>
                </figcaption>
              </div>
            </figure>
          </Reveal>
        </div>
      </Container>
    </header>
  );
}
