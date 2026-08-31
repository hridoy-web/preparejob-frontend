import Link from "next/link";
import { ArrowUpRight, BadgeCheck } from "lucide-react";

import type { TechStackItem } from "@/types/tech-stack";
import { TechnologyIcon } from "@/components/home/TechStackSection/technology-icon";

interface TechStackCardProps {
  tech: TechStackItem;
}

const DIFFICULTY_STYLES: Record<TechStackItem["difficulty"], string> = {
  Easy: "text-emerald-600 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-950/50 dark:border-emerald-900",
  Medium:
    "text-amber-600 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-950/50 dark:border-amber-900",
  Hard: "text-rose-600 bg-rose-50 border-rose-200 dark:text-rose-400 dark:bg-rose-950/50 dark:border-rose-900",
};

export default function TechStackCard({ tech }: TechStackCardProps) {
  return (
    <Link
      href={`/interview/${tech.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-brand-surface p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-accent/70 hover:shadow-2xl hover:shadow-brand-accent/10 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:bg-slate-900"
    >
      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-cyan-400 via-brand-accent to-fuchsia-400 opacity-50 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="flex flex-1 flex-col">
        {/* Top block */}
        <div className="flex items-start justify-between gap-3">
          {/* Left column — takes remaining space, title never truncates */}
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl border border-brand-accent/20 bg-brand-accent/10 p-3.5 text-brand-accent shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 dark:border-brand-accent/30 dark:bg-brand-accent/15">
              <TechnologyIcon name={tech.iconName} className="size-12" />
            </div>

            <div className="min-w-0">
              <h3 className="font-urbanist text-2xl font-extrabold leading-tight text-slate-900 transition-colors group-hover:text-brand-accent dark:text-white">
                {tech.name}
              </h3>
              <span className="mt-0.5 block text-[11px] font-semibold text-slate-400">
                {tech.category}
              </span>
            </div>
          </div>

          {/* Right column — fixed narrow width, never squeezes the title */}
          <div className="flex w-24 shrink-0 flex-col items-end justify-between gap-3 self-stretch">
            <span
              className={`w-fit rounded-full border px-2.5 py-1 text-[10px] font-bold ${DIFFICULTY_STYLES[tech.difficulty]}`}
            >
              {tech.difficulty}
            </span>

            <span className="w-fit whitespace-nowrap font-mono text-sm font-bold text-brand-accent">
              {tech.questionCount}
              <span className="ml-1 text-[9px] font-semibold text-slate-400">
                Qs
              </span>
            </span>

            <span className="inline-flex w-fit items-center gap-1 rounded-full border border-brand-accent/20 bg-brand-accent/[0.06] px-2 py-1 text-[9px] font-bold leading-tight text-brand-accent">
              <BadgeCheck className="size-3 shrink-0" aria-hidden="true" />
              <span>AI feedback</span>
            </span>
          </div>
        </div>

        {/* Sample question — core value proof, light-theme highlighted box */}
        <div className="mt-5 flex flex-1 flex-col overflow-hidden rounded-xl border-2 border-brand-accent/20 bg-brand-accent/[0.04] dark:bg-brand-accent/[0.08]">
          <div className="flex items-center gap-1.5 border-b border-brand-accent/15 px-3 py-1.5">
            <span className="size-1.5 rounded-full bg-brand-accent/60" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-accent/70">
              Sample Question
            </span>
          </div>
          <p className="line-clamp-2 px-3.5 py-3.5 font-mono text-sm font-semibold leading-relaxed text-slate-800 dark:text-slate-100">
            <span className="text-brand-accent">&gt; </span>
            {tech.challengeQuestion}
          </p>
        </div>
      </div>

      {/* Footer — dominant CTA, always pinned to the bottom */}
      <div className="mt-5 flex items-center justify-center gap-1.5 rounded-xl bg-brand-accent py-3 text-sm font-bold text-white transition-colors duration-300 group-hover:bg-brand-accent/90">
        <span>Start Practicing</span>
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>
    </Link>
  );
}