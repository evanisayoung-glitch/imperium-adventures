import { AtelierTeaser } from "@/components/AtelierTeaser";
import { Hero } from "@/components/Hero";
import { HireSection } from "@/components/HireSection";
import { OutcomesSection } from "@/components/OutcomesSection";
import { PossibilityFrames } from "@/components/PossibilityFrames";
import { SignatureTeaser } from "@/components/SignatureTeaser";

export default function Home() {
  return (
    <>
      <Hero />
      <PossibilityFrames />
      <AtelierTeaser />
      <SignatureTeaser />
      <OutcomesSection />
      <HireSection />
    </>
  );
}
