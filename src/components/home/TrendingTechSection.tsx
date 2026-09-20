import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import { EXPLORE_TECH_ITEMS } from "@/lib/api/explore/card-data";
import { TrendingMiniCard } from "@/components/home/TrendingMiniCard";

export function TrendingTechSection() {
  const trendingIds = ["javascript", "typescript", "react", "nextjs"];
  const trendingTechs = EXPLORE_TECH_ITEMS.filter((item) =>
    trendingIds.includes(item.id)
  );

  return (
    <section className="py-16 sm:py-20 bg-background font-lexend">
      <div className="container mx-auto max-w-7xl px-4">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/20 bg-orange-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange-600">
              <Flame className="h-3.5 w-3.5 fill-current" />
              Most Demanded
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground font-lexend">
              Hot Technology
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-relaxed">
              Boost your interview preparation with structured explanations, core concepts, and commonly asked technical questions.
            </p>
          </div>

          <Link
            href="/explore"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors group cursor-pointer shrink-0 font-lexend"
          >
            <span className="text-sm">Explore All Technology</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 4 Cards Grid in a single row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingTechs.map((item) => (
            <TrendingMiniCard key={item.id} item={item} />
          ))}
        </div>

      </div>
    </section>
  );
}