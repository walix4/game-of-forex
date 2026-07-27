import type { Metadata } from "next";
import { fontVars } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "EZE Funded — Real funded trading challenges",
    template: "%s — EZE Funded",
  },
  description:
    "Structured forex education and a trading community led by Waqas Ahmed. Learn the method, not the hype.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontVars} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
