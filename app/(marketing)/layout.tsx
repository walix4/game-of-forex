import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { BackgroundFX } from "@/components/layout/BackgroundFX";
import { LenisProvider } from "@/components/motion/LenisProvider";

// Marketing route group: shared indigo chrome + smooth scroll.
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LenisProvider />
      <BackgroundFX />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[var(--radius-sm)] focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-[var(--text-on-accent)]"
      >
        Skip to content
      </a>
      <SiteNav />
      <main id="main">{children}</main>
      <SiteFooter />
    </>
  );
}
