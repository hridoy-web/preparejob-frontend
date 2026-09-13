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
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-muted/50 via-background to-background py-14 md:py-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[280px] bg-[var(--color-brand-accent)]/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute -top-10 right-[8%] h-40 w-40 rounded-full bg-cyan-400/10 blur-[90px] pointer-events-none hidden md:block" />
        <div className="absolute -bottom-10 left-[8%] h-40 w-40 rounded-full bg-purple-400/10 blur-[90px] pointer-events-none hidden md:block" />

        <div className="container relative mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/90 px-4 py-1.5 text-xs font-semibold text-foreground backdrop-blur shadow-xs mb-5 animate-in fade-in-0 slide-in-from-top-2 duration-500">
            <Sparkles className="h-3.5 w-3.5 text-[var(--color-brand-accent)]" />
            <span>Master Your Next Tech Interview</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl animate-in fade-in-0 slide-in-from-top-3 duration-700">
            Explore <span className="ai-gradient-text">Technologies</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base leading-relaxed animate-in fade-in-0 duration-700 delay-100">
            Browse curated frameworks, languages, and core tools asked by top engineering teams.
          </p>

          <div className="mt-7 flex flex-wrap justify-center items-center gap-3 text-xs sm:text-sm font-medium text-muted-foreground animate-in fade-in-0 duration-700 delay-150">
            <div className="flex items-center gap-2 rounded-lg bg-card/60 border border-border px-3 py-1.5 backdrop-blur-xs">
              <Code2 className="h-4 w-4 text-[var(--color-brand-accent)]" />
              <span>{initialItems.length} Core Topics</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-card/60 border border-border px-3 py-1.5 backdrop-blur-xs">
              <Cpu className="h-4 w-4 text-[var(--color-brand-accent)]" />
              <span>{categories.length - 1} Categories</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-card/60 border border-border px-3 py-1.5 backdrop-blur-xs">
              <TrendingUp className="h-4 w-4 text-[var(--color-brand-accent)]" />
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
                <span>Technology Type</span>
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
                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all border ${
                      isActive
                        ? "bg-[var(--color-brand-accent)] text-white border-transparent shadow-xs scale-[1.03]"
                        : "bg-background border-border text-muted-foreground hover:border-foreground/20 hover:text-foreground"
                    }`}
                  >
                    <span>{cat}</span>
                    <Badge
                      variant="secondary"
                      className={`text-[10px] px-1.5 py-0 h-4 min-w-[18px] justify-center rounded-full font-bold ${
                        isActive
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
                <span>Difficulty:</span>
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
                      className={`rounded-lg text-xs font-semibold h-8 px-3 ${
                        isActive
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