import React from "react";
import {
  Bot,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  AlertTriangle,
  Zap,
  BrainCircuit
} from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

interface FeaturePoint {
  id: string;
  title: string;
  description: string;
}

const FEATURE_POINTS: FeaturePoint[] = [
  {
    id: "feat-1",
    title: "Instant Diagnostic Scoring",
    description: "Receive an objective 0–100 score on technical accuracy, terminology, and answer completeness within seconds."
  },
  {
    id: "feat-2",
    title: "Actionable Feedback & Edge Cases",
    description: "AI pinpoints missing technical terms, syntax errors, and missing edge cases missed in your initial attempt."
  },
  {
    id: "feat-3",
    title: "Recruiter-Grade Model Answers",
    description: "Compare your original output against high-scoring model answers crafted for top-tier tech interview benchmarks."
  }
];

export default function AIFeatureHighlight(): React.JSX.Element {
  return (
    <section
      aria-labelledby="ai-evaluator-heading"
      className="py-16 md:py-24 bg-[var(--color-brand-surface)] text-[var(--color-brand-primary)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <header className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/80 text-[var(--color-brand-accent)] text-xs sm:text-sm font-semibold mb-4 shadow-xs">
            <BrainCircuit className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Next-Gen Assessment Engine</span>
          </div>

          <h2
            id="ai-evaluator-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-slate-950"
          >
            AI-Powered <span className="ai-gradient-text">Answer Evaluator</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Eliminate interview guesswork. Get real-time automated assessment, technical breakdown, and optimal answers tailored for global remote tech roles.
          </p>
        </header>

        {/* Two-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* Left Feature Column */}
          <article className="lg:col-span-5 space-y-6">
            <header className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-accent)]">
                Automated Mentorship
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Train Like You’re Interviewing at Top Tech Companies
              </h3>
            </header>

            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Our evaluator checks your code and technical explanations against industry standards, giving you immediate clarity on where you stand.
            </p>

            {/* Feature List */}
            <ul className="space-y-4 pt-2" role="list">
              {FEATURE_POINTS.map((point) => (
                <li key={point.id} className="flex items-start gap-3.5">
                  <div className="p-1 rounded-full bg-indigo-50 text-[var(--color-brand-accent)] shrink-0 mt-0.5 border border-indigo-100">
                    <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm sm:text-base">{point.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-normal mt-0.5">{point.description}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <Button
                asChild
                size="lg"
                className="bg-[var(--color-brand-accent)] text-white hover:bg-indigo-700 transition-all duration-200 shadow-md shadow-indigo-100 active:scale-[0.98] cursor-pointer text-base px-4 py-4 h-auto"
              >
                <Link href="/explore" aria-label="Start practicing with the AI Answer Evaluator">
                  <span>Try AI Evaluator Now</span>
                  <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </article>

          {/* Right Live UI Interactive Mockup Column */}
          <figure className="lg:col-span-7 m-0" aria-label="Interactive AI Evaluator UI Showcase">
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xl shadow-slate-200/50 overflow-hidden">

              {/* Card Terminal Header */}
              <div className="bg-[var(--color-brand-primary)] px-5 py-4 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                    <Bot className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block">Evaluation Terminal</span>
                    <figcaption className="text-xs sm:text-sm font-medium text-white">Topic: React Async State & Hooks</figcaption>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                  Live Preview
                </span>
              </div>

              {/* Card Workspace Body */}
              <div className="p-5 sm:p-6 space-y-5">

                {/* Candidate Input Prompt */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                    Submitted Answer:
                  </span>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 font-mono leading-relaxed">
                    useEffect runs after every render. You can pass an empty dependency array to run it only once on mount.
                  </div>
                </div>

                {/* AI Score Meter & Insights Card */}
                <div className="p-4 sm:p-5 rounded-xl bg-indigo-50/40 border border-indigo-100 space-y-3.5">

                  {/* Meter Header */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[var(--color-brand-accent)]" aria-hidden="true" />
                      <span className="text-xs sm:text-sm font-bold text-slate-900">AI Quality Score</span>
                    </div>
                    <span className="text-base sm:text-lg font-black text-[var(--color-brand-accent)]">
                      78 / 100
                    </span>
                  </div>

                  {/* Progress Meter Bar */}
                  <div className="w-full bg-slate-200/80 h-2.5 rounded-full overflow-hidden" role="progressbar" aria-valuenow={78} aria-valuemin={0} aria-valuemax={100}>
                    <div className="bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 h-full w-[78%] rounded-full transition-all duration-500" />
                  </div>

                  {/* Feedback Micro-Card */}
                  <div className="pt-1">
                    <div className="flex items-start gap-2.5 text-amber-900 bg-amber-50/80 p-3 rounded-lg border border-amber-200/70 text-xs leading-relaxed">
                      <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" aria-hidden="true" />
                      <span><strong>Key Gap:</strong> You omitted mention of the cleanup function returned by <code className="bg-amber-100/80 px-1 py-0.5 rounded text-amber-950 font-mono text-[11px]">useEffect</code> to prevent memory leaks during unmounting.</span>
                    </div>
                  </div>
                </div>

                {/* AI Recommended Model Answer */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Recommended Model Answer:
                    </span>
                  </div>
                  <blockquote className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-200/70 text-xs sm:text-sm text-emerald-950 leading-relaxed not-italic m-0">
                    useEffect manages side effects in functional components. It executes after renders based on its dependency array and can return a cleanup function to unsubscribe listeners and clean up subscriptions before unmounting.
                  </blockquote>
                </div>

              </div>

            </div>
          </figure>

        </div>

      </div>
    </section>
  );
}