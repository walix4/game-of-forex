import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/shared/Reveal";

/**
 * "How it works" — a taller blue step 01 card, with 02 and 03 as separate dark
 * cards (space between them), vertically centred against 01. A-Book flow (§4).
 */
export function HowItWorks() {
  return (
    <Section id="how-it-works">
      <Reveal>
        <div className="border-l-[3px] border-[var(--accent)] pl-5">
          <p className="text-sm font-semibold text-[var(--text-secondary)]">
            How it works
          </p>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] sm:text-5xl">
            Easy steps to get funded
          </h2>
        </div>
      </Reveal>

      {/* 01 is taller; 02/03 are separate cards centred against it */}
      <div className="mt-12 grid items-center gap-5 lg:grid-cols-[1.15fr_1fr_1fr]">
        {/* Step 01 — blue highlight card (taller) */}
        <Reveal>
          <div className="relative flex h-full min-h-[400px] flex-col overflow-hidden rounded-[var(--radius-xl)] bg-gradient-to-br from-[var(--color-blue-500)] to-[var(--color-blue-700)] p-9 text-white">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-white/15 blur-2xl"
            />
            <span className="grid size-14 place-items-center rounded-full bg-white font-display text-xl font-bold text-[var(--bg-base)]">
              01
            </span>
            <h3 className="mt-8 font-display text-2xl font-semibold">
              Buy a challenge
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/80">
              Choose your account size and get demo login credentials.
            </p>
            <Link
              href="/challenges"
              className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--bg-base)] transition-transform duration-[var(--dur-fast)] hover:translate-x-0.5"
            >
              Buy challenge
            </Link>
          </div>
        </Reveal>

        {/* Step 02 — separate dark card */}
        <Reveal delay={0.08}>
          <DarkStep
            n="02"
            title="Pass two phases"
            body="Hit both profit targets within the loss limits. Unlimited time."
            pill="See the rules"
            href="/rules"
          />
        </Reveal>

        {/* Step 03 — separate dark card */}
        <Reveal delay={0.16}>
          <DarkStep
            n="03"
            title="Get funded"
            body="Clear both phases and trade a real funded account."
            pill="Profit split up to 80%"
          />
        </Reveal>
      </div>
    </Section>
  );
}

function DarkStep({
  n,
  title,
  body,
  pill,
  href,
}: {
  n: string;
  title: string;
  body: string;
  pill: string;
  href?: string;
}) {
  const pillClass =
    "mt-auto inline-flex w-fit items-center rounded-full border border-[var(--border-subtle)] bg-white/[0.04] px-5 py-2.5 text-sm text-[var(--text-secondary)]";
  return (
    <div className="flex h-full flex-col rounded-[var(--radius-xl)] bg-[var(--bg-raised)] p-8">
      <span
        className="grid size-14 place-items-center rounded-full font-display text-xl font-bold text-[var(--accent)]"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgb(59 99 255 / 0.22), transparent 70%), var(--bg-base)",
        }}
      >
        {n}
      </span>
      <h3 className="mt-7 font-display text-2xl font-semibold text-[var(--text-primary)]">
        {title}
      </h3>
      <p className="mt-2 mb-6 text-sm leading-relaxed text-[var(--text-secondary)]">
        {body}
      </p>
      {href ? (
        <Link href={href} className={pillClass}>
          {pill}
        </Link>
      ) : (
        <div className={pillClass}>{pill}</div>
      )}
    </div>
  );
}
