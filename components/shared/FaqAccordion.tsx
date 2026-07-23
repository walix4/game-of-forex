import type { Faq } from "@/lib/faq";

// Native <details> accordion — accessible and JS-free.
export function FaqAccordion({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-[var(--border-subtle)] overflow-hidden rounded-[var(--radius-lg)] glass-card">
      {items.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-frame-alt)]/20 [&::-webkit-details-marker]:hidden">
            <span className="font-medium">{f.q}</span>
            <span
              aria-hidden
              className="grid size-6 shrink-0 place-items-center rounded-full border border-[var(--border-default)] text-[var(--accent)] transition-transform duration-[var(--dur-base)] group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="px-5 pb-5 text-sm leading-relaxed text-[var(--text-secondary)]">
            {f.a}
          </p>
        </details>
      ))}
    </div>
  );
}
