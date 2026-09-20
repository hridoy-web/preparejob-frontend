"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Question } from "@/types/question";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { useSession } from "@/lib/auth-client";
import { toggleBookmark } from "@/lib/apiActions/userApi";
import { toast } from "sonner";

import {
  Code2,
  Bookmark,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  CheckCircle2,
  Loader2,
  Lightbulb,
} from "lucide-react";

interface QuestionCardProps {
  question: Question;
  index: number;
  initialBookmarked?: boolean;
  onBookmarkToggle?: (
    questionId: string,
    isBookmarked: boolean
  ) => void;
}

const DIFFICULTY_VARIANTS: Record<string, string> = {
  Easy: "bg-emerald-50 text-emerald-700 border-emerald-200/80 font-semibold",
  Medium: "bg-amber-50 text-amber-700 border-amber-200/80 font-semibold",
  Hard: "bg-rose-50 text-rose-700 border-rose-200/80 font-semibold",
};

interface AnswerPanelProps {
  explanation: string;
  answerType: "easy" | "advanced";
}

function AnswerPanel({
  explanation,
  answerType,
}: AnswerPanelProps) {
  const [isCopied, setIsCopied] = useState(false);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const answerText = explanation || "No explanation provided for this level.";

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const handleCopyAnswer = async () => {
    try {
      await navigator.clipboard.writeText(answerText);
      setIsCopied(true);
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
      copyTimeoutRef.current = setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    } catch {
      toast.error("Unable to copy answer");
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 sm:px-5 py-3 bg-slate-50/80">
        <div className="flex items-center gap-2">
          <Code2 className="h-4 w-4 text-indigo-600" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 font-lexend">
            {answerType === "easy" ? "Easy Explanation" : "Advanced Explanation"}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopyAnswer}
          className="rounded-xl p-1.5 text-slate-400 transition-colors hover:bg-slate-200/60 hover:text-slate-900 cursor-pointer"
          aria-label="Copy answer"
          title="Copy answer"
        >
          {isCopied ? (
            <Check className="h-4 w-4 text-emerald-600" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>

      <div className="relative bg-gradient-to-br from-indigo-50/30 via-white to-indigo-50/20">
        <div className="absolute bottom-0 left-0 top-0 w-1.5 bg-indigo-600" />
        <div className="px-5 py-4 sm:px-6 sm:py-5">
          <p className="font-normal leading-relaxed text-slate-900 text-sm sm:text-base font-lexend tracking-normal">
            {answerText}
          </p>
        </div>
      </div>
    </div>
  );
}

export function QuestionCard({
  question,
  index,
  initialBookmarked = false,
  onBookmarkToggle,
}: QuestionCardProps) {
  const [isOpen, setIsOpen] = useState(index === 0);
  const [activeTab, setActiveTab] = useState<"easy" | "advanced">("easy");
  const [isCopied, setIsCopied] = useState(false);
  const [isKeyPointsOpen, setIsKeyPointsOpen] = useState(false);
  
  const [prevInitialBookmarked, setPrevInitialBookmarked] = useState(initialBookmarked);
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);

  if (initialBookmarked !== prevInitialBookmarked) {
    setPrevInitialBookmarked(initialBookmarked);
    setIsBookmarked(initialBookmarked);
  }

  const [isSavingBookmark, setIsSavingBookmark] = useState(false);

  const { data: session, isPending: isSessionLoading } = useSession();
  const userId = session?.user?.id;
  const router = useRouter();
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const difficultyVariant =
    DIFFICULTY_VARIANTS[question.difficulty] ||
    "bg-slate-100 text-slate-700 border-slate-200";

  const currentAnswer =
    activeTab === "easy" ? question.easyAnswer : question.advancedAnswer;

  const rawKeyPoints = question.easyAnswer?.keyPoints || [];
  const keyPoints = rawKeyPoints
    .map((kp: unknown) => {
      if (typeof kp === "string") return kp;
      if (kp && typeof kp === "object" && "point" in kp) {
        return (kp as { point: string }).point;
      }
      return "";
    })
    .filter(Boolean);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(question.title);
      setIsCopied(true);
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
      copyTimeoutRef.current = setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    } catch {
      toast.error("Unable to copy question");
    }
  }, [question.title]);

  const handleBookmarkToggle = async () => {
    if (!isSessionLoading && !session?.user) {
      toast.error("Please login to bookmark questions");
      router.push("/login");
      return;
    }

    if (isSavingBookmark || isSessionLoading || !userId) {
      return;
    }

    const previousState = isBookmarked;
    const nextState = !previousState;

    setIsBookmarked(nextState);
    onBookmarkToggle?.(question._id, nextState);
    setIsSavingBookmark(true);

    try {
      await toggleBookmark(question._id, userId);
      toast.success(nextState ? "Question bookmarked" : "Bookmark removed");
    } catch (error: unknown) {
      setIsBookmarked(previousState);
      onBookmarkToggle?.(question._id, previousState);
      const errorMessage = error instanceof Error ? error.message : "Failed to update bookmark";
      toast.error(errorMessage);
    } finally {
      setIsSavingBookmark(false);
    }
  };

  return (
    <Card className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs transition-all duration-200 hover:border-slate-300">
      
      {/* QUESTION HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 sm:p-6">
        <div className="flex min-w-0 items-start gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100">
            <Code2 className="h-5 w-5" />
          </div>

          <div className="min-w-0 space-y-2.5">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-bold uppercase tracking-wider text-slate-500 font-lexend">
                Question {index + 1}
              </span>

              <Badge
                variant="outline"
                className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-lg font-lexend ${difficultyVariant}`}
              >
                {question.difficulty}
              </Badge>

              {question.importanceTag && (
                <Badge
                  variant="secondary"
                  className="border border-indigo-200/60 bg-indigo-50/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-700 rounded-lg font-lexend"
                >
                  {question.importanceTag}
                </Badge>
              )}
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="group/title flex items-start gap-2 text-left cursor-pointer"
              title="Copy question title"
            >
              <p className="text-base sm:text-lg font-bold leading-snug tracking-tight text-slate-900 font-lexend">
                {question.title}
              </p>

              <span className="mt-1 shrink-0 text-slate-400 opacity-0 transition-opacity group-hover/title:opacity-100">
                {isCopied ? (
                  <Check className="h-4 w-4 text-emerald-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </span>
            </button>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex shrink-0 items-center gap-2.5 self-end sm:self-center">
          <Button
            variant="outline"
            size="icon"
            onClick={handleBookmarkToggle}
            disabled={isSavingBookmark}
            aria-pressed={isBookmarked}
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
            className={`h-10 w-10 rounded-2xl border-slate-200 transition-colors cursor-pointer ${
              isBookmarked
                ? "border-amber-500/30 bg-amber-50 text-amber-500 hover:bg-amber-100"
                : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            {isSavingBookmark ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Bookmark
                className={`h-4 w-4 ${
                  isBookmarked ? "fill-amber-500 text-amber-500" : ""
                }`}
              />
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            className="h-10 px-4 gap-2 rounded-2xl border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer font-lexend"
          >
            <span>{isOpen ? "Hide Answer" : "Show Answer"}</span>
            {isOpen ? (
              <ChevronUp className="h-4 w-4 text-slate-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-slate-500" />
            )}
          </Button>
        </div>
      </div>

      {/* ANSWER SECTION */}
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
          isOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="space-y-5 border-t border-slate-100 bg-slate-50/50 p-4 sm:p-6">

            {/* Preparation Tip Banner */}
            <div
              role="note"
              className="flex items-center gap-2.5 rounded-2xl border border-sky-100 bg-sky-50/90 px-3.5 py-2.5 shadow-2xs"
            >
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-600">
                <Lightbulb className="h-3.5 w-3.5" />
              </div>

              <p className="text-[11px] sm:text-xs font-medium text-sky-950 font-lexend leading-tight">
                Two answers are provided, choose whichever works best for you! Key points help memorize core concepts quickly.
              </p>
            </div>

            {/* Answer Tabs */}
            <div
              className="inline-flex rounded-2xl border border-slate-200/80 bg-white p-1 shadow-2xs"
              role="tablist"
              aria-label="Answer difficulty"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "easy"}
                onClick={() => setActiveTab("easy")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer font-lexend ${
                  activeTab === "easy"
                    ? "bg-slate-950 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-950"
                }`}
              >
                Easy Answer
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "advanced"}
                onClick={() => setActiveTab("advanced")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer font-lexend ${
                  activeTab === "advanced"
                    ? "bg-slate-950 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-950"
                }`}
              >
                Advanced Answer
              </button>
            </div>

            {/* Answer Panel */}
            <AnswerPanel
              explanation={
                currentAnswer?.explanation ||
                "No explanation provided for this level."
              }
              answerType={activeTab}
            />

            {/* Core Concepts with Toggle */}
            {keyPoints.length > 0 && (
              <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
                <button
                  type="button"
                  onClick={() => setIsKeyPointsOpen((prev) => !prev)}
                  className="flex w-full items-center justify-between gap-3 border-b border-slate-100 px-4 sm:px-5 py-3.5 bg-slate-50/80 cursor-pointer text-left transition-colors hover:bg-slate-100/70"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>

                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-lexend">
                        Core Concepts & Key Points
                      </h4>
                      <p className="text-[11px] text-slate-500 font-lexend">
                        Click to toggle important points for quick revision
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-2.5 py-1 font-mono text-[10px] font-bold">
                      {keyPoints.length} items
                    </span>
                    {isKeyPointsOpen ? (
                      <ChevronUp className="h-4 w-4 text-slate-500" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-slate-500" />
                    )}
                  </div>
                </button>

                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                    isKeyPointsOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="divide-y divide-slate-100 bg-white">
                      {keyPoints.map((pointText: string, i: number) => (
                        <div
                          key={i}
                          className="flex items-start gap-3.5 px-4 sm:px-5 py-3.5 transition-colors hover:bg-slate-50/80"
                        >
                          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 font-mono text-[11px] font-bold border border-indigo-100">
                            {String(i + 1).padStart(2, "0")}
                          </span>

                          <p className="text-xs sm:text-sm leading-relaxed text-slate-900 font-medium font-lexend">
                            {pointText}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}