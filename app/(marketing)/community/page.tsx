import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { PlatformCards } from "@/components/community/PlatformCards";
import { InsideCommunity } from "@/components/community/InsideCommunity";
import { WeekCadence } from "@/components/community/WeekCadence";
import { JoinCta } from "@/components/community/JoinCta";

export const metadata: Metadata = {
  title: "Community",
  description:
    "The EZE Funded community: setups, journals and support on Discord, WhatsApp, YouTube and Instagram.",
};

export default function CommunityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Community"
        title="You don't trade alone."
        intro="Evaluation and funded traders share setups, review journals, and keep each other accountable. Updates, learning and support in one place."
      />

      <Section>
        <PlatformCards />
      </Section>

      <Section className="pt-0">
        <InsideCommunity />
      </Section>

      <Section className="pt-0">
        <WeekCadence />
      </Section>

      <Section className="pt-0">
        <JoinCta />
      </Section>
    </>
  );
}
