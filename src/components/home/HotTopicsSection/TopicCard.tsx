import { HotTopic } from "@/types/hot-topic";
import { ArrowUpRight, Code2 } from "lucide-react";
import Link from "next/link";

interface TopicCardProps {
    topic: HotTopic;
}

export default function TopicCard({
    topic,
}: TopicCardProps) {
    return (
        <article className="h-full">
            <Link
                href={`/interview/${topic.slug}`}
                aria-label={`explore ${topic.name} interview questions`}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-sm outline-none transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-brand-accent/40 hover:shadow-md focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 sm:p-6"
            >
                <header className="flex items-start justify-between gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-accent/10 text-brand-accent transition-colors duration-200 group-hover:bg-brand-accent group-hover:text-brand-accent-foreground">
                        <Code2
                            aria-hidden="true"
                            className="size-5"
                        />
                    </span>

                    <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 text-muted-foreground transition-[color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-accent"
                    />
                </header>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold tracking-tight text-foreground">
                        {topic.name}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {topic.description}
                    </p>
                </div>

                <footer className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-7">
                    <span className="text-xs text-muted-foreground">
                        {topic.questionCount} interview questions
                    </span>

                    <span className="text-xs font-medium text-brand-accent">
                        Explore {topic.name} questions
                    </span>
                </footer>
            </Link>
        </article>
    )
}