import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

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
        className="group relative flex h-full min-h-[250px] flex-col overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm outline-none transition-[border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-1 hover:border-brand-accent/40 hover:shadow-[0_18px_40px_-24px_rgba(99,102,241,0.6)] focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 sm:p-6"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-10 top-0 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-brand-accent to-transparent transition-transform duration-300 ease-out group-hover:scale-x-100"
        />

        <header className="flex items-start justify-between gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-accent/10 text-brand-accent transition-[background-color,color,transform] duration-200 ease-out group-hover:scale-105 group-hover:bg-brand-accent group-hover:text-primary-foreground">
            <TopicIcon name={topic.icon} />
          </span>

          <span className="flex size-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-[border-color,color,transform] duration-200 ease-out group-hover:-translate-y-0.5 group-hover:border-brand-accent/30 group-hover:text-brand-accent">
            <ArrowUpRight
              aria-hidden="true"
              className="size-4"
            />
          </span>
        </header>

        <div className="mt-6">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            {topic.name}
          </h3>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {topic.description}
          </p>
        </div>

        <footer className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-8">
          <span className="text-xs text-muted-foreground">
            {topic.questionCount} questions
            <span aria-hidden="true"> · </span>
            <span>English answers</span>
          </span>

          <span className="inline-flex items-center gap-1 text-xs font-medium text-brand-accent">
            Explore {topic.name} questions
          </span>
        </footer>
      </Link>
    </article>
  );
}