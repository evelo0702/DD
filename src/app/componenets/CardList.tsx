"use client";

import { useQuery } from "@tanstack/react-query";
import { getDictionaryData } from "../actions/getDictionaryData.action";
import { useMobileSearchStore } from "../store/zustand/globalStore";
import { useEffect, useState } from "react";
import { DictData } from "../types/type";

export default function CardList() {
  const showMobileSearch = useMobileSearchStore(
    (state) => state.showMobileSearch
  );

  const { data } = useQuery({
    queryKey: ["dictData"],
    queryFn: getDictionaryData,
  });

  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState<DictData[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (data) {
      const pages = Math.ceil(data.length / 8);
      setTotalPages(pages);
      const pageData = data.slice((currentPage - 1) * 8, currentPage * 8);
      setCurrentData(pageData);
    }
  }, [data, currentPage]);

  return (
    <div
      className={`  md:col-span-6 md:block text-4xl  ${
        showMobileSearch ? "hidden" : ""
      } `}
    >
      <div className="grid grid-rows-4 grid-cols-2 h-5/6 p-1">
        {currentData?.map((item) => (
          <div key={item._id} className="border-4 rounded-lg p-4 m-1">
            {item.title} {/* 데이터 항목 표시 */}
          </div>
        ))}
      </div>
      <div className="h-1/6 flex items-center justify-center">
        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
          (pageNum) => (
            <button
              key={pageNum}
              className="m-4 hover:bg-slate-500 rounded-lg p-4"
              onClick={() => setCurrentPage(pageNum)}
            >
              {pageNum}
            </button>
          )
        )}
      </div>
    </div>
  );
}
