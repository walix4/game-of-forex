import { HeroSection } from "@/components/home/HeroSection";
import { ChallengeSizes } from "@/components/home/ChallengeSizes";
import { HowItWorks } from "@/components/home/HowItWorks";
import { WhyChoose } from "@/components/home/WhyChoose";
import { FundedUsp } from "@/components/home/FundedUsp";
import { InstrumentsMarquee } from "@/components/home/InstrumentsMarquee";
import { DashboardPreview } from "@/components/home/DashboardPreview";
import { PayoutFlow } from "@/components/home/PayoutFlow";
import { RulesPreview } from "@/components/home/RulesPreview";
import { BehindTheScenes } from "@/components/home/BehindTheScenes";
import { CommunityRow } from "@/components/home/CommunityRow";
import { FaqPreview } from "@/components/home/FaqPreview";
import { ClosingCta } from "@/components/home/ClosingCta";

// Prop-firm homepage (CLAUDE.md §0). One idea per section, one action per screen.
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyChoose />
      <InstrumentsMarquee />
      <ChallengeSizes />
      <HowItWorks />
      <DashboardPreview />
      <FundedUsp />
      <PayoutFlow />
      <RulesPreview />
      <BehindTheScenes />
      <CommunityRow />
      <FaqPreview />
      <ClosingCta />
    </>
  );
}
