"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";

interface BlogPaginationProps {
    currentPage: number;
    totalPages: number;
}

export default function BlogPagination({ currentPage, totalPages }: BlogPaginationProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    if(totalPages <= 1) return null;

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());
        router.push(`${pathname}?${params.toString()}`);
    };

    return(
        <nav aria-label="Blog Pagination" className="mt-12 flex items-center justify-center gap-2">
            <Button
                variant="outline"
                size="sm"
                disabled={currentPage <= 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="gap-1 border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
                <ChevronLeft className="size-4" />
                Previous
            </Button>

            <span className="px-3 text-xs font-medium text-slate-600">
                Page <span className="font-bold text-slate-900">
                    {currentPage} of{" "}
                    <span className="font-bold text-slate-900">{totalPages}</span>
                </span>
            </span>

            <Button
                variant="outline"
                size="sm"
                disabled={currentPage >= totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="gap-1 border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
                Next
                <ChevronLeft className="size-4 " />
            </Button>
        </nav>
    );
}