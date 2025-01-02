"use client";

import { useQuery } from "@tanstack/react-query";
import { getDictionaryData } from "../actions/getDictionaryData.action";
import { useMobileSearchStore } from "../store/zustand/globalStore";
import { useEffect, useState } from "react";
import { DictData } from "../types/type";
import Pagination from "./Pagination";

export default function CardList() {
  const showMobileSearch = useMobileSearchStore(
    (state) => state.showMobileSearch
  );

  const { data } = useQuery({
    queryKey: ["dictData"],
    queryFn: getDictionaryData,
  });

  const [currentData, setCurrentData] = useState<DictData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    if (data) {
      setCurrentData(data.slice((currentPage - 1) * 8, currentPage * 8));
      setTotalPage(Math.ceil(data.length / 8));
    }
  }, [data, currentPage]);
  return (
    <div
      className={`md:col-span-6 md:block text-2xl  ${
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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
