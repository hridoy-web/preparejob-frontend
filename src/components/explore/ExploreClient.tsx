"use client";

import { useMemo, useState } from "react";
import { TechItem } from "@/lib/api/explore/card-data";
import { TechCard } from "@/components/explore/TechCard";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Code2,
  Cpu,
  Layers,
  LayoutGrid,
  Search,
  TrendingUp,
  SlidersHorizontal,
  X,
} from "lucide-react";

const DIFFICULTY_LEVELS = [
  "All",
  "Beginner",
  "Intermediate",
  "Advanced",
] as const;

export function ExploreClient({
  initialItems,
}: {
  initialItems: TechItem[];
}) {
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<string>("All");

  const [selectedCategory, setSelectedCategory] =
    useState<string>("All");

  const categories = useMemo(() => {
    const uniqueCategories = new Set(
      initialItems.map((item) => item.category)
    );

    return ["All", ...Array.from(uniqueCategories)];
  }, [initialItems]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      All: initialItems.length,
    };

    initialItems.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });

    return counts;
  }, [initialItems]);

  const avgPopularity = useMemo(() => {
    if (initialItems.length === 0) return 0;

    const total = initialItems.reduce(
      (sum, item) => sum + item.popularity,
      0
    );

    return Math.round(total / initialItems.length);
  }, [initialItems]);

  const filteredItems = useMemo(() => {
    return initialItems.filter((item) => {
      const matchesDifficulty =
        selectedDifficulty === "All" ||
        item.difficulty === selectedDifficulty;

      const matchesCategory =
        selectedCategory === "All" ||
        item.category === selectedCategory;

      return matchesDifficulty && matchesCategory;
    });
  }, [initialItems, selectedDifficulty, selectedCategory]);

  const hasActiveFilters =
    selectedDifficulty !== "All" || selectedCategory !== "All";

  const resetFilters = () => {
    setSelectedDifficulty("All");
    setSelectedCategory("All");
  };

  return (
    <div className="min-h-screen bg-background pb-20 text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-background py-16 md:py-24">
        <div className="container relative mx-auto px-4 text-center">
          <div className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-1.5 text-[11px] font-semibold tracking-wide text-muted-foreground shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-foreground" />
            <span>YOUR JOURNEY TO TECHNICAL MASTERY</span>
            <span className="ml-1 h-1 w-1 rounded-full bg-foreground/40" />
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-[1.08] tracking-[-0.04em] text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block">
              Master{" "}
              <span className="relative inline-block">
                Technologies
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

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base md:mt-8 md:leading-8">
            Explore the technologies that power the modern web. Build your
            knowledge, sharpen your skills, and prepare for the technical
            questions that matter most.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 text-xs font-medium text-muted-foreground sm:mt-10 sm:gap-3">
            <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-2 transition-colors hover:bg-muted/60">
              <Code2 className="h-3.5 w-3.5 text-foreground" />
              <span>{initialItems.length} Core Topics</span>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-2 transition-colors hover:bg-muted/60">
              <Cpu className="h-3.5 w-3.5 text-foreground" />
              <span>{categories.length - 1} Categories</span>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-2 transition-colors hover:bg-muted/60">
              <TrendingUp className="h-3.5 w-3.5 text-foreground" />
              <span>{avgPopularity}% Avg. Popularity</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-8">
        {/* Filters */}
        <section
          aria-label="Technology filters"
          className="mb-8 rounded-2xl border border-border bg-card p-2 shadow-sm"
        >
          <div className="flex flex-col gap-3 rounded-xl bg-muted/20 p-3 sm:p-4 md:flex-row md:items-center md:gap-3">
            {/* Categories */}
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-background">
                <Layers className="h-4 w-4 text-[var(--color-brand-accent)]" />
              </div>

              <div className="min-w-0 flex-1">
                <span className="sr-only">Prepare for</span>

                <div className="relative min-w-0">
                  <div
                    className="flex min-w-0 gap-1.5 overflow-x-auto rounded-xl border border-border/70 bg-background p-1 scrollbar-none"
                    role="group"
                    aria-label="Filter by category"
                  >
                    {categories.map((category) => {
                      const isActive = selectedCategory === category;
                      const count = categoryCounts[category] || 0;

                      return (
                        <button
                          key={category}
                          type="button"
                          onClick={() => setSelectedCategory(category)}
                          aria-pressed={isActive}
                          className={`group inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent)] focus-visible:ring-offset-1 ${isActive
                              ? "bg-[var(--color-brand-accent)] text-white shadow-sm"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                        >
                          <span>{category}</span>

                          <span
                            className={`flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold ${isActive
                                ? "bg-white/20 text-white"
                                : "bg-muted text-muted-foreground group-hover:bg-background"
                              }`}
                          >
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div
                    className="pointer-events-none absolute inset-y-0 right-0 hidden w-6 rounded-r-xl bg-gradient-to-l from-background to-transparent sm:block"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden h-9 w-px shrink-0 bg-border md:block" />

            {/* Difficulty */}
            <div className="flex min-w-0 shrink-0 items-center gap-2">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-background">
                <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              </div>

              <div
                className="flex min-w-0 gap-1 overflow-x-auto rounded-xl border border-border/70 bg-background p-1 scrollbar-none"
                role="group"
                aria-label="Filter by difficulty"
              >
                {DIFFICULTY_LEVELS.map((level) => {
                  const isActive = selectedDifficulty === level;

                  return (
                    <Button
                      key={level}
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedDifficulty(level)}
                      aria-pressed={isActive}
                      className={`h-8 shrink-0 rounded-lg px-3 text-xs font-semibold outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent)] focus-visible:ring-offset-1 ${isActive
                          ? "bg-foreground text-background shadow-sm hover:bg-foreground/90 hover:text-background"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                    >
                      {level}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Clear Filters */}
            <div
              className={`grid transition-all duration-300 ease-out ${hasActiveFilters
                  ? "grid-cols-[1fr] opacity-100"
                  : "grid-cols-[0fr] opacity-0"
                }`}
              aria-hidden={!hasActiveFilters}
            >
              <div className="flex min-w-0 overflow-hidden">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  tabIndex={hasActiveFilters ? 0 : -1}
                  disabled={!hasActiveFilters}
                  className={`group h-9 shrink-0 gap-1.5 rounded-xl border border-border bg-background px-3 text-xs font-semibold text-muted-foreground transition-all duration-300 hover:bg-muted hover:text-foreground md:border-0 md:bg-transparent ${hasActiveFilters
                      ? "translate-x-0"
                      : "-translate-x-2"
                    }`}
                >
                  <X className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-90" />
                  Clear
                </Button>
              </div>
            </div>

            {/* Results */}
            <div className="flex shrink-0 items-center justify-between border-t border-border/60 pt-3 md:border-t-0 md:pt-0">
              <div className="flex items-center gap-2 rounded-xl border border-border/70 bg-background px-3 py-2 text-xs font-medium text-muted-foreground">
                <LayoutGrid className="h-3.5 w-3.5" />

                <span>
                  <span className="font-bold text-foreground">
                    {filteredItems.length}
                  </span>{" "}
                  topics
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Cards */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="h-full animate-in fill-mode-both fade-in-0 slide-in-from-bottom-3"
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
          <div className="space-y-3 rounded-2xl border border-dashed border-border bg-card/30 px-4 py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>

            <p className="text-base font-bold text-foreground">
              No matching technologies found
            </p>

            <p className="mx-auto max-w-sm text-xs text-muted-foreground">
              There are no available topics matching your selected difficulty
              level for this category.
            </p>

            <Button
              variant="outline"
              size="sm"
              onClick={resetFilters}
              className="mt-2 rounded-lg text-xs font-semibold"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}