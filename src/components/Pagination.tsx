"use client";

import { useMemo, memo } from "react";

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const pageGroup = useMemo(() => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages - 2 }, (_, i) => i + 2);
    }
    if (totalPages === 4) {
      return [2, 3];
    }

    if (currentPage > 3 && currentPage + 1 < totalPages) {
      return [currentPage - 1, currentPage, currentPage + 1];
    }
    if (currentPage + 1 === totalPages) {
      return [currentPage - 2, currentPage - 1, currentPage];
    }
    if (currentPage === totalPages) {
      return [currentPage - 3, currentPage - 2, currentPage - 1];
    } else {
      return [2, 3, 4];
    }
  }, [currentPage, totalPages]);
  return (
    <div className="flex items-center justify-center p-4" onClick={scrollToTop}>
      {totalPages > 1 && (
        <button
          className={`me-4 hover:bg-slate-300 rounded-lg p-4 ${
            currentPage == 1 ? "bg-slate-300" : ""
          }`}
          onClick={() => onPageChange(1)}
        >
          1
        </button>
      )}

      {currentPage > 3 && totalPages > 5 && <div>...</div>}
      {pageGroup &&
        pageGroup.map((pageNum) => (
          <button
            key={pageNum}
            className={`me-4 hover:bg-slate-300 rounded-lg p-4 ${
              currentPage == pageNum ? "bg-slate-300" : ""
            }`}
            onClick={() => onPageChange(pageNum)}
          >
            {pageNum}
          </button>
        ))}

      {totalPages > Number(pageGroup[pageGroup.length - 1]) + 1 && (
        <div>...</div>
      )}
      {totalPages > 1 && (
        <button
          className={`me-4 hover:bg-slate-300 rounded-lg p-4 ${
            currentPage == totalPages ? "bg-slate-300" : ""
          }`}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </button>
      )}
    </div>
  );
}

export default memo(Pagination);
