import Link from "next/link";
import { ArrowUpRight, Flame } from "lucide-react";

import type { HotTopic } from "@/types/hot-topic";
import TopicIcon from "@/components/home/HotTopicsSection/TopicIcon";

interface TopicCardProps {
  topic: HotTopic;
}

export default function TopicCard({ topic }: TopicCardProps) {
  return (
    <article className="h-full">
      <Link
        href={`/interview/${topic.slug}`}
        aria-label={`Explore ${topic.name} interview questions`}
        className="group relative flex h-full min-h-[260px] flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-brand-surface p-6 shadow-sm outline-none transition-[border-color,box-shadow,transform] duration-500 ease-out hover:-translate-y-1.5 hover:border-brand-accent/70 hover:shadow-2xl hover:shadow-brand-accent/10 focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-slate-800 dark:bg-slate-900/60 dark:hover:bg-slate-900"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-cyan-400 via-brand-accent to-fuchsia-400 opacity-50 transition-opacity duration-300 group-hover:opacity-100"
        />

        <header className="flex items-start justify-between gap-4">
          <span className="flex size-20 shrink-0 items-center justify-center rounded-2xl border border-brand-accent/20 bg-brand-accent/10 p-3.5 text-brand-accent shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 dark:border-brand-accent/30 dark:bg-brand-accent/15">
            <TopicIcon
              name={topic.icon}
              className="size-12 transition-transform duration-300 group-hover:scale-105"
            />
          </span>
        </header>

        <div className="mt-6">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-urbanist text-2xl font-extrabold leading-tight text-slate-900 transition-colors group-hover:text-brand-accent dark:text-white">
              {topic.name}
            </h3>

            {/* Hot Badge Updated: Distinct Orange/Red highlight */}
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-orange-500/30 bg-orange-500/10 px-2 py-0.5 text-[10px] font-bold text-orange-600 dark:border-orange-400/30 dark:bg-orange-400/15 dark:text-orange-400">
              <Flame
                aria-hidden="true"
                className="size-3 fill-orange-500 text-orange-500 dark:fill-orange-400 dark:text-orange-400"
              />
              Hot
            </span>
          </div>

          <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
            {topic.description}
          </p>
        </div>

        <footer className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800/80 pt-5">
          <span className="text-xs leading-5 text-slate-500 dark:text-slate-400">
            {topic.questionCount} questions
            <span aria-hidden="true"> · </span>
            <span>English answers</span>
          </span>

          <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-brand-accent transition-colors group-hover:text-brand-accent/80">
            Practice {topic.name}
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </footer>
      </Link>
    </article>
  );
}