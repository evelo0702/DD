"use client";

import { useQuery } from "@tanstack/react-query";
import { CategoryRes } from "../types/type";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useMobileSearchStore } from "@/store/zustand/globalStore";
import { getCategoryData } from "@/actions/category/getCategory.actions";

export default function Search({
  categoryChange,
  searchCategory,
  setSearchQuery,
}: {
  searchCategory: string;
  categoryChange: (category: string) => void;

  setSearchQuery: (Query: string) => void;
}) {
  const showMobileSearch = useMobileSearchStore(
    (state) => state.showMobileSearch
  );
  const { data } = useQuery<CategoryRes>({
    queryKey: ["category"],
    queryFn: getCategoryData,
  });
  const [query, setQuery] = useState("");
  const handleEnterKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setSearchQuery(query);
    }
  };
  return (
    <div
      className={` h-full md:col-span-2 md:block
              ${showMobileSearch ? "" : "hidden"} `}
    >
      <div className="grid grid-rows-5 md:h-full h-4/5">
        <div className="row-span-1 flex-col justify-center items-center">
          <button
            className={`border rounded-lg p-1 transform transition-transform hover:scale-110 hover:shadow-md ${
              searchCategory === ""
                ? "bg-white text-red-400"
                : "bg-black text-white"
            } md:text-xl 
                text-2xl mb-2 w-full`}
            onClick={() => {
              categoryChange("");
              setSearchQuery("");
              setQuery("");
            }}
          >
            전체보기
          </button>
          <div className="flex">
            <textarea
              className="w-full me-2 p-1  border-2  rounded-md text-2xl overflow-y-auto resize-none"
              rows={2} // 기본 높이를 1줄로 설정
              placeholder="검색어를 입력하세요"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleEnterKey}
            />
            <button onClick={() => setSearchQuery(query)}>
              <FaSearch />
            </button>
          </div>
        </div>

        {/* 카테고리 검색 */}
        <div className=" row-span-4">
          <p>카테고리 선택</p>
          <div className="h-3/5">
            {data &&
              data.category.map((i) => (
                <button
                  className={`border rounded-lg p-1 
                     md:text-xl text-2xl  mx-1 mb-2 transform transition-transform hover:scale-110 hover:shadow-md ${
                       searchCategory === i.name
                         ? "bg-white text-red-400"
                         : "bg-black text-white"
                     }`}
                  key={i._id}
                  onClick={() => {
                    if (searchCategory === i.name) {
                      categoryChange("");
                    } else categoryChange(i.name);
                  }}
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
