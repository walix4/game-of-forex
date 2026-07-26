"use client";

import { useMemo, useState } from "react";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { faqs, FAQ_CATEGORIES, type FaqCategory } from "@/lib/faq";
import { cn } from "@/lib/utils";

type Filter = "All" | FaqCategory;

/**
 * Interactive FAQ: search across questions and answers plus category pills.
 * Active pill is bg-white/10 + accent text — never an accent FILL, so the
 * page's single primary CTA keeps §3 rule 1.
 */
export function FaqExplorer() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<Filter>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqs.filter(
      (f) =>
        (cat === "All" || f.cat === cat) &&
        (q === "" ||
          f.q.toLowerCase().includes(q) ||
          f.a.toLowerCase().includes(q)),
    );
  }, [query, cat]);

  return (
    <div>
      <div className="glass flex items-center gap-3 rounded-full px-5 transition-colors duration-[var(--dur-fast)] focus-within:border-[var(--border-accent)]">
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          fill="none"
          className="size-4 shrink-0 text-[var(--text-muted)]"
        >
          <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.4" />
          <path
            d="m10.5 10.5 3 3"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search questions"
          aria-label="Search questions"
          className="h-12 w-full bg-transparent text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] [&::-webkit-search-cancel-button]:hidden"
        />
      </div>

      <div
        className="mt-4 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter by category"
      >
        {(["All", ...FAQ_CATEGORIES] as Filter[]).map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={cat === c}
            onClick={() => setCat(c)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition-colors duration-[var(--dur-fast)]",
              cat === c
                ? "border-[var(--border-accent)] bg-white/10 text-[var(--accent)]"
                : "border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="mt-5 text-xs text-[var(--text-muted)]" aria-live="polite">
        <span className="tabular">{filtered.length}</span>{" "}
        {filtered.length === 1 ? "answer" : "answers"}
      </p>

      <div className="mt-3">
        {filtered.length > 0 ? (
          <FaqAccordion items={filtered} />
        ) : (
          <div className="glass-card rounded-[var(--radius-lg)] p-10 text-center">
            <p className="text-[var(--text-secondary)]">
              No matches — try a different term.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
