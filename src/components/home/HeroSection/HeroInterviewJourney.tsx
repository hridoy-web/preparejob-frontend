import AIEvaluationCard from "@/components/home/HeroSection/AIEvaluationCard";

export default function HeroInterviewJourney() {
  return (
    <figure
      aria-labelledby="interview-journey-caption"
      className="mx-auto w-full max-w-[540px]"
    >
      <AIEvaluationCard />

      <figcaption
        id="interview-journey-caption"
        className="sr-only"
      >
        AI-powered interview evaluation with answer scoring, actionable
        feedback, and personalized improvement guidance.
      </figcaption>
    </figure>
  );
}