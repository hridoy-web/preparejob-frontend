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
  Lightbulb,
  Copy,
  Check,
  CheckCircle2,
  Loader2,
  FileCode2,
  Terminal,
  Sparkles,
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
  Easy: "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800",
  Medium:
    "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800",
  Hard: "bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-800",
};

export function QuestionCard({
  question,
  index,
  initialBookmarked = false,
  onBookmarkToggle,
}: QuestionCardProps) {
  const [isOpen, setIsOpen] = useState(index === 0);
  const [activeTab, setActiveTab] = useState<"easy" | "advanced">("easy");

  const [isCopied, setIsCopied] = useState(false);
  const [isAnswerCopied, setIsAnswerCopied] = useState(false);

  const [isBookmarked, setIsBookmarked] =
    useState(initialBookmarked);

  const [isSavingBookmark, setIsSavingBookmark] = useState(false);

  const { data: session, isPending: isSessionLoading } = useSession();

  const userId = session?.user?.id;
  const router = useRouter();

  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const answerCopyTimeoutRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync bookmark state
  useEffect(() => {
    setIsBookmarked(initialBookmarked);
  }, [initialBookmarked]);

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }

      if (answerCopyTimeoutRef.current) {
        clearTimeout(answerCopyTimeoutRef.current);
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

  const explanation =
    currentAnswer?.explanation ||
    "No explanation provided for this level.";

  const keyPoints = (currentAnswer?.keyPoints || []).filter(
    (kp) => kp.point
  );

  const answerLines = explanation.split("\n");

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

  // Copy answer content
  const handleCopyAnswer = useCallback(async () => {
    try {
      const answerText = [
        activeTab === "easy" ? "Easy Answer" : "Advanced Answer",
        "",
        explanation,
        "",
        ...(keyPoints.length > 0
          ? [
            "Key Points:",
            ...keyPoints.map((kp) => `• ${kp.point}`),
          ]
          : []),
      ].join("\n");

      await navigator.clipboard.writeText(answerText);

      setIsAnswerCopied(true);

      if (answerCopyTimeoutRef.current) {
        clearTimeout(answerCopyTimeoutRef.current);
      }

      answerCopyTimeoutRef.current = setTimeout(() => {
        setIsAnswerCopied(false);
      }, 1500);

      toast.success("Answer copied to clipboard");
    } catch {
      toast.error("Unable to copy answer");
    }
  }, [activeTab, explanation, keyPoints]);

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

    setIsBookmarked(nextState);
    onBookmarkToggle?.(question._id, nextState);
    setIsSavingBookmark(true);

    try {
      await toggleBookmark(question._id, userId);

      toast.success(
        nextState
          ? "Question bookmarked"
          : "Bookmark removed"
      );
    } catch (error: any) {
      setIsBookmarked(previousState);
      onBookmarkToggle?.(question._id, previousState);

      toast.error(
        error?.message || "Failed to update bookmark"
      );
    } finally {
      setIsSavingBookmark(false);
    }
  };

  return (
    <Card
      className="
        group overflow-hidden rounded-2xl
        border border-border/70 bg-card
        shadow-sm transition-all duration-300
        hover:border-border hover:shadow-md
      "
    >
      {/* Question header */}
      <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3.5">
          <div
            className="
              flex h-10 w-10 shrink-0 items-center justify-center
              rounded-xl border border-cyan-200/70
              bg-cyan-50 text-cyan-600
              dark:border-cyan-800/40
              dark:bg-cyan-950/40 dark:text-cyan-400
            "
          >
            <Code2 className="h-4 w-4" />
          </div>

          <div className="min-w-0 space-y-2">
            {/* Question metadata */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span
                className="
                  font-semibold uppercase tracking-[0.12em]
                  text-muted-foreground
                "
              >
                Question {index + 1}
              </span>

              <Badge
                variant="outline"
                className={`
                  px-2 py-0.5 text-[10px]
                  font-bold uppercase tracking-wider
                  ${difficultyVariant}
                `}
              >
                {question.difficulty}
              </Badge>

              {question.importanceTag && (
                <Badge
                  variant="secondary"
                  className="
                    border border-cyan-200/60
                    bg-cyan-50 px-2 py-0.5
                    text-[10px] font-semibold uppercase tracking-wider
                    text-cyan-700 hover:bg-cyan-100
                    dark:border-cyan-800/40
                    dark:bg-cyan-950/40 dark:text-cyan-300
                  "
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
              <h3
                className="
                  text-base font-bold leading-snug tracking-tight
                  text-foreground md:text-lg
                "
              >
                {question.title}
              </h3>

              <span
                className="
                  mt-1 shrink-0 text-muted-foreground
                  opacity-0 transition-opacity
                  group-hover/title:opacity-100
                "
              >
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
            className={`
              h-9 w-9 rounded-lg border-border/80
              transition-all
              ${isBookmarked
                ? "border-amber-500/30 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }
            `}
          >
            {isSavingBookmark ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Bookmark
                className={`h-4 w-4 ${isBookmarked ? "fill-amber-500" : ""
                  }`}
              />
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="
              h-9 gap-1.5 rounded-lg border-border/80
              text-xs font-semibold text-foreground
              hover:bg-muted
            "
          >
            {isOpen ? (
              <>
                Hide Answer
                <ChevronUp className="h-3.5 w-3.5 text-muted-foreground" />
              </>
            ) : (
              <>
                Show Answer
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Answer section */}
      <div
        className={`
          grid transition-[grid-template-rows,opacity]
          duration-300 ease-in-out
          ${isOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
          }
        `}
      >
        <div className="overflow-hidden">
          <div
            className="
              space-y-6 border-t border-border/60
              bg-muted/[0.12] p-4 sm:p-6
            "
          >
            {/* Preparation tip */}
            <div
              className="
                flex items-start gap-3 rounded-xl
                border border-sky-200/70 bg-sky-50/70 p-4
                dark:border-sky-900/50 dark:bg-sky-950/20
              "
            >
              <div
                className="
                  flex h-8 w-8 shrink-0 items-center justify-center
                  rounded-lg bg-sky-100 text-sky-600
                  dark:bg-sky-900/40 dark:text-sky-400
                "
              >
                <Lightbulb className="h-4 w-4" />
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold text-sky-900 dark:text-sky-200">
                  Interview Preparation Tip
                </p>

                <p className="text-xs leading-relaxed text-sky-800/80 dark:text-sky-200/70">
                  Practice both answer variations to build
                  confidence and adapt your response to the
                  interviewer&apos;s expectations.
                </p>
              </div>
            </div>

            {/* Answer tabs */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div
                className="
                  inline-flex w-fit items-center gap-1
                  rounded-xl border border-border/70
                  bg-muted/60 p-1
                "
              >
                <button
                  type="button"
                  onClick={() => setActiveTab("easy")}
                  className={`
                    rounded-lg px-4 py-2.5
                    text-xs font-bold transition-all
                    ${activeTab === "easy"
                      ? "bg-background text-foreground shadow-sm ring-1 ring-border/60"
                      : "text-muted-foreground hover:text-foreground"
                    }
                  `}
                >
                  Easy Answer
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("advanced")}
                  className={`
                    rounded-lg px-4 py-2.5
                    text-xs font-bold transition-all
                    ${activeTab === "advanced"
                      ? "bg-background text-foreground shadow-sm ring-1 ring-border/60"
                      : "text-muted-foreground hover:text-foreground"
                    }
                  `}
                >
                  Advanced Answer
                </button>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-[var(--color-brand-accent)]" />

                <span>
                  {activeTab === "easy"
                    ? "Beginner-friendly explanation"
                    : "In-depth technical explanation"}
                </span>
              </div>
            </div>

            {/* VS Code-style editor */}
            <div
              className="
                overflow-hidden rounded-xl
                border border-[#30363d]
                bg-[#0d1117] shadow-xl
              "
            >
              {/* Editor header */}
              <div
                className="
                  flex flex-wrap items-center justify-between
                  gap-3 border-b border-[#30363d]
                  bg-[#161b22]
                "
              >
                <div className="flex items-center">
                  {/* Window controls */}
                  <div className="hidden items-center gap-1.5 px-4 sm:flex">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  </div>

                  {/* File tab */}
                  <div
                    className="
                      flex items-center gap-2
                      border-r border-[#30363d]
                      bg-[#0d1117] px-4 py-3
                      text-xs
                    "
                  >
                    <FileCode2 className="h-4 w-4 text-[#61dafb]" />

                    <span className="font-mono text-[#c9d1d9]">
                      {activeTab === "easy"
                        ? "easy-answer.ts"
                        : "advanced-answer.ts"}
                    </span>

                    <span className="ml-2 text-[#8b949e]">×</span>
                  </div>
                </div>

                {/* Copy answer */}
                <button
                  type="button"
                  onClick={handleCopyAnswer}
                  className="
                    mr-3 flex items-center gap-1.5
                    rounded-md border border-[#30363d]
                    bg-[#21262d] px-2.5 py-1.5
                    text-[11px] font-medium text-[#c9d1d9]
                    transition-colors
                    hover:bg-[#30363d] hover:text-white
                  "
                >
                  {isAnswerCopied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      Copy
                    </>
                  )}
                </button>
              </div>

              {/* Editor body */}
              <div className="flex overflow-x-auto">
                {/* Line numbers */}
                <div
                  className="
                    hidden shrink-0 select-none
                    border-r border-[#21262d]
                    bg-[#0d1117] px-4 py-5
                    text-right font-mono text-xs
                    leading-7 text-[#484f58]
                    sm:block
                  "
                >
                  {Array.from(
                    { length: Math.max(answerLines.length + 6, 10) },
                    (_, i) => (
                      <div key={i}>{i + 1}</div>
                    )
                  )}
                </div>

                {/* Code content */}
                <div className="min-w-0 flex-1 px-4 py-5 sm:px-6">
                  <div className="font-mono text-[13px] leading-7">
                    {/* Code metadata */}
                    <div>
                      <span className="text-[#ff7b72]">const</span>{" "}
                      <span className="text-[#79c0ff]">
                        answerType
                      </span>{" "}
                      <span className="text-[#c9d1d9]">=</span>{" "}
                      <span className="text-[#a5d6ff]">
                        &quot;
                        {activeTab === "easy" ? "easy" : "advanced"}
                        &quot;
                      </span>
                      <span className="text-[#c9d1d9]">;</span>
                    </div>

                    {/* Function header */}
                    <div>
                      <span className="text-[#ff7b72]">function</span>{" "}
                      <span className="text-[#d2a8ff]">
                        interviewAnswer
                      </span>
                      <span className="text-[#c9d1d9]">
                        () {"{"}
                      </span>
                    </div>

                    {/* Comment */}
                    <div className="text-[#8b949e]">
                      {"  // "}
                      {activeTab === "easy"
                        ? "Beginner-friendly explanation"
                        : "In-depth technical explanation"}
                    </div>

                    {/* Answer text */}
                    <div className="my-3 rounded-lg border border-[#2d4055] bg-[#172334]">
                      <div className="border-l-2 border-cyan-400 px-4 py-3">
                        <div className="mb-2 flex items-center gap-2 font-mono text-[10px] text-cyan-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                          ANSWER
                        </div>

                        <div className="font-mono text-[13px] leading-7 text-[#e6edf3] sm:text-sm">
                          {answerLines.map((line, i) => (
                            <div
                              key={i}
                              className=" min-h-7 whitespace-pre-wrap break-words rounded-sm px-2"
                            >
                              {line || "\u00A0"}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Return statement */}
                    <div>
                      <span className="text-[#ff7b72]">return</span>{" "}
                      <span className="text-[#a5d6ff]">
                        &quot;Answer ready for practice&quot;
                      </span>
                      <span className="text-[#c9d1d9]">;</span>
                    </div>

                    {/* Closing bracket */}
                    <div className="text-[#c9d1d9]">{"}"}</div>
                  </div>
                </div>
              </div>

              {/* Editor status bar */}
              <div
                className="
                  flex flex-wrap items-center justify-between
                  gap-2 border-t border-[#30363d]
                  bg-[#161b22] px-3 py-2
                  text-[10px] font-mono text-[#8b949e]
                "
              >
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#3fb950]" />
                    Ready
                  </span>

                  <span>UTF-8</span>

                  <span className="hidden sm:inline">
                    Interview Notes
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span>Ln 1, Col 1</span>
                  <span>TypeScript</span>
                </div>
              </div>
            </div>

            {/* Key points */}
            {keyPoints.length > 0 && (
              <div
                className="
                  overflow-hidden rounded-xl
                  border border-border/70 bg-card
                "
              >
                <div
                  className="
                    flex items-center justify-between
                    border-b border-border/60
                    bg-muted/30 px-4 py-3
                  "
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="
                        flex h-7 w-7 items-center justify-center
                        rounded-lg bg-emerald-500/10
                        text-emerald-600 dark:text-emerald-400
                      "
                    >
                      <CheckCircle2 className="h-4 w-4" />
                    </div>

                    <div>
                      <p className="text-xs font-bold text-foreground">
                        Key Points
                      </p>

                      <p className="text-[10px] text-muted-foreground">
                        Important things to remember
                      </p>
                    </div>
                  </div>

                  <span
                    className="
                      rounded-md bg-muted px-2 py-1
                      text-[10px] font-bold text-muted-foreground
                    "
                  >
                    {keyPoints.length} POINTS
                  </span>
                </div>

                <div className="p-4">
                  <ul className="space-y-3">
                    {keyPoints.map((kp, i) => (
                      <li
                        key={kp._id || i}
                        className="flex items-start gap-3 text-sm leading-relaxed"
                      >
                        <span
                          className="
                            mt-0.5 flex h-5 w-5 shrink-0
                            items-center justify-center
                            rounded-md bg-emerald-500/10
                            text-[10px] font-bold
                            text-emerald-600 dark:text-emerald-400
                          "
                        >
                          {i + 1}
                        </span>

                        <span className="text-foreground/85">
                          {kp.point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}