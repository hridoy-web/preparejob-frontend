import Link from "next/link";
import { notFound } from "next/navigation";
import { EXPLORE_TECH_ITEMS } from "@/lib/api/explore/card-data";
import { getAllQuestions } from "@/lib/apiActions/questionApi";

import { Question } from "@/types/question";
import { ArrowLeft } from "lucide-react";
import { QuestionsSection } from "@/components/explore/QuestionsSection";

interface DetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ExploreDetailPage({ params }: DetailPageProps) {
  const { id } = await params;

  const tech = EXPLORE_TECH_ITEMS.find((item) => item.id === id);

  if (!tech) {
    notFound();
  }

  const response = await getAllQuestions({ technology: id });
  const questions: Question[] = response?.data?.questions || [];

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      <div className="container mx-auto max-w-5xl px-4 pt-8">
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Technologies
        </Link>

        {/* Hero Section */}
        <div className="space-y-3 mb-10">
          <p className="text-xs font-bold tracking-wider text-[var(--color-brand-accent)] uppercase">
            Focused Practice
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl max-w-3xl leading-[1.15] text-foreground">
            Master {tech.name} Interview Questions —{" "}
            <span className="ai-gradient-text">Curated Through AI Research</span>
          </h1>
        </div>

        {/* Difficulty Filters + Paginated Question List */}
        {questions.length > 0 ? (
          <QuestionsSection questions={questions} itemsPerPage={10} />
        ) : (
          <div className="text-center py-20 border border-dashed border-border rounded-2xl bg-card">
            <h3 className="text-lg font-bold text-foreground">
              No questions available yet
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Check back soon as new {tech.name} interview questions are published.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}