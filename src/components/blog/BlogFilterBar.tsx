"use client";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface BlogFilterBarProps {
    categories: string[];
}

export default function BlogFilterBar({ categories }: BlogFilterBarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentCategory = searchParams.get("category") || "All";
    const currentSearch = searchParams.get("search") || "";

    const updateFilters = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value && value !== "All") {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        params.delete("page");

        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <section className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" aria-label="Blog Controls">
            <nav className="flex flex-wrap items-center gap-2" aria-label="Blog Categories">
                {categories.map((cat) => {
                    const isActive = currentCategory === cat;
                    return (
                        <Button
                            key={cat}
                            variant={isActive ? "default" : "ghost"}
                            size="sm"
                            onClick={() => updateFilters("category", cat)}
                            className={
                                isActive
                                    ? "bg-[var(--color-brand-accent)] text-white hover:bg-[var(--color-brand-accent)]/90 shadow-md shadow-indigo-500/20"
                                    : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200"
                            }
                        >
                            {cat}
                        </Button>
                    );
                })}
            </nav>

            <div className="relative w-full sm:w-72">
                <Search
                    className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400"
                    aria-hidden="true"
                />

                <input
                    type="search"
                    defaultValue={currentSearch}
                    onChange={(e) => updateFilters("search", e.target.value)}
                    placeholder="Search blog posts..."
                    className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-10 pr-4 text-xs font-medium text-slate-900 outline-none transition-all focus:border-[var(--color-brand-accent)] focus:ring-2 focus:ring-indigo-500/20"
                />
            </div>
        </section>
    );
}