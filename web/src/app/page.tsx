import { CraftSection } from "@/components/CraftSection";
import { Hero } from "@/components/Hero";
import { HireSection } from "@/components/HireSection";
import { PlaygroundSection } from "@/components/PlaygroundSection";

export default function Home() {
  return (
    <>
      <Hero />
      <PlaygroundSection />
      <CraftSection />
      <HireSection />
    </>
  );
}
