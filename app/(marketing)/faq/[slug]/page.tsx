import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/shared/Reveal";
import { CtaButton } from "@/components/shared/CtaButton";
import { RiskDisclosure } from "@/components/shared/RiskDisclosure";
import { FaqSidebar } from "@/components/faq/FaqSidebar";
import { faqs, getFaq } from "@/lib/faq";

// FTMO-style FAQ detail: sidebar tree + breadcrumb + answer + related rows.
// Statically exported — every slug is prerendered.
export function generateStaticParams() {
  return faqs.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const f = getFaq((await params).slug);
  return f
    ? { title: `${f.q} — FAQ`, description: f.a.slice(0, 150) }
    : { title: "FAQ" };
}

export default async function FaqDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const faq = getFaq((await params).slug);
  if (!faq) notFound();

  const related = faqs
    .filter((f) => f.cat === faq.cat && f.slug !== faq.slug)
    .slice(0, 5);

  return (
    <div className="relative isolate overflow-hidden">
      <div
        className="glow-hero pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 opacity-50"
        aria-hidden
      />
      <Container className="py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[290px_minmax(0,1fr)] lg:gap-14">
          {/* sidebar — sticky on desktop */}
          <Reveal className="order-2 lg:order-1">
            <div className="lg:sticky lg:top-28">
              <FaqSidebar current={faq} />
            </div>
          </Reveal>

          {/* content */}
          <Reveal className="order-1 lg:order-2">
            <nav aria-label="Breadcrumb" className="text-xs text-[var(--text-muted)]">
              <ol className="flex flex-wrap items-center gap-1.5">
                <li>
                  <Link href="/faq" className="transition-colors hover:text-[var(--text-primary)]">
                    All FAQ
                  </Link>
                </li>
                <li aria-hidden>›</li>
                <li>{faq.cat}</li>
                <li aria-hidden>›</li>
                <li aria-current="page" className="text-[var(--text-secondary)]">
                  {faq.q}
                </li>
              </ol>
            </nav>

            <h1 className="mt-4 font-display text-3xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] sm:text-4xl">
              {faq.q}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)]">
              {faq.a}
            </p>

            {/* related questions */}
            {related.length > 0 && (
              <section aria-label="Related questions" className="glass-card mt-12 rounded-[var(--radius-xl)] p-2">
                <ul className="divide-y divide-[var(--border-subtle)]">
                  {related.map((f) => (
                    <li key={f.slug}>
                      <Link
                        href={`/faq/${f.slug}`}
                        className="group flex items-center justify-between gap-3 px-4 py-4 text-sm text-[var(--text-secondary)] transition-colors duration-[var(--dur-fast)] hover:text-[var(--text-primary)]"
                      >
                        <span className="flex items-center gap-2.5">
                          <svg
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="currentColor"
                            className="size-3.5 shrink-0 text-[var(--text-muted)]"
                            aria-hidden
                          >
                            <path
                              d="M4 2h5l3 3v9H4V2z M9 2v3h3"
                              strokeWidth="1.4"
                              strokeLinejoin="round"
                            />
                          </svg>
                          {f.q}
                        </span>
                        <span
                          aria-hidden
                          className="text-[var(--text-muted)] transition-transform duration-[var(--dur-fast)] group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
                        >
                          ›
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* closer — single primary CTA (§3 rule 1), risk note adjacent */}
            <div className="ring-accent glass mt-12 rounded-[var(--radius-xl)] p-7 sm:p-9">
              <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
                <div>
                  <h2 className="font-display text-xl font-semibold text-[var(--text-primary)]">
                    Ready to prove your edge?
                  </h2>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    Pick an account size and start the two-phase evaluation.
                  </p>
                </div>
                <CtaButton href="/challenges" variant="primary" className="shrink-0">
                  Start a challenge
                </CtaButton>
              </div>
              <RiskDisclosure variant="inline" className="mt-5" />
            </div>
          </Reveal>
        </div>
      </Container>
    </div>
  );
}
