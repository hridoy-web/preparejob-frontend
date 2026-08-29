import AIFeature from "@/components/home/AIFeature";
import FAQSection from "@/components/home/FAQSection";
import HeroSection from "@/components/home/HeroSection";
import HotTopicsCards from "@/components/home/HotTopicsCards";
import TopicCardSkeleton from "@/components/home/HotTopicsSection/TopicCardSkeleton";
import TechStack from "@/components/home/TechStack";
import Workflow from "@/components/home/Workflow";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Suspense fallback={<TopicCardSkeleton />}>
        <HotTopicsCards />
      </Suspense>
      <TechStack />
      <AIFeature />
      <Workflow/>
      <FAQSection/>
    </>
  );
}
