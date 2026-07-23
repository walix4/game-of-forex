import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { Reveal } from "@/components/shared/Reveal";

export function Section({
  id,
  className,
  children,
  containerClassName,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
  containerClassName?: string;
}) {
  return (
    <section id={id} className={cn("py-20 sm:py-28", className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-[var(--accent)]">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] sm:text-4xl">
        {title}
      </h2>
      {intro && (
        <p className="mt-4 text-[var(--text-secondary)] sm:text-lg">{intro}</p>
      )}
    </Reveal>
  );
}
