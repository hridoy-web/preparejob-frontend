import Image from "next/image";
import Link from "next/link";
import { TechItem } from "@/lib/api/explore/card-data";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { ArrowUpRight, Flame } from "lucide-react";

interface TrendingMiniCardProps {
  item: TechItem;
}

export function TrendingMiniCard({ item }: TrendingMiniCardProps) {
  return (
    <Link href={`/explore/${item.id}`} className="block h-full group font-lexend">
      <Card
        className={cn(
          "relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/70 bg-white p-6 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/5 cursor-pointer"
        )}
      >
        <div>
          {/* Top row: Logo & Popularity Badge */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200/80 bg-slate-50/80 p-3 transition-transform duration-300 group-hover:scale-105 shadow-2xs">
              <Image
                src={item.logo}
                alt={`${item.name} logo`}
                width={36}
                height={36}
                className="object-contain"
                unoptimized
              />
            </div>

            <span className="inline-flex items-center gap-1 rounded-full border border-orange-500/20 bg-orange-50 px-3 py-1 text-xs font-bold text-orange-600">
              <Flame className="h-3.5 w-3.5 fill-current" />
              Top Rated
            </span>
          </div>

          {/* Title & Full Summary in Easy English */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors font-lexend">
                {item.name}
              </p>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-all duration-300 group-hover:bg-indigo-50 group-hover:text-indigo-600">
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {item.summary}
            </p>
          </div>
        </div>

        {/* Bottom CTA Action with Questions Ready */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Questions Ready
          </span>
          <span className="text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
            Start Practice &rarr;
          </span>
        </div>
      </Card>
    </Link>
  );
}