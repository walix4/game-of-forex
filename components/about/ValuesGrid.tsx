import { Section, SectionHeading } from "@/components/layout/Section";
import { Reveal } from "@/components/shared/Reveal";

/**
 * How the firm is run. The "real funding" card keeps the pending-legal-signoff
 * framing used across the site (§0) — never stated as a verified superlative.
 */
const VALUES: { title: string; body: string; glyph: React.ReactNode }[] = [
  {
    title: "Real funding focus",
    body: "The long-term model is real funded (A-Book) accounts — positioning pending client substantiation and legal review.",
    glyph: (
      <path d="M12 3v18M5.5 8.5 12 3l6.5 5.5M7 21h10" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: "Transparent rules",
    body: "Every target, limit and split is shown before you buy. No fine print, no moving goalposts.",
    glyph: (
      <path d="M4 5h16M4 12h16M4 19h10" strokeLinecap="round" />
    ),
  },
  {
    title: "Trust first",
    body: "We say what we are — a challenge provider — and what we're not. Not a broker, not regulated, not financial advice.",
    glyph: (
      <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" strokeLinejoin="round" />
    ),
  },
  {
    title: "Community over hype",
    body: "Setups, journals and accountability in the open — the community existed before the firm did.",
    glyph: (
      <path d="M8 11a3 3 0 100-6 3 3 0 000 6zm8 0a3 3 0 100-6 3 3 0 000 6zM2.5 20c.5-3 2.5-5 5.5-5s5 2 5.5 5m1-5c2.5.2 4.5 2 5 5" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
];

export function ValuesGrid() {
  return (
    <Section className="pt-0">
      <SectionHeading
        eyebrow="How we run it"
        title="Four things we don't compromise."
      />

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {VALUES.map((v, i) => (
          <Reveal as="li" key={v.title} delay={i * 0.06}>
            <div className="h-full rounded-[var(--radius-lg)] glass-card p-6">
              <span
                aria-hidden
                className="grid size-11 place-items-center rounded-[var(--radius)] bg-white/[0.06] text-[var(--accent)]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="size-5"
                >
                  {v.glyph}
                </svg>
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-[var(--text-primary)]">
                {v.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                {v.body}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
