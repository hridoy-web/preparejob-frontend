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
  Layers,
  LayoutGrid,
  Search,
  TrendingUp,
  SlidersHorizontal,
  X,
} from "lucide-react";

export function ExploreClient({
  initialItems,
}: {
  initialItems: TechItem[];
}) {
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<string>("All");

  const [selectedCategory, setSelectedCategory] =
    useState<string>("All");

  // Get all available categories
  const categories = useMemo(() => {
    const set = new Set(initialItems.map((item) => item.category));

    return ["All", ...Array.from(set)];
  }, [initialItems]);

  // Calculate category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      All: initialItems.length,
    };

    initialItems.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });

    return counts;
  }, [initialItems]);

  // Calculate average popularity
  const avgPopularity = useMemo(() => {
    if (initialItems.length === 0) return 0;

    const total = initialItems.reduce(
      (sum, item) => sum + item.popularity,
      0
    );

    return Math.round(total / initialItems.length);
  }, [initialItems]);

  // Filter technologies
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

  // Check for active filters
  const hasActiveFilters =
    selectedDifficulty !== "All" || selectedCategory !== "All";

  // Reset all filters
  const resetFilters = () => {
    setSelectedDifficulty("All");
    setSelectedCategory("All");
  };

  return (
    <div className="min-h-screen bg-background pb-20 text-foreground">
      {/* =====================================================
          HERO SECTION
      ===================================================== */}
      <section className="relative overflow-hidden border-b border-border bg-background py-16 md:py-24">
        <div className="container relative mx-auto px-4 text-center">
          {/* Eyebrow */}
          <div className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-1.5 text-[11px] font-semibold tracking-wide text-muted-foreground shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-foreground" />

            <span>YOUR JOURNEY TO TECHNICAL MASTERY</span>

            <span className="ml-1 h-1 w-1 rounded-full bg-foreground/40" />
          </div>

          {/* Main Heading */}
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

          {/* Subtitle */}
          <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base md:mt-8 md:leading-8">
            Explore the technologies that power the modern web. Build your
            knowledge, sharpen your skills, and prepare for the technical
            questions that matter most.
          </p>

          {/* Statistics */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 text-xs font-medium text-muted-foreground sm:mt-10 sm:gap-3">
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

            {/* Popularity */}
            <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-2 transition-colors hover:bg-muted/60">
              <TrendingUp className="h-3.5 w-3.5 text-foreground" />
              <span>{avgPopularity}% Avg. Popularity</span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}
      <main className="container mx-auto px-4 pt-8">
        {/* =====================================================
            FILTER BAR
        ===================================================== */}
        <div className="mb-8 rounded-2xl border border-border bg-card p-2 shadow-sm">
          <div className="flex min-w-max items-center gap-2 overflow-x-auto rounded-xl bg-muted/30 p-2 scrollbar-none">

            {/* ---------------------------------------------
                CATEGORY FILTERS
            --------------------------------------------- */}
            <div className="flex shrink-0 items-center gap-2">
              {/* Category Label */}
              <div className="flex items-center gap-2 px-2">
                <Layers className="h-4 w-4 text-[var(--color-brand-accent)]" />

                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Prepare For
                </span>
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 rounded-xl border border-border/70 bg-background p-1">
                {categories.map((category) => {
                  const isActive = selectedCategory === category;
                  const count = categoryCounts[category] || 0;

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      aria-pressed={isActive}
                      className={`group inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold transition-all duration-200 ${
                        isActive
                          ? "bg-[var(--color-brand-accent)] text-white shadow-sm"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <span>{category}</span>

                      <span
                        className={`flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold ${
                          isActive
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
            </div>

            {/* ---------------------------------------------
                DIVIDER
            --------------------------------------------- */}
            <div className="mx-1 h-8 w-px shrink-0 bg-border" />

            {/* ---------------------------------------------
                DIFFICULTY FILTERS
            --------------------------------------------- */}
            <div className="flex shrink-0 items-center gap-2">
              <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground" />

              <div className="flex items-center gap-1 rounded-xl border border-border/70 bg-background p-1">
                {["All", "Beginner", "Intermediate", "Advanced"].map(
                  (level) => {
                    const isActive = selectedDifficulty === level;

                    return (
                      <Button
                        key={level}
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedDifficulty(level)}
                        className={`h-8 shrink-0 rounded-lg px-3 text-xs font-semibold transition-all duration-200 ${
                          isActive
                            ? "bg-foreground text-background shadow-sm hover:bg-foreground/90 hover:text-background"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        {level}
                      </Button>
                    );
                  }
                )}
              </div>
            </div>

            {/* ---------------------------------------------
                CLEAR FILTERS
            --------------------------------------------- */}
            {hasActiveFilters && (
              <>
                <div className="mx-1 h-6 w-px shrink-0 bg-border" />

                <button
                  type="button"
                  onClick={resetFilters}
                  className="group inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5 transition-transform group-hover:rotate-90" />
                  Clear
                </button>
              </>
            )}

            {/* ---------------------------------------------
                TOPIC COUNTER
            --------------------------------------------- */}
            <div className="ml-auto flex shrink-0 items-center gap-2 rounded-lg border border-border/60 bg-background px-3 py-2 text-xs font-medium text-muted-foreground shadow-xs">
              <LayoutGrid className="h-3.5 w-3.5" />

              <span>
                Showing{" "}
                <span className="font-bold text-foreground">
                  {filteredItems.length}
                </span>{" "}
                topics
              </span>
            </div>
          </div>
        </div>

        {/* =====================================================
            TECHNOLOGY CARDS
        ===================================================== */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
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
          /* Empty State */
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