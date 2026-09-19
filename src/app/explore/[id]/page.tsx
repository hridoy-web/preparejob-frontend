import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  Code2,
  Flame,
  Sparkles,
  Target,
} from "lucide-react";

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
    <div className="min-h-screen bg-background pb-24 text-foreground">
      <main className="container mx-auto max-w-6xl px-4 pt-6 sm:pt-8">
        {/* Back Navigation */}
        <Link
          href="/explore"
          className="group mb-8 inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to Technologies
        </Link>

        {/* Technology Header Section */}
        <section className="relative mb-12 overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="relative">
            {/* Header Badges */}
            <div className="mb-8 flex flex-wrap items-center gap-2">
              {/* Practice Badge */}
              <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-indigo-700 dark:border-indigo-400/20 dark:bg-indigo-400/10 dark:text-indigo-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-500" />
                Focused Practice
              </span>

              {/* Category Badge */}
              <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-sky-700 dark:border-sky-400/20 dark:bg-sky-400/10 dark:text-sky-300">
                <Code2 className="h-3 w-3" />
                {tech.category}
              </span>

              {/* Difficulty Badge */}
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300">
                <Target className="h-3 w-3" />
                {tech.difficulty}
              </span>
            </div>

            {/* Main Header Content */}
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              {/* Technology Information */}
              <div className="min-w-0 max-w-3xl">
                {/* Technology Identity */}
                <div className="mb-7 flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-border bg-muted/30 p-3 shadow-sm transition-transform duration-300 hover:scale-105 sm:h-20 sm:w-20">
                    <Image
                      src={tech.logo}
                      alt={`${tech.name} logo`}
                      width={48}
                      height={48}
                      className="object-contain"
                      unoptimized
                    />
                  </div>

                  <div>
                    <p className="mb-1 text-xs font-medium text-muted-foreground">
                      Your next interview starts here
                    </p>

                    <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl">
                      {tech.name}
                    </h1>
                  </div>
                </div>

                {/* Main Heading */}
                <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.15] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  Turn your knowledge into
                  <span className="mt-2 block text-primary">
                    interview confidence.
                  </span>
                </h2>

                {/* Supporting Description */}
                <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                  Strengthen your {tech.name} fundamentals with focused
                  interview questions, understand the concepts that matter,
                  and take one step closer to your next developer role.
                </p>

                {/* Technology Tags */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {tech.tags.map((tag, index) => (
                    <span
                      key={tag}
                      className={`rounded-lg border px-2.5 py-1.5 text-[11px] font-medium transition-colors ${
                        index === 0
                          ? "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-300"
                          : "border-border bg-muted/30 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Statistics Panel */}
              <div className="grid shrink-0 grid-cols-2 gap-3 sm:max-w-sm lg:w-52 lg:grid-cols-1">
                {/* Question Count */}
                <div className="rounded-2xl border border-border bg-muted/20 p-4 transition-colors hover:bg-muted/40">
                  <div className="mb-3 flex items-center gap-2 text-muted-foreground">
                    <BookOpen className="h-4 w-4" />
                    <span className="text-xs font-medium">Questions</span>
                  </div>

                  <p className="text-3xl font-black tracking-tight text-foreground">
                    {questions.length}
                  </p>

                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Ready to practice
                  </p>
                </div>

                {/* Popularity */}
                <div className="rounded-2xl border border-border bg-muted/20 p-4 transition-colors hover:bg-muted/40">
                  <div className="mb-3 flex items-center gap-2 text-muted-foreground">
                    <Flame className="h-4 w-4 text-amber-500" />
                    <span className="text-xs font-medium">Popularity</span>
                  </div>

                  <p className="text-3xl font-black tracking-tight text-foreground">
                    {tech.popularity}%
                  </p>

                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-border">
                    <div
                      className="h-full rounded-full bg-primary/70 transition-all duration-700"
                      style={{ width: `${tech.popularity}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Motivation Banner */}
            <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-amber-200/70 bg-amber-50/60 p-4 dark:border-amber-400/15 dark:bg-amber-400/5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-200 bg-amber-100 text-amber-700 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-300">
                  <Sparkles className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-sm font-bold text-foreground">
                    Your next breakthrough starts here.
                  </p>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Practice one question at a time and build the confidence
                    to handle real technical interviews.
                  </p>
                </div>
              </div>

              <span className="whitespace-nowrap text-xs font-bold text-amber-700 dark:text-amber-300">
                Start your journey →
              </span>
            </div>
          </div>
        </section>

        {/* Questions Section */}
        {questions.length > 0 ? (
          <QuestionsSection questions={questions} itemsPerPage={10} />
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-card px-6 py-20 text-center">
            <BookOpen className="mx-auto h-10 w-10 text-muted-foreground/40" />

            <h3 className="mt-4 text-lg font-bold text-foreground">
              No questions available yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-muted-foreground">
              Check back soon as new {tech.name} interview questions are
              published.
            </p>

            <Link
              href="/explore"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground transition-all hover:brightness-110"
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