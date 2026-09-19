"use client";

import { useMemo, useState, useRef } from "react";
import { Question } from "@/types/question";
import { QuestionCard } from "@/components/explore/QuestionCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface QuestionListProps {
  questions: Question[];
  itemsPerPage?: number;
  bookmarkedSet?: Set<string>;
  onBookmarkToggle?: (questionId: string, isBookmarked: boolean) => void;
}

const EMPTY_SET = new Set<string>();

export function QuestionList({
  questions,
  itemsPerPage = 10,
  bookmarkedSet = EMPTY_SET,
  onBookmarkToggle,
}: QuestionListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.max(1, Math.ceil(questions.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, questions.length);
  const currentQuestions = questions.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const pageItems = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const items: (number | "ellipsis")[] = [1];
    const left = Math.max(2, currentPage - 1);
    const right = Math.min(totalPages - 1, currentPage + 1);

    if (left > 2) items.push("ellipsis");
    for (let page = left; page <= right; page++) items.push(page);
    if (right < totalPages - 1) items.push("ellipsis");
    items.push(totalPages);

    return items;
  }, [totalPages, currentPage]);

  return (
    <div ref={containerRef} className="space-y-8 scroll-mt-6">
      {/* Question Cards */}
      <div className="space-y-5">
        {currentQuestions.map((question, index) => (
          <QuestionCard
            key={question._id || index}
            question={question}
            index={startIndex + index}
            initialBookmarked={bookmarkedSet.has(question._id)}
            onBookmarkToggle={onBookmarkToggle}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      {questions.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border/60">
          <p className="text-xs font-medium text-muted-foreground">
            Showing {startIndex + 1}-{endIndex} of {questions.length} questions
          </p>

          {totalPages > 1 && (
            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="icon"
                onClick={() => goToPage(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="h-9 w-9 rounded-lg border-border hover:bg-muted disabled:opacity-40"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {pageItems.map((item, i) =>
                item === "ellipsis" ? (
                  <span
                    key={`ellipsis-${i}`}
                    className="flex h-9 w-9 items-center justify-center text-muted-foreground"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </span>
                ) : (
                  <button
                    key={item}
                    type="button"
                    onClick={() => goToPage(item)}
                    className={`h-9 w-9 rounded-lg text-xs font-bold transition-colors ${
                      currentPage === item
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}

              <Button
                variant="outline"
                size="icon"
                onClick={() => goToPage(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="h-9 w-9 rounded-lg border-border hover:bg-muted disabled:opacity-40"
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
