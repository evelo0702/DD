"use client";

import { useMemo, memo, useState } from "react";

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const [maxVisibleButtons, setMaxBtn] = useState(3);
  const pageGroup = useMemo(() => {
    const half = Math.floor(maxVisibleButtons / 2);

    // Total pages less than or equal to visible buttons
    if (totalPages <= maxVisibleButtons) {
      return Array.from({ length: totalPages - 1 }, (_, i) => i + 2);
    }

    // Current page is near the start
    if (currentPage <= half + 1) {
      return Array.from({ length: maxVisibleButtons }, (_, i) => i + 2);
    }

    // Current page is near the end
    if (currentPage >= totalPages - half) {
      return Array.from(
        { length: maxVisibleButtons },
        (_, i) => totalPages - maxVisibleButtons + i
      );
    }

    // Current page is in the middle
    return Array.from(
      { length: maxVisibleButtons },
      (_, i) => currentPage - half + i
    );
  }, [currentPage, totalPages, maxVisibleButtons]);

  return (
    <div className="h-1/6 flex items-center justify-center ">
      <select
        name=""
        id=""
        defaultValue=""
        onChange={(e) => setMaxBtn(Number(e.target.value))}
      >
        <option value="" disabled>
          페이지 수
        </option>
        <option value="3">3(기본값)</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <button
        className={`me-4 hover:bg-slate-500 rounded-lg p-4 ${
          currentPage == 1 ? "bg-red-400" : ""
        }`}
        onClick={() => onPageChange(1)}
      >
        1
      </button>
      {currentPage >= maxVisibleButtons && <div>...</div>}
      {pageGroup.map((pageNum) => (
        <button
          key={pageNum}
          className={`me-4 hover:bg-slate-500 rounded-lg p-4 ${
            currentPage == pageNum ? "bg-red-400" : ""
          }`}
          onClick={() => onPageChange(pageNum)}
        >
          {pageNum}
        </button>
      ))}
      {pageGroup[pageGroup.length - 1] < totalPages - 1 && <div>...</div>}
      <button
        className={`me-4 hover:bg-slate-500 rounded-lg p-4 ${
          currentPage == totalPages ? "bg-red-400" : ""
        }`}
        onClick={() => onPageChange(totalPages)}
      >
        {totalPages}
      </button>
    </div>
  );
}

export default memo(Pagination);
