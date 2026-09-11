"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export default function BlogFilterBar({
  categories,
}: {
  categories: readonly string[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentCategory = searchParams.get("category") || "All";
  const currentSearch = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(currentSearch);

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    value && value !== "All" ? params.set(key, value) : params.delete(key);
    params.delete("page");
    startTransition(() => router.push(`${pathname}?${params.toString()}`));
  };

  useEffect(() => {
    if (searchTerm === currentSearch) return;
    const timer = setTimeout(() => updateFilters("search", searchTerm), 400);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <section className="mt-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      {/* Category Pills */}
      <nav className="flex flex-wrap gap-2.5">
        {categories.map((cat) => (
          <Button
            key={cat}
            onClick={() => updateFilters("category", cat)}
            className={`h-10 rounded-full px-4 text-sm font-semibold transition-all ${
              currentCategory === cat
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700"
                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
            }`}
          >
            {cat}
          </Button>
        ))}
      </nav>

      {/* Search Input Box */}
      <div className="relative w-full sm:w-80">
        <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        <Input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search articles, topics, skills..."
          className="h-11 w-full rounded-2xl border-slate-200 bg-white pl-11 pr-10 text-sm font-medium focus-visible:ring-2 focus-visible:ring-indigo-500/20"
        />
        {isPending && (
          <Loader2 className="absolute right-3.5 top-1/2 size-4 -translate-y-1/2 animate-spin text-indigo-600" />
        )}
      </div>
    </section>
  );
}