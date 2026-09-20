"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function BlogPagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter(); 

  if (totalPages <= 1) return null;

  const createPageURL = (page: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handlePageChange = (e: React.MouseEvent<HTMLAnchorElement>, page: number | string) => {
    e.preventDefault();
    const url = createPageURL(page);
    router.push(url, { scroll: false });
  };

  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  const getPages = () => {
    if (totalPages <= 5)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | string)[] = [1];
    if (currentPage > 3) pages.push("ellipsis-start");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);

    if (currentPage < totalPages - 2) pages.push("ellipsis-end");
    pages.push(totalPages);
    return pages;
  };

  const disabledBtnStyle = "pointer-events-none opacity-40 select-none";

  return (
    <Pagination className="mt-12">
      <PaginationContent>
        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            href={isFirst ? "#" : createPageURL(currentPage - 1)}
            onClick={(e) => !isFirst && handlePageChange(e, currentPage - 1)}
            tabIndex={isFirst ? -1 : undefined}
            className={isFirst ? disabledBtnStyle : "hover:bg-slate-100 cursor-pointer"}
          />
        </PaginationItem>

        {/* Numbers & Ellipsis */}
        {getPages().map((page, idx) => (
          <PaginationItem
            key={typeof page === "string" ? `${page}-${idx}` : page}
          >
            {typeof page === "string" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={createPageURL(page)}
                onClick={(e) => handlePageChange(e, page)}
                isActive={page === currentPage}
                className={
                  page === currentPage
                    ? "bg-slate-900! text-white! hover:bg-slate-800! cursor-pointer"
                    : "hover:bg-slate-100 cursor-pointer"
                }
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            href={isLast ? "#" : createPageURL(currentPage + 1)}
            onClick={(e) => !isLast && handlePageChange(e, currentPage + 1)}
            tabIndex={isLast ? -1 : undefined}
            className={isLast ? disabledBtnStyle : "hover:bg-slate-100 cursor-pointer"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}