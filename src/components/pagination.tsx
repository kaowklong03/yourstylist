import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null;

  // Generate page numbers to display with smart ellipsis
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push("...");
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }
    return pages;
  };

  const getPageUrl = (page: number) => {
    return `${basePath}${basePath.includes("?") ? "&" : "?"}page=${page}`;
  };

  return (
    <nav className="flex items-center justify-center gap-1 sm:gap-2 my-10" aria-label="Pagination">
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="inline-flex items-center gap-1 px-3 py-2 text-xs font-mono border border-line bg-paper text-charcoal hover:border-charcoal transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">ก่อนหน้า</span>
        </Link>
      ) : (
        <span className="inline-flex items-center gap-1 px-3 py-2 text-xs font-mono border border-line/40 text-muted/40 cursor-not-allowed">
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">ก่อนหน้า</span>
        </span>
      )}

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {getPageNumbers().map((p, idx) => {
          if (p === "...") {
            return (
              <span key={`ellipsis-${idx}`} className="px-2 py-2 text-xs text-muted">
                …
              </span>
            );
          }

          const pageNum = Number(p);
          const isActive = pageNum === currentPage;

          return (
            <Link
              key={`page-${pageNum}`}
              href={getPageUrl(pageNum)}
              className={`min-w-[36px] h-9 flex items-center justify-center text-xs font-mono border transition-colors ${
                isActive
                  ? "bg-charcoal text-paper border-charcoal font-bold"
                  : "bg-paper text-charcoal border-line hover:border-charcoal"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              {pageNum}
            </Link>
          );
        })}
      </div>

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="inline-flex items-center gap-1 px-3 py-2 text-xs font-mono border border-line bg-paper text-charcoal hover:border-charcoal transition-colors"
        >
          <span className="hidden sm:inline">ถัดไป</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <span className="inline-flex items-center gap-1 px-3 py-2 text-xs font-mono border border-line/40 text-muted/40 cursor-not-allowed">
          <span className="hidden sm:inline">ถัดไป</span>
          <ChevronRight className="w-4 h-4" />
        </span>
      )}
    </nav>
  );
}
