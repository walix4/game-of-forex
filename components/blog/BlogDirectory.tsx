"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { posts, BLOG_CATEGORIES, type BlogCategory } from "@/lib/blog";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

/**
 * FTMO-style blog directory: category rail (left), latest + card grid
 * (centre), featured list (right), popular strip below. Post links are inert
 * ("#") — detail pages ship with the CMS (§0 design-mockup depth).
 */

type Filter = "All" | BlogCategory;

function CategoryChip({ cat }: { cat: BlogCategory }) {
  return (
    <span className="text-xs font-medium text-[var(--accent)]">{cat}</span>
  );
}

function PostCard({
  post,
  large = false,
  eager = false,
}: {
  post: (typeof posts)[number];
  large?: boolean;
  eager?: boolean;
}) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div
        className={cn(
          "relative overflow-hidden rounded-[var(--radius-lg)] glass-card",
          large ? "aspect-[2/1]" : "aspect-[16/9]",
        )}
      >
        <Image
          src={post.image}
          alt=""
          fill
          priority={eager}
          sizes={large ? "(max-width: 1024px) 100vw, 640px" : "(max-width: 640px) 100vw, 320px"}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)]/60 to-transparent opacity-60"
        />
      </div>
      <p className="mt-3 flex items-center gap-2 text-xs text-[var(--text-muted)]">
        <CategoryChip cat={post.cat} />
        <span aria-hidden>·</span>
        <span className="tabular">{post.date}</span>
      </p>
      <h3
        className={cn(
          "mt-1.5 font-display font-semibold leading-snug text-[var(--text-primary)] transition-colors duration-[var(--dur-fast)] group-hover:text-[var(--accent-hover)]",
          large ? "text-2xl" : "text-base",
        )}
      >
        {post.title}
      </h3>
    </Link>
  );
}

export function BlogDirectory() {
  const [filter, setFilter] = useState<Filter>("All");
  const visible =
    filter === "All" ? posts : posts.filter((p) => p.cat === filter);
  const [latest, ...rest] = visible;
  const featured = posts.filter((p) => p.featured);
  const popular = posts.filter((p) => p.popular);

  return (
    <div className="grid gap-10 lg:grid-cols-[210px_minmax(0,1fr)_250px] lg:gap-12">
      {/* category rail — first on mobile so filtering stays reachable */}
      <Reveal className="order-1">
        <nav aria-label="Blog categories" className="lg:sticky lg:top-28">
          <ul className="flex flex-wrap gap-1.5 lg:flex-col">
            {(["All", ...BLOG_CATEGORIES] as Filter[]).map((cat) => (
              <li key={cat}>
                <button
                  type="button"
                  aria-pressed={filter === cat}
                  onClick={() => setFilter(cat)}
                  className={cn(
                    "w-full rounded-full px-4 py-2 text-left text-sm transition-colors duration-[var(--dur-fast)] lg:rounded-[var(--radius)]",
                    filter === cat
                      ? "bg-white/10 font-medium text-[var(--text-primary)]"
                      : "text-[var(--text-muted)] hover:bg-white/[0.04] hover:text-[var(--text-primary)]",
                  )}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </Reveal>

      {/* posts */}
      <div className="order-2">
        {latest ? (
          <Reveal>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-muted)]">
              Latest
            </p>
            <PostCard post={latest} large eager />
          </Reveal>
        ) : (
          <p className="text-sm text-[var(--text-muted)]">
            No posts in this category yet.
          </p>
        )}

        {rest.length > 0 && (
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={Math.min(i, 4) * 0.05}>
                <PostCard post={p} />
              </Reveal>
            ))}
          </div>
        )}

        {/* popular strip */}
        <Reveal className="mt-12">
          <section
            aria-label="Popular posts"
            className="glass-card rounded-[var(--radius-xl)] p-6 sm:p-7"
          >
            <h2 className="font-display text-lg font-semibold text-[var(--text-primary)]">
              Popular on EZE Funded
            </h2>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {popular.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group flex items-center gap-3.5"
                  >
                    <span className="relative aspect-[16/10] w-24 shrink-0 overflow-hidden rounded-[var(--radius)]">
                      <Image
                        src={p.image}
                        alt=""
                        fill
                        sizes="96px"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                      />
                    </span>
                    <span className="text-sm font-medium leading-snug text-[var(--text-secondary)] transition-colors group-hover:text-[var(--text-primary)]">
                      {p.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>
      </div>

      {/* featured rail */}
      <Reveal className="order-3">
        <aside aria-label="Featured posts" className="lg:sticky lg:top-28">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-muted)]">
            Featured
          </p>
          <ul className="divide-y divide-[var(--border-subtle)]">
            {featured.map((p) => (
              <li key={p.slug} className="py-4 first:pt-0">
                <Link href={`/blog/${p.slug}`} className="group block">
                  <CategoryChip cat={p.cat} />
                  <span className="mt-1 block text-sm font-medium leading-snug text-[var(--text-secondary)] transition-colors group-hover:text-[var(--text-primary)]">
                    {p.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </Reveal>
    </div>
  );
}
