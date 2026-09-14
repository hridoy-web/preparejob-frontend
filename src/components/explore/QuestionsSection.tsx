"use client";

import { useMemo, useState } from "react";
import { Question } from "@/types/question";
import { QuestionList } from "@/components/explore/QuestionList";

interface QuestionsSectionProps {
  questions: Question[];
  itemsPerPage?: number;
}

type DifficultyFilter = "All" | "Easy" | "Medium" | "Hard";

export function QuestionsSection({
  questions,
  itemsPerPage = 10,
}: QuestionsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<DifficultyFilter>("All");

  const counts = useMemo(() => {
    return {
      All: questions.length,
      Easy: questions.filter((q) => q.difficulty === "Easy").length,
      Medium: questions.filter((q) => q.difficulty === "Medium").length,
      Hard: questions.filter((q) => q.difficulty === "Hard").length,
    };
  }, [questions]);

  const filteredQuestions = useMemo(() => {
    if (activeFilter === "All") return questions;
    return questions.filter((q) => q.difficulty === activeFilter);
  }, [questions, activeFilter]);

  const filters: { label: DifficultyFilter; hint: string }[] = [
    { label: "All", hint: "Everything" },
    { label: "Easy", hint: "Core concepts" },
    { label: "Medium", hint: "Practical depth" },
    { label: "Hard", hint: "Senior edge cases" },
  ];

  return (
    <div className="space-y-8">
      {/* Difficulty Filters */}
      <div className="flex flex-wrap items-center gap-3 pb-8 border-b border-border">
        {filters.map(({ label, hint }) => {
          const isActive = activeFilter === label;
          return (
            <button
              key={label}
              type="button"
              onClick={() => setActiveFilter(label)}
              className={`flex min-w-[150px] flex-col gap-1 rounded-xl border p-3.5 px-4 text-left transition-all ${
                isActive
                  ? "border-[var(--color-brand-accent)]/30 bg-[var(--color-brand-accent)]/10"
                  : "border-border bg-card hover:border-foreground/20"
              }`}
            >
              <div className="flex items-center justify-between gap-3 text-xs font-bold text-foreground">
                <span>{label}</span>
                <span
                  className={`rounded-md px-1.5 py-0.5 text-[11px] ${
                    isActive
                      ? "bg-[var(--color-brand-accent)]/20 text-[var(--color-brand-accent)]"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {counts[label]}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground">{hint}</p>
            </button>
          );
        })}
      </div>

      {/* Paginated Question List — remounts (and resets pagination) when the filter changes */}
      {filteredQuestions.length > 0 ? (
        <QuestionList
          key={activeFilter}
          questions={filteredQuestions}
          itemsPerPage={itemsPerPage}
        />
      ) : (
        <div className="text-center py-20 border border-dashed border-border rounded-2xl bg-card">
          <h3 className="text-lg font-bold text-foreground">
            No {activeFilter !== "All" ? activeFilter.toLowerCase() : ""} questions yet
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Try a different difficulty filter, or check back soon for more questions.
          </p>
        </div>
      )}
    </div>
  );
}