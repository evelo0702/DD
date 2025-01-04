"use client";

import { useQuery } from "@tanstack/react-query";
import { useMobileSearchStore } from "../store/zustand/globalStore";
import { getCategoryData } from "../actions/category/getCategory.actions";
import { CategoryData } from "../types/type";

export default function Search({
  categoryChange,
  searchCategory,
}: {
  searchCategory: string;
  categoryChange: (category: string) => void;
}) {
  const showMobileSearch = useMobileSearchStore(
    (state) => state.showMobileSearch
  );
  const { data } = useQuery<CategoryData[]>({
    queryKey: ["category"],
    queryFn: getCategoryData,
  });
  return (
    <div
      className={` h-full md:col-span-2
              ${showMobileSearch ? "" : "hidden"} md:block`}
    >
      <div className="grid grid-rows-3 md:h-full h-4/5">
        <div className="bg-lime-100 row-span-1">서치바</div>

        {/* 카테고리 검색 */}
        <div className=" row-span-2">
          <p className="text-3xl text-center">카테고리 검색</p>
          <div className="h-3/5">
            <div>전체 카테고리</div>

            <button
              className={`border rounded-lg p-1 ${
                searchCategory === ""
                  ? "bg-white text-sky-900"
                  : "bg-black text-white"
              } md:text-xl 
                text-2xl mx-1 mb-2`}
              onClick={() => categoryChange("")}
            >
              전체보기
            </button>

            {data &&
              data.map((i) => (
                <button
                  className={`border rounded-lg p-1 
                     md:text-xl text-2xl  mx-1 mb-2 ${
                       searchCategory === i.name
                         ? "bg-white text-sky-900"
                         : "bg-black text-white"
                     }`}
                  key={i._id}
                  onClick={() => categoryChange(i.name)}
                >
                  {i.name}
                </button>
              ))}
          </div>
          {false && (
            //로그인했을때만
            <div className="h-1/5">관심 카테고리</div>
          )}
        </div>
      </div>
    </div>
  );
}
