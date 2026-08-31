import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

import { getTechStacks } from "@/lib/api/tech-stack";
import TechStackCard from "./TechStackSection/TechStackCard";

export default async function TechStack() {
  const techStacks = await getTechStacks();

  const totalQuestions = techStacks.reduce(
    (sum, tech) => sum + tech.questionCount,
    0,
  );

  return (
    <section
      aria-labelledby="tech-stack-heading"
      className="relative overflow-hidden bg-background py-20 sm:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.12),transparent_38%)]"
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-accent/30 bg-brand-accent/10 px-3 py-1 text-xs font-semibold tracking-wide text-brand-accent">
            <Sparkles aria-hidden="true" className="size-3.5" />
            Tech Stack Ecosystem
          </span>

          <h2
            id="tech-stack-heading"
            className="mt-4 font-urbanist text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            Technologies you can{" "}
            <span className="ai-gradient-text">practice and master</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            Test your frontend, backend, database, and core engineering
            knowledge across the technologies modern development teams use
            every day — every answer analyzed by AI.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-lg font-bold text-foreground">
                {totalQuestions}+
              </span>
              <span className="text-muted-foreground">real questions</span>
            </div>
            <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-lg font-bold text-foreground">
                {techStacks.length}
              </span>
              <span className="text-muted-foreground">technologies</span>
            </div>
            <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-lg font-bold text-foreground">
                AI
              </span>
              <span className="text-muted-foreground">
                evaluates every answer
              </span>
            </div>
          </div>
        </header>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {techStacks.slice(0, 8).map((tech) => (
            <TechStackCard key={tech.id} tech={tech} />
          ))}
        </div>

        {/* Footer CTA */}
        <footer className="mt-6 flex flex-col items-center gap-3 border-t border-slate-200/70 pt-8 text-center dark:border-slate-800/70">
          <p className="text-sm font-medium text-muted-foreground">
            Think you know the stack? See every technology we cover.
          </p>

          <Link
            href="/interview"
            className="group inline-flex items-center gap-1.5 rounded-xl bg-brand-accent px-5 py-2.5 text-sm font-bold text-white transition-colors duration-300 hover:bg-brand-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <span>Explore all interview questions</span>
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </footer>
      </div>
    </section>
  );
}