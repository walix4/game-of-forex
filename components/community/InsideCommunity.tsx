import { SectionHeading } from "@/components/layout/Section";
import { Reveal } from "@/components/shared/Reveal";

/**
 * What actually happens inside the community — honest activity descriptions,
 * no outcome promises or income language (§4).
 */
const FEATURES: { title: string; body: string; icon: React.ReactNode }[] = [
  {
    title: "Daily market outlook",
    body: "A structured look at the sessions ahead — levels, events and scenarios, not signals to copy blindly.",
    icon: (
      <path d="M3 17l4-6 4 3 5-8 5 6M3 21h18" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: "Trade journals & reviews",
    body: "Members post journals and get honest feedback on process — entries, risk and management.",
    icon: (
      <path d="M5 4h11a3 3 0 013 3v13H8a3 3 0 01-3-3V4zm3 5h8m-8 4h5" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: "Funded-trader lounge",
    body: "A dedicated space for traders who passed — payout routines, scaling questions and staying consistent.",
    icon: (
      <path d="M12 3l7 4v5c0 4.5-3 8-7 9-4-1-7-4.5-7-9V7l7-4z" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: "Questions answered",
    body: "Ask about rules, phases or the platform and get a straight answer from the team or the room.",
    icon: (
      <path d="M21 12a8 8 0 11-4-6.9M12 8v4m0 4h.01" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: "Accountability",
    body: "Check-ins that keep you honest about your own plan — the routine matters more than any single trade.",
    icon: (
      <path d="M9 11a4 4 0 108 0 4 4 0 00-8 0zM3 21a7 7 0 0114 0M17 8l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: "Session recaps",
    body: "What moved, what didn't, and what the room took from it — recorded so you can catch up anytime.",
    icon: (
      <path d="M12 3a9 9 0 109 9M12 7v5l3 3M21 3l-4 4m4 0V3h-4" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
];

export function InsideCommunity() {
  return (
    <>
      <SectionHeading
        eyebrow="Inside the community"
        title="What happens in the room."
        intro="Not a signals channel — a place where traders do the work in public and hold each other to it."
      />
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => (
          <Reveal as="li" key={f.title} delay={i * 0.05}>
            <div className="h-full rounded-[var(--radius-lg)] glass-card p-6">
              <span className="grid size-11 place-items-center rounded-[var(--radius)] bg-[var(--accent-subtle)] text-[var(--accent)]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="size-5"
                  aria-hidden
                >
                  {f.icon}
                </svg>
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-[var(--text-primary)]">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                {f.body}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
    </>
  );
}
