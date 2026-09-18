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
  Layers3,
} from "lucide-react";

interface TechCardProps {
  item: TechItem;
}

// Category-based color system
const categoryStyles: Record<
  string,
  {
    accent: string;
    softBg: string;
    border: string;
    text: string;
    gradient: string;
  }
> = {
  Frontend: {
    accent: "text-blue-600 dark:text-blue-400",
    softBg: "bg-blue-500/[0.07] dark:bg-blue-400/[0.08]",
    border: "border-blue-500/20",
    text: "text-blue-600 dark:text-blue-400",
    gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
  },

  Backend: {
    accent: "text-emerald-600 dark:text-emerald-400",
    softBg: "bg-emerald-500/[0.07] dark:bg-emerald-400/[0.08]",
    border: "border-emerald-500/20",
    text: "text-emerald-600 dark:text-emerald-400",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
  },

  Database: {
    accent: "text-violet-600 dark:text-violet-400",
    softBg: "bg-violet-500/[0.07] dark:bg-violet-400/[0.08]",
    border: "border-violet-500/20",
    text: "text-violet-600 dark:text-violet-400",
    gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
  },

  DevOps: {
    accent: "text-orange-600 dark:text-orange-400",
    softBg: "bg-orange-500/[0.07] dark:bg-orange-400/[0.08]",
    border: "border-orange-500/20",
    text: "text-orange-600 dark:text-orange-400",
    gradient: "from-orange-500/20 via-amber-500/10 to-transparent",
  },

  Tools: {
    accent: "text-cyan-600 dark:text-cyan-400",
    softBg: "bg-cyan-500/[0.07] dark:bg-cyan-400/[0.08]",
    border: "border-cyan-500/20",
    text: "text-cyan-600 dark:text-cyan-400",
    gradient: "from-cyan-500/20 via-sky-500/10 to-transparent",
  },
};

export function TechCard({ item }: TechCardProps) {
  const category =
    categoryStyles[item.category] ?? categoryStyles.Frontend;

  const difficultyStyles = {
    Beginner:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",

    Intermediate:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",

    Advanced:
      "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
  }[item.difficulty];

  const isTrending = item.popularity >= 85;

  return (
    <Card
      className={`
        group relative flex h-full flex-col overflow-hidden
        rounded-2xl border border-border/70
        bg-card transition-all duration-300 ease-out
        hover:-translate-y-1.5
        hover:border-border
        hover:shadow-xl hover:shadow-black/[0.04]
        dark:hover:shadow-black/20
      `}
    >
      {/* Subtle category background glow */}
      <div
        className={`
          pointer-events-none absolute inset-x-0 top-0 h-36
          bg-gradient-to-b ${category.gradient}
          opacity-60 transition-opacity duration-300
          group-hover:opacity-100
        `}
      />

      {/* Top accent line */}
      <div
        className={`
          absolute inset-x-0 top-0 h-[2px]
          bg-gradient-to-r from-transparent
          via-current to-transparent
          ${category.accent}
          opacity-0 transition-opacity duration-300
          group-hover:opacity-100
        `}
      />

      {/* Trending badge */}
      {isTrending && (
        <div
          className="
            absolute right-4 top-4 z-10
            inline-flex items-center gap-1.5
            rounded-full border border-amber-500/20
            bg-amber-500/10 px-2.5 py-1
            text-[10px] font-bold tracking-wide
            text-amber-600 dark:text-amber-400
          "
        >
          <Star className="h-3 w-3 fill-current" />
          Trending
        </div>
      )}

      {/* Header */}
      <CardHeader className="relative z-[1] p-6 pb-4">
        {/* Logo + title */}
        <div className="flex items-start gap-3.5">
          <div
            className={`
              relative flex h-14 w-14 shrink-0
              items-center justify-center
              rounded-2xl border
              ${category.border}
              ${category.softBg}
              p-2.5
              transition-all duration-300
              group-hover:scale-[1.04]
              group-hover:shadow-sm
            `}
          >
            <Image
              src={item.logo}
              alt={`${item.name} logo`}
              width={36}
              height={36}
              className="
                object-contain
                transition-transform duration-300
                group-hover:scale-110
              "
              unoptimized
            />
          </div>

          <div className="min-w-0 space-y-1.5 pt-0.5">
            <CardTitle
              className="
                flex items-center gap-1
                text-xl font-bold tracking-tight
                transition-colors duration-300
                group-hover:text-foreground
              "
            >
              <span className="truncate">{item.name}</span>

              <ArrowUpRight
                className={`
                  h-4 w-4 shrink-0
                  opacity-0
                  transition-all duration-300
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                  group-hover:opacity-100
                  ${category.accent}
                `}
              />
            </CardTitle>

            {/* Difficulty + category */}
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`
                  inline-flex items-center
                  rounded-md border
                  px-2 py-0.5
                  text-[10px] font-semibold
                  ${difficultyStyles}
                `}
              >
                {item.difficulty}
              </span>

              <span
                className={`
                  text-[11px] font-medium
                  ${category.accent}
                `}
              >
                {item.category}
              </span>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-4 flex min-h-[26px] flex-wrap gap-1.5">
          {item.tags.map((tag, index) => (
            <span
              key={tag}
              className="
                inline-flex items-center gap-1
                rounded-full border border-border/70
                bg-muted/40 px-2.5 py-1
                text-[11px] font-medium
                text-muted-foreground
                transition-colors duration-200
                group-hover:border-border
              "
            >
              {index === 0 && (
                <Flame className="h-3 w-3 text-orange-500" />
              )}

              {tag}
            </span>
          ))}
        </div>

        {/* Summary */}
        <CardDescription
          className="
            mt-4 min-h-[2.75rem]
            line-clamp-2
            text-sm leading-relaxed
            text-muted-foreground
          "
        >
          {item.summary}
        </CardDescription>
      </CardHeader>

      {/* Content */}
      <CardContent
        className="
          relative z-[1]
          flex flex-1 flex-col justify-between
          gap-4 px-6 pb-6 pt-0
        "
      >
        {item.services && item.services.length > 0 && (
          <div
            className={`
              space-y-3 rounded-xl border
              ${category.border}
              ${category.softBg}
              p-4
              transition-colors duration-300
              group-hover:bg-opacity-100
            `}
          >
            {/* Section heading */}
            <div
              className={`
                flex items-center gap-2
                text-[11px] font-bold
                uppercase tracking-wider
                ${category.accent}
              `}
            >
              <div
                className="
                  flex h-6 w-6 items-center justify-center
                  rounded-md bg-background/70
                "
              >
                <Sparkles className="h-3.5 w-3.5" />
              </div>

              <span>What You&apos;ll Master</span>
            </div>

            {/* Services */}
            <ul className="space-y-2.5">
              {item.services.map((service, index) => (
                <li
                  key={index}
                  className="
                    flex items-start gap-2
                    text-xs leading-snug
                    text-muted-foreground
                  "
                >
                  <CheckCircle2
                    className={`
                      mt-0.5 h-3.5 w-3.5
                      shrink-0 ${category.accent}
                    `}
                  />

                  <span className="line-clamp-2">{service}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>

      {/* Footer */}
      <CardFooter
        className="
          relative z-[1]
          mt-auto flex flex-col gap-4
          border-t border-border/70
          bg-muted/20 px-6 py-4
        "
      >
        {/* Popularity */}
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Flame className="h-3.5 w-3.5 text-orange-500" />
              <span className="font-medium">Popularity</span>
            </div>

            <span className="font-semibold text-foreground">
              {item.popularity}%
            </span>
          </div>

          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className={`
                h-full rounded-full
                bg-gradient-to-r
                from-blue-500 via-[var(--color-brand-accent)]
                to-violet-500
                transition-all duration-700 ease-out
              `}
              style={{
                width: `${item.popularity}%`,
              }}
            />
          </div>
        </div>

        {/* CTA */}
        <Link
          href={`/explore/${item.id}`}
          className={`
            group/btn relative inline-flex w-full
            items-center justify-center gap-2
            overflow-hidden rounded-xl
            bg-[var(--color-brand-accent)]
            px-4 py-3
            text-xs font-semibold text-white
            shadow-sm
            transition-all duration-300
            hover:brightness-110
            hover:shadow-md
            active:scale-[0.98]
          `}
        >
          {/* Button shine effect */}
          <span
            className="
              absolute inset-0
              -translate-x-full
              bg-gradient-to-r
              from-transparent via-white/10 to-transparent
              transition-transform duration-700
              group-hover/btn:translate-x-full
            "
          />

          <Sparkles
            className="
              relative h-3.5 w-3.5
              transition-transform duration-300
              group-hover/btn:rotate-12
            "
          />

          <span className="relative">Start Preparing</span>

          <ArrowUpRight
            className="
              relative h-3.5 w-3.5
              opacity-70
              transition-all duration-300
              group-hover/btn:translate-x-0.5
              group-hover/btn:-translate-y-0.5
              group-hover/btn:opacity-100
            "
          />
        </Link>
      </CardFooter>
    </Card>
  );
}