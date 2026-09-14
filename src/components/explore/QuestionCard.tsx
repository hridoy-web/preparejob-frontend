"use client";

import { useEffect, useState } from "react";
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
} from "lucide-react";

interface QuestionCardProps {
  question: Question;
  index: number;
}

export function QuestionCard({ question, index }: QuestionCardProps) {
  const [isOpen, setIsOpen] = useState(index === 0);
  const [activeTab, setActiveTab] = useState<"easy" | "advanced">("easy");
  const [isCopied, setIsCopied] = useState(false);

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isSavingBookmark, setIsSavingBookmark] = useState(false);

  const { data: session, isPending: isSessionLoading } = useSession();
  const router = useRouter();

  // Sync bookmark state when session loads
  useEffect(() => {
    const bookmarks =
      (session?.user as unknown as { bookmarks?: string[] })?.bookmarks || [];
    setIsBookmarked(bookmarks.includes(question._id));
  }, [session, question._id]);

  const difficultyVariant = {
    Easy: "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800",
    Medium: "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800",
    Hard: "bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-800",
  }[question.difficulty];

  const currentAnswer =
    activeTab === "easy" ? question.easyAnswer : question.advancedAnswer;

  const keyPoints = (currentAnswer?.keyPoints || []).filter((kp) => kp.point);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(question.title);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    } catch {
      // Clipboard unavailable
    }
  };

  const handleBookmarkToggle = async () => {
    // 1. If not logged in, prompt user to log in
    if (!isSessionLoading && !session?.user) {
      toast.error("Please login to bookmark questions");
      router.push("/login");
      return;
    }

    if (isSavingBookmark || isSessionLoading) return;

    // 2. Optimistic Update
    const previousState = isBookmarked;
    const nextState = !previousState;
    setIsBookmarked(nextState);
    setIsSavingBookmark(true);

    try {
      const res = await toggleBookmark(question._id);
      toast.success(
        nextState ? "Question bookmarked" : "Bookmark removed"
      );
    } catch (error: any) {
      // Rollback on failure
      setIsBookmarked(previousState);
      toast.error(error?.message || "Failed to update bookmark");
    } finally {
      setIsSavingBookmark(false);
    }
  };

  return (
    <Card className="overflow-hidden border border-border/60 bg-card/50 backdrop-blur-sm shadow-sm transition-all duration-200 hover:border-border">
      {/* Header Section */}
      <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3.5">
          {/* Code Icon */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 dark:bg-cyan-950/50 dark:text-cyan-400">
            <Code2 className="h-4 w-4" />
          </div>

          <div className="space-y-1.5">
            {/* Meta Tags Row */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-semibold uppercase tracking-wider text-muted-foreground">
                Question {index + 1}
              </span>
              <Badge
                variant="outline"
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0 ${difficultyVariant}`}
              >
                {question.difficulty}
              </Badge>
              <Badge
                variant="secondary"
                className="bg-cyan-50 text-cyan-700 hover:bg-cyan-100 dark:bg-cyan-950/40 dark:text-cyan-300 text-[10px] font-semibold uppercase tracking-wider px-2 py-0 border border-cyan-200/50 dark:border-cyan-800/40"
              >
                {question.importanceTag}
              </Badge>
            </div>

            {/* Title */}
            <button
              type="button"
              onClick={handleCopy}
              className="group/title flex items-start gap-2 text-left"
              title="Copy question"
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

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
          {/* Bookmark Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={handleBookmarkToggle}
            disabled={isSavingBookmark}
            aria-pressed={isBookmarked}
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
            className={`h-9 w-9 rounded-lg border-border/80 transition-colors ${
              isBookmarked
                ? "text-amber-500 bg-amber-500/10 border-amber-500/30 hover:bg-amber-500/20"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {isSavingBookmark ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Bookmark
                className={`h-4 w-4 ${isBookmarked ? "fill-amber-500 text-amber-500" : ""}`}
              />
            )}
          </Button>

          {/* Show/Hide Answer Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
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

      {/* Answer Body */}
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-border/50 bg-muted/20 p-6 space-y-5">
            {/* Tip Box */}
            <div className="flex items-start gap-3 rounded-xl border border-sky-100 bg-sky-50/50 p-4 text-xs text-sky-900 dark:border-sky-900/30 dark:bg-sky-950/20 dark:text-sky-200">
              <Lightbulb className="h-4 w-4 shrink-0 text-sky-600 dark:text-sky-400 mt-0.5" />
              <p className="leading-relaxed">
                To make your preparation easier, we&apos;ve provided two answer variations for each question. Feel free to practice whichever best fits your interview style!
              </p>
            </div>

            {/* Answer Mode Pills */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab("easy")}
                className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "easy"
                    ? "bg-slate-900 text-white shadow-sm dark:bg-slate-100 dark:text-slate-900"
                    : "bg-muted/70 text-muted-foreground hover:text-foreground"
                }`}
              >
                Easy Answer
              </button>
              <button
                onClick={() => setActiveTab("advanced")}
                className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "advanced"
                    ? "bg-slate-900 text-white shadow-sm dark:bg-slate-100 dark:text-slate-900"
                    : "bg-muted/70 text-muted-foreground hover:text-foreground"
                }`}
              >
                Advanced Answer
              </button>
            </div>

            {/* Answer Explanation */}
            <div className="space-y-3 border-l-2 border-slate-300 pl-4 py-1 text-sm leading-relaxed text-muted-foreground dark:border-slate-700">
              <p>{currentAnswer?.explanation || "No explanation provided for this level."}</p>
            </div>

            {/* Key Points */}
            {keyPoints.length > 0 && (
              <div className="rounded-xl border border-border/60 bg-card/60 p-4 space-y-2.5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Key Points
                </p>
                <ul className="space-y-2">
                  {keyPoints.map((kp, i) => (
                    <li
                      key={kp._id || i}
                      className="flex items-start gap-2 text-sm leading-relaxed text-foreground/90"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-[var(--color-brand-accent)]" />
                      <span>{kp.point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
