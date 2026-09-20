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
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = useMemo(() => {
    const set = new Set(initialItems.map((item) => item.category));
    return ["All", ...Array.from(set)];
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

  const hasActiveFilters =
    selectedDifficulty !== "All" || selectedCategory !== "All";

  const resetFilters = () => {
    setSelectedDifficulty("All");
    setSelectedCategory("All");
  };

  return (
    <div className="min-h-screen bg-background pb-20 text-foreground font-lexend">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-background py-10 md:py-14">
        <div className="container relative mx-auto px-4 text-center">

          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-1.5 text-[11px] font-semibold tracking-wide text-muted-foreground shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-foreground" />
            <span>YOUR JOURNEY TO TECHNICAL MASTERY</span>
            <span className="ml-1 h-1 w-1 rounded-full bg-foreground/40" />
          </div>

          <h1 className="mx-auto max-w-4xl text-3xl font-extrabold leading-[1.1] tracking-[-0.04em] text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="block">
              Master{" "}
              <span className="relative inline-block">
                Technologies
                <span className="absolute -bottom-1 left-0 h-[2.5px] w-full rounded-full bg-foreground/80 sm:-bottom-1.5" aria-hidden="true" />
              </span>
              .
            </span>
            <span className="mt-1 block text-muted-foreground md:mt-2">
              Ace Your Next Interview.
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-xs leading-6 text-muted-foreground sm:text-sm md:leading-7">
            Explore the technologies that power the modern web. Build your knowledge, sharpen your skills, and prepare for the technical questions that matter most.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-muted-foreground">
            <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5">
              <Code2 className="h-3.5 w-3.5 text-foreground" />
              <span>{initialItems.length} Core Topics</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5">
              <Cpu className="h-3.5 w-3.5 text-foreground" />
              <span>{categories.length - 1} Categories</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-foreground" />
              <span>{avgPopularity}% Avg. Popularity</span>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-6">

        {/* Filter Section */}
        <div className="mb-6 rounded-3xl border border-slate-200/80 bg-white/90 p-4 sm:p-5 shadow-sm backdrop-blur-md space-y-4">

          {/* Top Row: Header & Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 text-slate-700">
              <Layers className="h-4 w-4 text-indigo-600" />
              <span className="text-xs font-bold uppercase tracking-wider">Prepare For Categories</span>
            </div>

            <div className="flex items-center gap-3">
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex h-8 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-950 cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                  Clear Filters
                </button>
              )}

              <div className="flex items-center gap-2 rounded-xl border border-slate-200/80 bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-700">
                <span>Showing <span className="text-indigo-600 font-bold">{filteredItems.length}</span> topics</span>
              </div>
            </div>
          </div>

          {/* Bottom Area: Completely Separate Scrollable Sections */}
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">

            {/* Category Pills (Independent Scroll Container) */}
            <div className="w-full overflow-x-auto pb-2 xl:pb-0 scrollbar-thin">
              <div className="flex items-center gap-1.5 w-max bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60">
                {categories.map((category) => {
                  const isActive = selectedCategory === category;
                  const count = categoryCounts[category] || 0;
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      className={`inline-flex h-9 shrink-0 items-center gap-1.5 rounded-xl px-3.5 text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? "bg-indigo-600 text-white shadow-xs"
                          : "text-slate-600 hover:bg-white hover:text-slate-950"
                      }`}
                    >
                      <span>{category}</span>
                      <span className={`flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold ${
                        isActive ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Difficulty Filter (Separate Box & Independent Scroll Container) */}
            <div className="w-full xl:w-auto overflow-x-auto pb-2 xl:pb-0 shrink-0 scrollbar-thin">
              <div className="flex items-center gap-2 w-max">
                <div className="flex items-center gap-1.5 text-slate-500 pr-1">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">Level:</span>
                </div>
                <div className="flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60">
                  {["All", "Beginner", "Intermediate", "Advanced"].map((level) => {
                    const isActive = selectedDifficulty === level;
                    return (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setSelectedDifficulty(level)}
                        className={`inline-flex h-9 shrink-0 items-center rounded-xl px-3.5 text-xs font-semibold transition-all cursor-pointer ${
                          isActive
                            ? "bg-slate-950 text-white shadow-xs"
                            : "text-slate-600 hover:bg-white hover:text-slate-950"
                        }`}
                      >
                        {level}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Technology Cards Grid */}
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
          <div className="space-y-3 rounded-3xl border border-dashed border-slate-200 bg-slate-50/50 px-4 py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
              <Search className="h-5 w-5" />
            </div>
            <p className="text-base font-bold text-slate-900">
              No matching technologies found
            </p>
            <p className="mx-auto max-w-sm text-xs text-slate-500">
              There are no available topics matching your selected difficulty level for this category.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={resetFilters}
              className="mt-2 rounded-xl text-xs font-semibold cursor-pointer"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}