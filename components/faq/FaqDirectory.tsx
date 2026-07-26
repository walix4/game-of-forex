"use client";

import { useState } from "react";
import Link from "next/link";
import {
  faqs,
  FAQ_CATEGORIES,
  CATEGORY_META,
  POPULAR_SLUGS,
  getFaq,
} from "@/lib/faq";
import { CategoryIcon } from "./CategoryIcon";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

/**
 * FTMO-style FAQ directory: centred search + popular chips, then category
 * cards whose rows each link to a question detail page (/faq/[slug]).
 * Search filters the rows live; empty categories collapse to a quiet note.
 */
export function FaqDirectory() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const matches = (text: string) => text.toLowerCase().includes(q);
  const visible = q
    ? faqs.filter((f) => matches(f.q) || matches(f.a))
    : faqs;

  return (
    <>
      {/* search + popular chips */}
      <div className="mx-auto max-w-xl">
        <label className="glass flex items-center gap-3 rounded-full px-5 py-3.5">
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            className="size-4 shrink-0 text-[var(--text-muted)]"
            aria-hidden
          >
            <circle cx="7" cy="7" r="5" strokeWidth="1.6" />
            <path d="M14 14l-3.2-3.2" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the FAQ"
            aria-label="Search the FAQ"
            className="w-full bg-transparent text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] [&::-webkit-search-cancel-button]:hidden"
          />
          {q && (
            <span className="tabular shrink-0 text-xs text-[var(--text-muted)]" aria-live="polite">
              {visible.length} found
            </span>
          )}
        </label>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="w-full text-center text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
            Most popular
          </span>
          {POPULAR_SLUGS.map((slug) => {
            const f = getFaq(slug);
            if (!f) return null;
            return (
              <Link
                key={slug}
                href={`/faq/${slug}`}
                className="rounded-full border border-[var(--border-default)] bg-white/[0.03] px-3.5 py-1.5 text-xs text-[var(--text-secondary)] transition-colors duration-[var(--dur-fast)] hover:border-[var(--border-accent)] hover:text-[var(--text-primary)]"
              >
                {f.q}
              </Link>
            );
          })}
        </div>
      </div>

      {/* category cards */}
      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {FAQ_CATEGORIES.map((cat, i) => {
          const items = visible.filter((f) => f.cat === cat);
          return (
            <Reveal key={cat} delay={i * 0.05}>
              <section
                aria-labelledby={`faq-cat-${i}`}
                className="glass-card h-full rounded-[var(--radius-xl)] p-6 sm:p-7"
              >
                <div className="flex items-center gap-3">
                  <CategoryIcon name={CATEGORY_META[cat].icon} />
                  <div>
                    <h2
                      id={`faq-cat-${i}`}
                      className="font-display text-lg font-semibold text-[var(--text-primary)]"
                    >
                      {cat}
                    </h2>
                    <p className="text-xs text-[var(--text-muted)]">
                      {CATEGORY_META[cat].blurb}
                    </p>
                  </div>
                </div>

                {items.length === 0 ? (
                  <p className="mt-6 text-sm text-[var(--text-muted)]">
                    No matches in this category.
                  </p>
                ) : (
                  <ul className="mt-5 divide-y divide-[var(--border-subtle)]">
                    {items.map((f) => (
                      <li key={f.slug}>
                        <Link
                          href={`/faq/${f.slug}`}
                          className={cn(
                            "group flex items-center justify-between gap-3 py-3.5 text-sm text-[var(--text-secondary)]",
                            "transition-colors duration-[var(--dur-fast)] hover:text-[var(--text-primary)]",
                          )}
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
                )}
              </section>
            </Reveal>
          );
        })}
      </div>
    </>
  );
}
