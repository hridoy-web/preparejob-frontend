"use client";

import { useState } from "react";
import { Question } from "@/types/question";
import { QuestionCard } from "@/components/explore/QuestionCard";
import { Button } from "@/components/ui/button";

interface QuestionListProps {
  questions: Question[];
  itemsPerPage?: number;
}

export function QuestionList({
  questions,
  itemsPerPage = 10,
}: QuestionListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(questions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, questions.length);
  const currentQuestions = questions.slice(startIndex, endIndex);

  return (
    <div className="space-y-8">
      {/* Question Cards */}
      <div className="space-y-5">
        {currentQuestions.map((question, index) => (
          <QuestionCard
            key={question._id || index}
            question={question}
            index={startIndex + index}
          />
        ))}
      </div>

      {/* Pagination Controls Footer */}
      {questions.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border/60">
          {/* Info Text */}
          <p className="text-xs font-medium text-muted-foreground">
            Showing {startIndex + 1}-{endIndex} of {questions.length} questions
          </p>

          {/* Page Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="h-9 px-3 text-xs font-semibold rounded-lg border-border hover:bg-muted disabled:opacity-40"
            >
              Previous
            </Button>

            {/* Page Number Buttons */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`h-9 w-9 text-xs font-bold rounded-lg transition-colors ${
                  currentPage === page
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {page}
              </button>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="h-9 px-3 text-xs font-semibold rounded-lg border-border hover:bg-muted disabled:opacity-40"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}