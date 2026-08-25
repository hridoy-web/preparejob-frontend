import AIFeature from "@/components/home/AIFeature";
import FAQSection from "@/components/home/FAQSection";
import HeroSection from "@/components/home/HeroSection";
import HotTopicsCards from "@/components/home/HotTopicsCards";
import TechStack from "@/components/home/TechStack";
import Workflow from "@/components/home/Workflow";

export default function Home() {
  return (
    <>
      <HeroSection />
      <HotTopicsCards />
      <TechStack />
      <AIFeature />
      <Workflow/>
      <FAQSection/>
    </>
  );
}
