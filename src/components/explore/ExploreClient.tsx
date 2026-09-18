"use client";

import { useMemo, useState } from "react";
import { TechItem } from "@/lib/api/explore/card-data";
import { TechCard } from "@/components/explore/TechCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Code2,
  Cpu,
  SlidersHorizontal,
  Layers,
  LayoutGrid,
  Search,
  TrendingUp,
} from "lucide-react";

export function ExploreClient({ initialItems }: { initialItems: TechItem[] }) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = useMemo(() => {
    const set = new Set(initialItems.map((item) => item.category));
    return ["All", ...Array.from(set)];
  }, [initialItems]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: initialItems.length };
    initialItems.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, [initialItems]);

  const avgPopularity = useMemo(() => {
    if (initialItems.length === 0) return 0;
    const total = initialItems.reduce((sum, item) => sum + item.popularity, 0);
    return Math.round(total / initialItems.length);
  }, [initialItems]);

  const filteredItems = useMemo(() => {
    return initialItems.filter((item) => {
      const matchesDifficulty =
        selectedDifficulty === "All" || item.difficulty === selectedDifficulty;
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      return matchesDifficulty && matchesCategory;
    });
  }, [initialItems, selectedDifficulty, selectedCategory]);

  const hasActiveFilters = selectedDifficulty !== "All" || selectedCategory !== "All";

  const resetFilters = () => {
    setSelectedDifficulty("All");
    setSelectedCategory("All");
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Hero Header */}
      <section className="relative overflow-hidden border-b border-border bg-background py-16 md:py-24">
        <div className="container relative mx-auto px-4 text-center">

          {/* Eyebrow Badge */}
          <div className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-1.5 text-[11px] font-semibold tracking-wide text-muted-foreground shadow-sm animate-in fade-in-0 slide-in-from-top-2 duration-500">
            <Sparkles className="h-3.5 w-3.5 text-foreground" />

            <span>YOUR JOURNEY TO TECHNICAL MASTERY</span>

            <span className="ml-1 h-1 w-1 rounded-full bg-foreground/40" />
          </div>

          {/* Main Heading */}
          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-[1.08] tracking-[-0.04em] text-foreground sm:text-5xl md:text-6xl lg:text-7xl animate-in fade-in-0 slide-in-from-bottom-3 duration-700">

            <span className="block">
              Master the{" "}

              <span className="relative inline-block">
                Technologies

                {/* Minimal Accent Underline */}
                <span
                  className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-foreground/80 sm:-bottom-2"
                  aria-hidden="true"
                />
              </span>
              .
            </span>

            <span className="mt-2 block text-muted-foreground md:mt-3">
              Ace Your Next Interview.
            </span>

          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base md:mt-8 md:leading-8 animate-in fade-in-0 duration-700 delay-100">
            Explore the technologies that power the modern web.
            Build your knowledge, sharpen your skills, and prepare
            for the technical questions that matter most.
          </p>

          {/* Statistics */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 text-xs font-medium text-muted-foreground sm:mt-10 sm:gap-3 animate-in fade-in-0 duration-700 delay-150">

            {/* Core Topics */}
            <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-2 transition-colors hover:bg-muted/60">
              <Code2 className="h-3.5 w-3.5 text-foreground" />
              <span>{initialItems.length} Core Topics</span>
            </div>

            {/* Categories */}
            <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-2 transition-colors hover:bg-muted/60">
              <Cpu className="h-3.5 w-3.5 text-foreground" />
              <span>{categories.length - 1} Categories</span>
            </div>

            {/* Average Popularity */}
            <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-2 transition-colors hover:bg-muted/60">
              <TrendingUp className="h-3.5 w-3.5 text-foreground" />
              <span>{avgPopularity}% Avg. Popularity</span>
            </div>

          </div>

        </div>
      </section>

      {/* Main Grid & Filters Content */}
      <main className="container mx-auto px-4 pt-8">
        <div className="flex flex-col gap-6 mb-8 rounded-2xl border border-border bg-card/50 p-5 shadow-xs">
          {/* Technology Type / Category Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <Layers className="h-4 w-4 text-[var(--color-brand-accent)]" />
                <span>What do you want to prepare for?</span>
              </div>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-[11px] font-semibold text-muted-foreground hover:text-foreground transition-colors underline-offset-2 hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                const count = categoryCounts[cat] || 0;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all border ${isActive
                        ? "bg-[var(--color-brand-accent)] text-white border-transparent shadow-xs scale-[1.03]"
                        : "bg-background border-border text-muted-foreground hover:border-foreground/20 hover:text-foreground"
                      }`}
                  >
                    <span>{cat}</span>
                    <Badge
                      variant="secondary"
                      className={`text-[10px] px-1.5 py-0 h-4 min-w-[18px] justify-center rounded-full font-bold ${isActive
                          ? "bg-white/20 text-white border-none"
                          : "bg-muted text-muted-foreground"
                        }`}
                    >
                      {count}
                    </Badge>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="h-[1px] w-full bg-border/60" />

          {/* Difficulty Level Selection */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 overflow-x-auto">
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground shrink-0">
                <SlidersHorizontal className="h-4 w-4 text-[var(--color-brand-accent)]" />
                <span>What's your current level:</span>
              </span>

              <div className="flex items-center gap-1.5">
                {["All", "Beginner", "Intermediate", "Advanced"].map((level) => {
                  const isActive = selectedDifficulty === level;
                  return (
                    <Button
                      key={level}
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setSelectedDifficulty(level)}
                      className={`rounded-lg text-xs font-semibold h-8 px-3 ${isActive
                          ? "bg-primary text-primary-foreground shadow-xs"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                    >
                      {level}
                    </Button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium self-end sm:self-auto">
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>Showing {filteredItems.length} topics</span>
            </div>
          </div>
        </div>

        {/* Card Grid Output */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="h-full animate-in fade-in-0 slide-in-from-bottom-3 fill-mode-both"
                style={{
                  animationDelay: `${Math.min(index, 8) * 60}ms`,
                  animationDuration: "500ms",
                }}
              >
                <TechCard item={item} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 border border-dashed border-border rounded-2xl bg-card/30 space-y-3 animate-in fade-in-0 duration-300">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-foreground text-base font-bold">No matching technologies found</p>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              There are no available topics matching your selected difficulty level for this category.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={resetFilters}
              className="mt-2 text-xs font-semibold rounded-lg"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}