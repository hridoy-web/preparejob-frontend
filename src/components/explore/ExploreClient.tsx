"use client";

import { useState, useMemo } from "react";
import { TechItem } from "@/lib/api/explore/card-data";
import { TechCard } from "@/components/explore/TechCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Sparkles, Code2, Cpu, SlidersHorizontal, Layers } from "lucide-react";

export function ExploreClient({ initialItems }: { initialItems: TechItem[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Dynamically extract unique categories
  const categories = useMemo(() => {
    const set = new Set(initialItems.map((item) => item.category));
    return ["All", ...Array.from(set)];
  }, [initialItems]);

  const filteredItems = initialItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty =
      selectedDifficulty === "All" || item.difficulty === selectedDifficulty;
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background text-foreground pb-16">
      {/* Hero Header */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-muted/40 via-background to-background py-16 md:py-24">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-[var(--color-brand-accent)]/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="container relative mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 text-xs font-semibold text-foreground backdrop-blur shadow-sm mb-6">
            <Sparkles className="h-3.5 w-3.5 text-[var(--color-brand-accent)]" />
            <span>Master Your Next Interview</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Explore <span className="ai-gradient-text">Technologies</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Browse curated questions across the tools top companies actually ask about, sorted by how often they come up.
          </p>

          <div className="mt-8 flex justify-center items-center gap-8 text-sm font-medium text-muted-foreground">
            <div className="flex items-center gap-2">
              <Code2 className="h-4 w-4 text-[var(--color-brand-accent)]" />
              <span>{initialItems.length} Core Topics</span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-[var(--color-brand-accent)]" />
              <span>{categories.length - 1} Categories</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid Content */}
      <main className="container mx-auto px-4 pt-10">
        
        {/* Search Input Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name, summary, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-card border-border focus-visible:ring-[var(--color-brand-accent)]"
            />
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground mr-1 shrink-0" />
            {["All", "Beginner", "Intermediate", "Advanced"].map((level) => {
              const isActive = selectedDifficulty === level;
              return (
                <Button
                  key={level}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDifficulty(level)}
                  className={`rounded-full text-xs shrink-0 ${
                    isActive
                      ? "bg-[var(--color-brand-accent)] hover:bg-[var(--color-brand-accent)]/90 text-white"
                      : "border-border hover:bg-muted"
                  }`}
                >
                  {level}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 border-b border-border">
          <Layers className="h-4 w-4 text-muted-foreground mr-1 shrink-0" />
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <Button
                key={cat}
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-lg text-xs shrink-0 ${
                  isActive
                    ? "bg-muted font-semibold text-foreground border border-border"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </Button>
            );
          })}
        </div>

        {/* Card Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <TechCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-dashed border-border rounded-xl bg-card/40">
            <p className="text-foreground text-lg font-semibold">No technologies found</p>
            <p className="text-sm text-muted-foreground mt-1">Try resetting your search filter or selecting another category.</p>
          </div>
        )}
      </main>
    </div>
  );
}