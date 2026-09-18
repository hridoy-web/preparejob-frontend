"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { Question } from "@/types/question";
import { QuestionList } from "@/components/explore/QuestionList";
import { useSession } from "@/lib/auth-client";
import { getUserBookmarks } from "@/lib/apiActions/userApi";

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
  const [bookmarkedSet, setBookmarkedSet] = useState<Set<string>>(new Set());

  const { data: session } = useSession();
  const userId = session?.user?.id;

  // 1. Fetch user bookmarks on mount or when auth state changes
  useEffect(() => {
    let isMounted = true;

    async function fetchUserBookmarks() {
      if (!userId) {
        if (isMounted) setBookmarkedSet(new Set());
        return;
      }

      try {
        const res = await getUserBookmarks(userId);
        const data = res?.data || res?.bookmarks || res || [];
        if (Array.isArray(data) && isMounted) {
          const ids = data.map((item: any) =>
            typeof item === "string" ? item : item._id
          );
          setBookmarkedSet(new Set(ids));
        }
      } catch (error) {
        console.error("Failed to load user bookmarks:", error);
      }
    }

    fetchUserBookmarks();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  // 2. Real-time local state update when a card toggles bookmark
  const handleBookmarkToggle = useCallback(
    (questionId: string, isBookmarked: boolean) => {
      setBookmarkedSet((prev) => {
        const next = new Set(prev);
        if (isBookmarked) {
          next.add(questionId);
        } else {
          next.delete(questionId);
        }
        return next;
      });
    },
    []
  );

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

      {/* Paginated Question List */}
      {filteredQuestions.length > 0 ? (
        <QuestionList
          key={activeFilter}
          questions={filteredQuestions}
          itemsPerPage={itemsPerPage}
          bookmarkedSet={bookmarkedSet}
          onBookmarkToggle={handleBookmarkToggle}
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
