import Link from "next/link";
import {
  faqs,
  FAQ_CATEGORIES,
  CATEGORY_META,
  type Faq,
} from "@/lib/faq";
import { CategoryIcon } from "./CategoryIcon";
import { cn } from "@/lib/utils";

/**
 * FAQ detail sidebar — FTMO-style category tree. Native <details> keeps it
 * JS-free; the active question's category is open on load and the current
 * question is highlighted.
 */
export function FaqSidebar({ current }: { current: Faq }) {
  return (
    <nav aria-label="FAQ categories" className="glass-card rounded-[var(--radius-xl)] p-3">
      <Link
        href="/faq"
        className="group mx-2 mt-1 mb-2 flex items-center gap-2 rounded-[var(--radius)] px-2 py-2 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
      >
        <span aria-hidden className="transition-transform duration-[var(--dur-fast)] group-hover:-translate-x-0.5">
          ←
        </span>
        All questions
      </Link>

      <ul>
        {FAQ_CATEGORIES.map((cat) => {
          const items = faqs.filter((f) => f.cat === cat);
          const isActive = cat === current.cat;
          return (
            <li key={cat}>
              <details open={isActive} className="group">
                <summary className="flex cursor-pointer list-none items-center gap-2.5 rounded-[var(--radius)] px-2 py-2.5 transition-colors hover:bg-white/[0.04] [&::-webkit-details-marker]:hidden">
                  <CategoryIcon name={CATEGORY_META[cat].icon} className="size-7 rounded-[8px]" />
                  <span
                    className={cn(
                      "flex-1 text-sm font-medium",
                      isActive
                        ? "text-[var(--text-primary)]"
                        : "text-[var(--text-secondary)]",
                    )}
                  >
                    {cat}
                  </span>
                  <span
                    aria-hidden
                    className="text-xs text-[var(--text-muted)] transition-transform duration-[var(--dur-base)] group-open:rotate-90"
                  >
                    ›
                  </span>
                </summary>
                <ul className="mt-1 mb-2 ml-[1.35rem] border-l border-[var(--border-subtle)] pl-3">
                  {items.map((f) => {
                    const isCurrent = f.slug === current.slug;
                    return (
                      <li key={f.slug}>
                        <Link
                          href={`/faq/${f.slug}`}
                          aria-current={isCurrent ? "page" : undefined}
                          className={cn(
                            "block rounded-[var(--radius)] px-3 py-2 text-[0.8rem] leading-snug transition-colors duration-[var(--dur-fast)]",
                            isCurrent
                              ? "bg-[var(--accent)]/10 font-medium text-[var(--text-primary)] ring-1 ring-inset ring-[var(--accent)]/30"
                              : "text-[var(--text-muted)] hover:bg-white/[0.04] hover:text-[var(--text-primary)]",
                          )}
                        >
                          {f.q}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </details>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
