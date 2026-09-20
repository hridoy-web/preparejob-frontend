import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, Code2, Flame, Target, Sparkles } from "lucide-react";

import { EXPLORE_TECH_ITEMS } from "@/lib/api/explore/card-data";
import { getAllQuestions } from "@/lib/apiActions/questionApi";
import { Question } from "@/types/question";
import { QuestionsSection } from "@/components/explore/QuestionsSection";

interface DetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ExploreDetailPage({
  params,
}: DetailPageProps) {
  const { id } = await params;

  const tech = EXPLORE_TECH_ITEMS.find((item) => item.id === id);

  if (!tech) {
    notFound();
  }

  const response = await getAllQuestions({ technology: id });
  const questions: Question[] = response?.data?.questions || [];

  return (
    <div className="min-h-screen bg-background pb-20 text-foreground font-lexend">
      <main className="container mx-auto max-w-6xl px-4 pt-6 sm:pt-8">
        
        <Link
          href="/explore"
          className="group mb-5 inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to Technologies
        </Link>

        <section className="relative mb-8 overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 lg:p-8 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            
            <div className="space-y-4 max-w-2xl">
              
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-xl border border-sky-200/80 bg-sky-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-sky-700">
                  <Code2 className="h-3 w-3" />
                  {tech.category}
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-200/80 bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                  <Target className="h-3 w-3" />
                  {tech.difficulty}
                </span>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-3 shadow-2xs">
                  <Image
                    src={tech.logo}
                    alt={`${tech.name} logo`}
                    width={40}
                    height={40}
                    className="object-contain"
                    unoptimized
                  />
                </div>

                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900">
                    {tech.name} Interview Questions
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal mt-1 leading-relaxed">
                    Learn important concepts and prepare for your technical interviews.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 rounded-2xl border border-indigo-100 bg-indigo-50/60 px-4 py-3 text-xs sm:text-sm text-slate-700 font-medium">
                <Sparkles className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                <p>
                  We selected <span className="font-bold text-indigo-600">{questions.length} important questions</span> for you. Practice these to build strong knowledge and feel confident in your interviews!
                </p>
              </div>

            </div>

            <div className="grid grid-cols-2 gap-3 shrink-0">
              
              <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-indigo-50/50 to-white p-4 text-center min-w-[120px] shadow-2xs">
                <div className="flex items-center justify-center gap-1.5 text-slate-500 mb-1">
                  <BookOpen className="h-3.5 w-3.5 text-indigo-600" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Questions</span>
                </div>
                <p className="text-xl sm:text-2xl font-black text-slate-900">
                  {questions.length}
                </p>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-amber-50/50 to-white p-4 text-center min-w-[120px] shadow-2xs">
                <div className="flex items-center justify-center gap-1.5 text-slate-500 mb-1">
                  <Flame className="h-3.5 w-3.5 text-amber-500" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Popularity</span>
                </div>
                <p className="text-xl sm:text-2xl font-black text-slate-900">
                  {tech.popularity}%
                </p>
              </div>

            </div>

          </div>
        </section>

        {questions.length > 0 ? (
          <QuestionsSection questions={questions} itemsPerPage={10} />
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50/50 px-6 py-16 text-center space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
              <BookOpen className="h-5 w-5" />
            </div>

            <h3 className="text-base font-bold text-slate-900">
              No questions available yet
            </h3>

            <p className="mx-auto max-w-sm text-xs text-slate-600 font-normal">
              Check back soon as new {tech.name} interview questions are published.
            </p>

            <Link
              href="/explore"
              className="mt-3 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-semibold text-white transition-all hover:bg-slate-800 cursor-pointer"
            >
              Explore Other Technologies
              <ArrowLeft className="h-3.5 w-3.5 rotate-180" />
            </Link>
          </div>
        )}

      </main>
    </div>
  );
}