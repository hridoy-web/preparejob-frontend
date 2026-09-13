"use client";

import { useState } from "react";
import { Question } from "@/types/question";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Code2,
  Bookmark,
  ChevronDown,
  ChevronUp,
  Lightbulb,
} from "lucide-react";

interface QuestionCardProps {
  question: Question;
  index: number;
}

export function QuestionCard({ question, index }: QuestionCardProps) {
  const [isOpen, setIsOpen] = useState(index === 0); // Open first card by default
  const [activeTab, setActiveTab] = useState<"easy" | "advanced">("easy");
  const [isBookmarked, setIsBookmarked] = useState(false);

  const difficultyVariant = {
    Easy: "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800",
    Medium: "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800",
    Hard: "bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-800",
  }[question.difficulty];

  const currentAnswer =
    activeTab === "easy" ? question.easyAnswer : question.advancedAnswer;

  return (
    <Card className="overflow-hidden border border-border/60 bg-card/50 backdrop-blur-sm shadow-sm transition-all duration-200 hover:border-border">
      {/* Header Section */}
      <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3.5">
          {/* Code Icon Avatar */}
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
            <h3 className="text-lg font-bold tracking-tight text-foreground leading-snug">
              {question.title}
            </h3>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`h-9 w-9 rounded-lg border-border/80 transition-colors ${
              isBookmarked ? "text-amber-500 bg-amber-500/10 border-amber-500/30" : "text-muted-foreground"
            }`}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
          </Button>

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

      {/* Answer Panel Body */}
      {isOpen && (
        <div className="border-t border-border/50 bg-muted/20 p-6 space-y-5">
          {/* Preparation Tip Box */}
          <div className="flex items-start gap-3 rounded-xl border border-sky-100 bg-sky-50/50 p-4 text-xs text-sky-900 dark:border-sky-900/30 dark:bg-sky-950/20 dark:text-sky-200">
            <Lightbulb className="h-4 w-4 shrink-0 text-sky-600 dark:text-sky-400 mt-0.5" />
            <p className="leading-relaxed">
              To make your preparation easier, we&apos;ve provided two answer variations for each question. Feel free to practice whichever best fits your interview style!
            </p>
          </div>

          {/* Toggle Answer Mode Pills */}
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

          {/* Answer Description */}
          <div className="border-l-2 border-slate-300 dark:border-slate-700 pl-4 py-1 text-sm leading-relaxed text-muted-foreground space-y-3">
            <p>{currentAnswer?.explanation || "No explanation provided for this level."}</p>
          </div>
        </div>
      )}
    </Card>
  );
}