import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { CtaButton } from "@/components/shared/CtaButton";
import { RiskDisclosure } from "@/components/shared/RiskDisclosure";
import { posts, getPost, readingTime } from "@/lib/blog";

/**
 * Blog article page — FTMO-style lush detail: full-bleed hero image, sticky
 * "in this article" rail, styled body, related posts, CTA closer. Content is
 * placeholder editorial (NEEDS CLIENT INPUT); statically exported per slug.
 */
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const post = getPost((await params).slug);
  return post
    ? { title: post.title, description: post.excerpt }
    : { title: "Blog" };
}

const anchorId = (h: string) =>
  h.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const sections = post.body.filter((s) => s.h);
  const related = posts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => (a.cat === post.cat ? -1 : 0) - (b.cat === post.cat ? -1 : 0))
    .slice(0, 3);

  return (
    <article className="relative isolate overflow-hidden">
      <div
        className="glow-hero pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 opacity-50"
        aria-hidden
      />

      <Container className="pt-12 sm:pt-16">
        {/* breadcrumb */}
        <div>
          <nav aria-label="Breadcrumb" className="text-xs text-[var(--text-muted)]">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/blog" className="transition-colors hover:text-[var(--text-primary)]">
                  Blog
                </Link>
              </li>
              <li aria-hidden>›</li>
              <li className="text-[var(--accent)]">{post.cat}</li>
            </ol>
          </nav>

          <h1 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--text-primary)] sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)]">
            {post.excerpt}
          </p>
          <p className="mt-5 flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <span className="tabular">{post.date}</span>
            <span aria-hidden>·</span>
            <span className="tabular">{readingTime(post)} min read</span>
            <span aria-hidden>·</span>
            {/* NEEDS CLIENT INPUT — real author byline */}
            <span>EZE Funded desk</span>
          </p>
        </div>

        {/* hero image */}
        <div className="mt-10">
          <div className="glass-card relative aspect-[21/9] overflow-hidden rounded-[var(--radius-xl)]">
            <Image
              src={post.image}
              alt=""
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1152px"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)]/50 to-transparent"
            />
          </div>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[230px_minmax(0,1fr)]">
          {/* "in this article" rail */}
          <div className="hidden lg:block">
            <nav aria-label="In this article" className="sticky top-28">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-muted)]">
                In this article
              </p>
              <ul className="mt-4 border-l border-[var(--border-subtle)]">
                {sections.map((s) => (
                  <li key={s.h}>
                    <a
                      href={`#${anchorId(s.h!)}`}
                      className="-ml-px block border-l border-transparent py-2 pl-4 text-sm text-[var(--text-muted)] transition-colors duration-[var(--dur-fast)] hover:border-[var(--accent)] hover:text-[var(--text-primary)]"
                    >
                      {s.h}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* body */}
          <div className="max-w-2xl">
            {post.body.map((s, i) => (
              <section key={s.h ?? i}>
                {s.h && (
                  <h2
                    id={anchorId(s.h)}
                    className="mt-10 scroll-mt-28 font-display text-2xl font-semibold tracking-[-0.01em] text-[var(--text-primary)] first:mt-0"
                  >
                    {s.h}
                  </h2>
                )}
                {s.p.map((para) => (
                  <p
                    key={para.slice(0, 32)}
                    className="mt-5 leading-[1.75] text-[var(--text-secondary)]"
                  >
                    {para}
                  </p>
                ))}
              </section>
            ))}

            <p className="mt-10 border-t border-[var(--border-subtle)] pt-6 text-xs leading-relaxed text-[var(--text-muted)]">
              {/* NEEDS CLIENT INPUT — placeholder editorial content. */}
              Educational content only. Nothing here is financial advice or a
              recommendation to trade.
            </p>
          </div>
        </div>

        {/* related posts */}
        <div className="mt-20">
          <h2 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
            Keep reading
          </h2>
          <ul className="mt-6 grid gap-8 sm:grid-cols-3">
            {related.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="group block">
                  <span className="glass-card relative block aspect-[16/9] overflow-hidden rounded-[var(--radius-lg)]">
                    <Image
                      src={p.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, 320px"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />
                  </span>
                  <span className="mt-3 block text-xs font-medium text-[var(--accent)]">
                    {p.cat}
                  </span>
                  <span className="mt-1 block font-display text-base font-semibold leading-snug text-[var(--text-primary)] transition-colors duration-[var(--dur-fast)] group-hover:text-[var(--accent-hover)]">
                    {p.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* closer — single primary CTA (§3 rule 1), risk note adjacent */}
        <div className="my-20">
          <div className="ring-accent glass rounded-[var(--radius-xl)] p-7 sm:p-9">
            <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-display text-xl font-semibold text-[var(--text-primary)]">
                  Put the process to work
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
        </div>
      </Container>
    </article>
  );
}
