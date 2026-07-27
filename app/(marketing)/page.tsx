import { HeroSection } from "@/components/home/HeroSection";
import { ChallengeMatrix } from "@/components/home/ChallengeMatrix";
import { WhyChoose } from "@/components/home/WhyChoose";
import { HowItWorksScroll } from "@/components/home/HowItWorksScroll";
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
      <HowItWorksScroll />
      <ChallengeMatrix />
      <BehindTheScenes />
      <CommunityRow />
      <FaqPreview />
      <ClosingCta />
    </>
  );
}
