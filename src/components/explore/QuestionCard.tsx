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

// Difficulty badge styles
const DIFFICULTY_VARIANTS: Record<string, string> = {
  Easy: "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800",

  Medium:
    "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800",

  Hard: "bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-800",
};

// =====================================================
// ANSWER PANEL
// =====================================================

interface AnswerPanelProps {
  explanation: string;
  answerType: "easy" | "advanced";
}

function AnswerPanel({
  explanation,
  answerType,
}: AnswerPanelProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const answerText =
    explanation || "No explanation provided for this level.";

  // Cleanup timeout
  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  // Copy answer
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
    <div className="relative overflow-hidden rounded-xl border border-border/70 bg-card">
      {/* Answer toolbar */}
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
        <div className="flex items-center gap-2">
          <Code2 className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />

          <span className="text-xs font-semibold text-muted-foreground">
            {answerType === "easy"
              ? "Easy Explanation"
              : "Advanced Explanation"}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopyAnswer}
          className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Copy answer"
          title="Copy answer"
        >
          {isCopied ? (
            <Check className="h-4 w-4 text-emerald-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Answer content */}
      <div className="relative bg-gradient-to-br from-cyan-50/40 via-background to-indigo-50/40 dark:from-cyan-950/10 dark:via-background dark:to-indigo-950/10">
        {/* Left accent */}
        <div className="absolute bottom-0 left-0 top-0 w-1 bg-cyan-500/70" />

        <div className="px-5 py-5 sm:px-6 sm:py-6">
          <p className="whitespace-pre-wrap text-[16px] font-normal leading-[1.85] text-foreground sm:text-[17px]">
            {answerText}
          </p>
        </div>
      </div>
    </div>
  );
}

// =====================================================
// MAIN QUESTION CARD
// =====================================================

export function QuestionCard({
  question,
  index,
  initialBookmarked = false,
  onBookmarkToggle,
}: QuestionCardProps) {
  const [isOpen, setIsOpen] = useState(index === 0);

  const [activeTab, setActiveTab] = useState<"easy" | "advanced">(
    "easy"
  );

  const [isCopied, setIsCopied] = useState(false);

  const [isBookmarked, setIsBookmarked] =
    useState(initialBookmarked);

  const [isSavingBookmark, setIsSavingBookmark] = useState(false);

  const { data: session, isPending: isSessionLoading } =
    useSession();

  const userId = session?.user?.id;

  const router = useRouter();

  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  // Sync bookmark state
  useEffect(() => {
    setIsBookmarked(initialBookmarked);
  }, [initialBookmarked]);

  // Cleanup timeout
  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const difficultyVariant =
    DIFFICULTY_VARIANTS[question.difficulty] ||
    "bg-muted text-muted-foreground border-border";

  const currentAnswer =
    activeTab === "easy"
      ? question.easyAnswer
      : question.advancedAnswer;

  const keyPoints = (currentAnswer?.keyPoints || []).filter(
    (kp) => kp.point
  );

  // Copy question title
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

  // Bookmark handler
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

    // Optimistic update
    setIsBookmarked(nextState);
    onBookmarkToggle?.(question._id, nextState);

    setIsSavingBookmark(true);

    try {
      await toggleBookmark(question._id, userId);

      toast.success(
        nextState ? "Question bookmarked" : "Bookmark removed"
      );
    } catch (error: any) {
      setIsBookmarked(previousState);

      onBookmarkToggle?.(question._id, previousState);

      toast.error(error?.message || "Failed to update bookmark");
    } finally {
      setIsSavingBookmark(false);
    }
  };

  return (
    <Card className="overflow-hidden border border-border/60 bg-card/50 shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-border">
      {/* =================================================
          QUESTION HEADER
      ================================================= */}

      <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
        <div className="flex min-w-0 items-start gap-3.5">
          {/* Question icon */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 dark:bg-cyan-950/50 dark:text-cyan-400">
            <Code2 className="h-4 w-4" />
          </div>

          <div className="min-w-0 space-y-1.5">
            {/* Question metadata */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-semibold uppercase tracking-wider text-muted-foreground">
                Question {index + 1}
              </span>

              <Badge
                variant="outline"
                className={`px-2 py-0 text-[10px] font-bold uppercase tracking-wider ${difficultyVariant}`}
              >
                {question.difficulty}
              </Badge>

              {question.importanceTag && (
                <Badge
                  variant="secondary"
                  className="border border-cyan-200/50 bg-cyan-50 px-2 py-0 text-[10px] font-semibold uppercase tracking-wider text-cyan-700 hover:bg-cyan-100 dark:border-cyan-800/40 dark:bg-cyan-950/40 dark:text-cyan-300"
                >
                  {question.importanceTag}
                </Badge>
              )}
            </div>

            {/* Question title */}
            <button
              type="button"
              onClick={handleCopy}
              className="group/title flex items-start gap-2 text-left"
              title="Copy question title"
            >
              <h3 className="text-lg font-bold leading-snug tracking-tight text-foreground">
                {question.title}
              </h3>

              <span className="mt-1 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover/title:opacity-100">
                {isCopied ? (
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </span>
            </button>
          </div>
        </div>

        {/* Header actions */}
        <div className="flex shrink-0 items-center gap-2 self-end md:self-auto">
          <Button
            variant="outline"
            size="icon"
            onClick={handleBookmarkToggle}
            disabled={isSavingBookmark}
            aria-pressed={isBookmarked}
            aria-label={
              isBookmarked ? "Remove bookmark" : "Add bookmark"
            }
            className={`h-9 w-9 rounded-lg border-border/80 transition-colors ${
              isBookmarked
                ? "border-amber-500/30 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {isSavingBookmark ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Bookmark
                className={
                  isBookmarked
                    ? "h-4 w-4 fill-amber-500 text-amber-500"
                    : "h-4 w-4"
                }
              />
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            className="h-9 gap-1.5 rounded-lg border-border/80 text-xs font-semibold text-foreground hover:bg-muted"
          >
            {isOpen ? (
              <>
                <span>Hide Answer</span>
                <ChevronUp className="h-3.5 w-3.5 text-muted-foreground" />
              </>
            ) : (
              <>
                <span>Show Answer</span>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </>
            )}
          </Button>
        </div>
      </div>

      {/* =================================================
          ANSWER SECTION
      ================================================= */}

      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
          isOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="space-y-5 border-t border-border/50 bg-muted/10 p-5 sm:p-6">

            {/* =================================================
                PREPARATION TIP BANNER
            ================================================= */}

            <div
              role="note"
              className="
                flex items-start gap-3
                rounded-xl
                border border-sky-200/70
                bg-sky-50/70
                px-4 py-3.5
                dark:border-sky-800/40
                dark:bg-sky-950/20
              "
            >
              {/* Lightbulb icon */}
              <div
                className="
                  mt-0.5 flex h-7 w-7 shrink-0
                  items-center justify-center
                  rounded-lg
                  bg-sky-100
                  text-sky-600
                  dark:bg-sky-900/50
                  dark:text-sky-400
                "
              >
                <Lightbulb className="h-4 w-4" />
              </div>

              {/* Tip text */}
              <p
                className="
                  text-[12px]
                  font-medium
                  leading-6
                  text-sky-800
                  dark:text-sky-200
                  sm:text-[13px]
                "
              >
                To make your preparation easier, we've provided two
                answer variations for each question. Feel free to
                practice whichever best fits your interview style!
              </p>
            </div>

            {/* =================================================
                ANSWER TABS
            ================================================= */}

            <div
              className="inline-flex rounded-xl border border-border/70 bg-background p-1"
              role="tablist"
              aria-label="Answer difficulty"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "easy"}
                onClick={() => setActiveTab("easy")}
                className={`rounded-lg px-4 py-2.5 text-xs font-bold transition-all ${
                  activeTab === "easy"
                    ? "bg-foreground text-background shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Easy Answer
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "advanced"}
                onClick={() => setActiveTab("advanced")}
                className={`rounded-lg px-4 py-2.5 text-xs font-bold transition-all ${
                  activeTab === "advanced"
                    ? "bg-foreground text-background shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Advanced Answer
              </button>
            </div>

            {/* Answer panel */}
            <AnswerPanel
              explanation={
                currentAnswer?.explanation ||
                "No explanation provided for this level."
              }
              answerType={activeTab}
            />

            {/* =================================================
                CORE CONCEPTS
            ================================================= */}

            {keyPoints.length > 0 && (
              <div className="overflow-hidden rounded-xl border border-border/70 bg-card">
                {/* Core concepts header */}
                <div className="flex items-center justify-between gap-3 border-b border-border/60 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-foreground">
                        Core Concepts
                      </h4>

                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Important points to remember
                      </p>
                    </div>
                  </div>

                  <span className="rounded-md bg-muted px-2 py-1 font-mono text-[10px] text-muted-foreground">
                    {keyPoints.length} items
                  </span>
                </div>

                {/* Key points */}
                <div className="divide-y divide-border/50">
                  {keyPoints.map((kp, i) => (
                    <div
                      key={kp._id || i}
                      className="flex items-start gap-3 px-5 py-4 transition-colors hover:bg-muted/30"
                    >
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-muted font-mono text-[11px] font-semibold text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <p className="text-[15px] leading-7 text-foreground/85">
                        {kp.point}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}