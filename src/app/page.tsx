
import FAQSection from "@/components/home/FAQSection";
import HeroSection from "@/components/home/hero/HeroSection";
import { TechRoadmapSection } from "@/components/home/TechRoadmapSection";

// import TechStack from "@/components/home/TechStack";
import { TrendingTechSection } from "@/components/home/TrendingTechSection";
import Workflow from "@/components/home/Workflow";

export default function Home() {
  return (
    <>
      <HeroSection/>
      <TrendingTechSection/>
     <TechRoadmapSection/>
      <Workflow/>
      <FAQSection/>
    </>
  );
}
