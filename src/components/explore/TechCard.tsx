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
import { ArrowUpRight, Flame, Sparkles } from "lucide-react";

interface TechCardProps {
  item: TechItem;
}

export function TechCard({ item }: TechCardProps) {
  const difficultyColor = {
    Beginner: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    Intermediate: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    Advanced: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
  }[item.difficulty];

  return (
    <Card className="group relative flex flex-col justify-between overflow-hidden border border-border bg-card/60 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--color-brand-accent)]/50 hover:shadow-xl hover:shadow-[var(--color-brand-accent)]/5">
      <div className="absolute inset-x-0 -top-px h-[2px] bg-gradient-to-r from-transparent via-[var(--color-brand-accent)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <CardHeader className="p-6">
        <div className="flex items-start justify-between gap-3">
          
          {/* Logo & Title Container */}
          <div className="flex items-center gap-3.5">
            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/60 p-2.5 group-hover:border-[var(--color-brand-accent)]/40 transition-colors shadow-sm">
              <Image
                src={item.logo}
                alt={`${item.name} logo`}
                width={36}
                height={36}
                className="object-contain dark:invert transition-transform duration-300 group-hover:scale-110"
                unoptimized
              />
            </div>

            <div className="space-y-1">
              <CardTitle className="text-xl font-bold tracking-tight transition-colors group-hover:text-[var(--color-brand-accent)] flex items-center gap-1">
                {item.name}
                <ArrowUpRight className="h-4 w-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[var(--color-brand-accent)]" />
              </CardTitle>
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-semibold ${difficultyColor}`}>
                  {item.difficulty}
                </span>
                <span className="text-[11px] font-medium text-muted-foreground">
                  {item.category}
                </span>
              </div>
            </div>
          </div>

          {/* Tag Badge */}
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground bg-muted/80 px-2.5 py-1 rounded-full border border-border shrink-0"
            >
              <Flame className="h-3 w-3 text-amber-500" />
              {tag}
            </span>
          ))}
        </div>

        <CardDescription className="text-sm line-clamp-2 mt-4 leading-relaxed text-muted-foreground">
          {item.summary}
        </CardDescription>
      </CardHeader>

      <CardContent className="px-6 pb-6 pt-0 flex-1">
        <p className="text-sm text-muted-foreground/90 line-clamp-3 leading-relaxed">
          {item.description}
        </p>
      </CardContent>

      <CardFooter className="border-t border-border bg-muted/30 px-6 py-4 flex flex-col gap-3">
        {/* Popularity Bar */}
        <div className="flex items-center gap-3 w-full text-xs text-muted-foreground">
          <span className="font-medium shrink-0">Popularity</span>
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden border border-border/50">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-[var(--color-brand-accent)] to-purple-400 rounded-full transition-all duration-500"
              style={{ width: `${item.popularity}%` }}
            />
          </div>
          <span className="font-semibold text-foreground shrink-0">{item.popularity}%</span>
        </div>

        {/* Minimalistic Start Preparing Button */}
        <Link
          href={`/explore/${item.id}`}
          className="group/btn relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-[var(--color-brand-accent)] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
        >
          <Sparkles className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:rotate-12" />
          <span>Start Preparing</span>
          <ArrowUpRight className="h-3.5 w-3.5 opacity-70 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 group-hover/btn:opacity-100" />
        </Link>
      </CardFooter>
    </Card>
  );
}