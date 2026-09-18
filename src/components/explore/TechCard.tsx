import Image from "next/image";
import Link from "next/link";
import { TechItem } from "@/lib/api/explore/card-data";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  ArrowUpRight,
  CheckCircle2,
  Flame,
  Sparkles,
  Star,
  BookOpen,
  ChevronRight,
} from "lucide-react";

interface TechCardProps {
  item: TechItem;
}

export function TechCard({ item }: TechCardProps) {
  const difficultyColor = {
    Beginner:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    Intermediate:
      "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400",
    Advanced:
      "border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-400",
  }[item.difficulty];

  const isTrending = item.popularity >= 85;

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-all duration-500 hover:-translate-y-2 hover:border-[var(--color-brand-accent)]/50 hover:shadow-2xl hover:shadow-[var(--color-brand-accent)]/10">
      {/* Decorative Background Glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[var(--color-brand-accent)]/5 blur-3xl transition-all duration-500 group-hover:bg-[var(--color-brand-accent)]/15" />

      {/* Top Hover Accent */}
      <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-cyan-400 via-[var(--color-brand-accent)] to-purple-500 transition-transform duration-500 group-hover:scale-x-100" />

      {/* Trending Badge */}
      {isTrending && (
        <div className="absolute right-5 top-5 z-20 inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-[10px] font-bold tracking-wide text-amber-600 dark:text-amber-400">
          <Star className="h-3 w-3 fill-current" />
          TRENDING
        </div>
      )}

      <CardHeader className="relative space-y-5 p-6 pb-4">
        {/* Logo and Main Information */}
        <div className="flex items-start gap-4">
          <div className="relative flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-2xl border border-border/70 bg-muted/50 p-3 shadow-sm transition-all duration-500 group-hover:scale-105 group-hover:border-[var(--color-brand-accent)]/40 group-hover:bg-[var(--color-brand-accent)]/5">
            <div className="absolute inset-0 rounded-2xl bg-[var(--color-brand-accent)]/0 blur-xl transition-all duration-500 group-hover:bg-[var(--color-brand-accent)]/10" />

            <Image
              src={item.logo}
              alt={`${item.name} logo`}
              width={42}
              height={42}
              className="relative object-contain transition-transform duration-500 group-hover:scale-110"
              unoptimized
            />
          </div>

          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex items-center gap-1">
              <CardTitle className="truncate text-xl font-bold tracking-tight transition-colors duration-300 group-hover:text-[var(--color-brand-accent)]">
                {item.name}
              </CardTitle>

              <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--color-brand-accent)] opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-md border px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${difficultyColor}`}
              >
                {item.difficulty}
              </span>

              <span className="text-xs font-medium text-muted-foreground">
                {item.category}
              </span>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex min-h-[28px] flex-wrap gap-1.5">
          {item.tags.slice(0, 5).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-md border border-border/70 bg-muted/40 px-2 py-1 text-[10px] font-medium text-muted-foreground transition-colors duration-200 hover:border-[var(--color-brand-accent)]/30 hover:text-foreground"
            >
              <Flame className="h-3 w-3 text-amber-500" />
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <CardDescription className="line-clamp-3 min-h-[60px] text-sm leading-6 text-muted-foreground">
          {item.summary}
        </CardDescription>
      </CardHeader>

      <CardContent className="relative flex flex-1 flex-col px-6 pb-6 pt-2">
        {/* Learning Topics */}
        <div className="flex flex-1 flex-col rounded-xl border border-border/70 bg-muted/20 p-4 transition-colors duration-300 group-hover:border-[var(--color-brand-accent)]/20">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-brand-accent)]/10 text-[var(--color-brand-accent)]">
                <BookOpen className="h-3.5 w-3.5" />
              </div>

              <div>
                <h3 className="text-xs font-bold text-foreground">
                  What You&apos;ll Master
                </h3>
                <p className="text-[10px] text-muted-foreground">
                  Key interview topics
                </p>
              </div>
            </div>

            <Sparkles className="h-4 w-4 text-[var(--color-brand-accent)]/60" />
          </div>

          <ul className="space-y-3">
            {item.services.slice(0, 5).map((service, index) => (
              <li
                key={`${service}-${index}`}
                className="group/topic flex items-start gap-2.5"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />

                <span className="text-xs leading-5 text-muted-foreground transition-colors group-hover/topic:text-foreground">
                  {service}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>

      <CardFooter className="relative mt-auto flex flex-col gap-4 border-t border-border/70 bg-muted/20 px-6 py-5">
        {/* Popularity */}
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Flame className="h-3.5 w-3.5 text-amber-500" />
              <span className="font-medium">Popularity</span>
            </div>

            <span className="font-bold text-foreground">
              {item.popularity}%
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-[var(--color-brand-accent)] to-purple-500 transition-all duration-1000 ease-out group-hover:brightness-110"
              style={{ width: `${item.popularity}%` }}
            />
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href={`/explore/${item.id}`}
          className="group/button relative flex w-full items-center justify-between overflow-hidden rounded-xl bg-[var(--color-brand-accent)] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--color-brand-accent)]/10 transition-all duration-300 hover:brightness-110 hover:shadow-[var(--color-brand-accent)]/25 active:scale-[0.98]"
        >
          <span className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 transition-transform duration-300 group-hover/button:rotate-12" />
            Start Preparing
          </span>

          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/15 transition-transform duration-300 group-hover/button:translate-x-0.5">
            <ChevronRight className="h-4 w-4" />
          </span>
        </Link>
      </CardFooter>
    </Card>
  );
}