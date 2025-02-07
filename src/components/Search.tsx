"use client";

import { useQuery } from "@tanstack/react-query";
import { CategoryRes, UserData } from "../types/type";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import {
  useAuthStore,
  useMobileSearchStore,
} from "@/store/zustand/globalStore";
import { getCategoryData } from "@/actions/category/getCategory.actions";
import { getUserData } from "@/actions/user/getUserInfo.action";

export default function Search({
  categoryChange,
  searchCategory,
  setSearchQuery,
}: {
  searchCategory: string;
  categoryChange: (category: string) => void;

  setSearchQuery: (Query: string) => void;
}) {

  const { userData, isAuthenticated } = useAuthStore();
  const showMobileSearch = useMobileSearchStore(
    (state) => state.showMobileSearch
  );
  const { data, refetch: categoryRefetch } = useQuery<CategoryRes>({
    queryKey: ["category"],
    queryFn: getCategoryData,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
  });
  const { data: userSaveData, refetch } = useQuery<UserData>({
    queryKey: ["userData"],
    queryFn: () => getUserData(userData!.username),
  });

  const [query, setQuery] = useState("");
  const handleEnterKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setSearchQuery(query);
    }
  };
  useEffect(() => {
    refetch();
  }, [userData]);
  useEffect(() => {
    if (!data) {
      categoryRefetch();
    }
  }, [data]);
  return (
    <div
      className={` overflow-auto h-full md:col-span-2 md:block
              ${showMobileSearch ? "" : "hidden"} `}
    >
      <div className="grid grid-rows-6 h-4/5">
        <div className="row-span-1 flex-col justify-center items-center mb-4 md:mb-0">
          <button
            className={`border rounded-lg p-1 transform transition-transform hover:scale-110 hover:shadow-md ${
              searchCategory === ""
                ? "bg-indigo-400 text-white "
                : "bg-gray-100 text-gray-800"
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
              placeholder="검색을 원하는 제목을 입력하세요"
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
        <div className="row-span-5 mt-4">
          <p>카테고리 선택</p>
          <div className="">
            {data &&
              data.category &&
              data.category.map((i) => (
                <button
                  className={`border rounded-lg p-1 
            md:text-xl text-2xl mx-1 mb-2 transform transition-transform hover:scale-105 
            ${
              searchCategory === i.title
                ? "bg-indigo-400 text-white "
                : "bg-gray-100 text-gray-800 "
            }`}
                  key={i._id}
                  onClick={() => {
                    if (searchCategory === i.title) {
                      categoryChange("");
                    } else categoryChange(i.title);
                  }}
                >
                  {i.title}
                </button>
              ))}
          </div>
          {isAuthenticated && userSaveData && userSaveData.saveCategory && (
            <>
              <div className="h-1/5 mt-4">
                관심 카테고리
                <div>
                  {userSaveData.saveCategory.map((i) => (
                    <button
                      key={i._id}
                      className={`border rounded-lg p-1 
                md:text-xl text-2xl mx-1 mb-2 transform transition-transform hover:scale-105 hover:shadow-md 
                ${
                  searchCategory === i.title
                    ? "bg-indigo-400 text-white "
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
                      onClick={() => {
                        if (searchCategory === i.title) {
                          categoryChange("");
                        } else categoryChange(i.title);
                      }}
                    >
                      {i.title}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
