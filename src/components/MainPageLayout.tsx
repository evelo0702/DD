"use client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { DictData } from "../types/type";
import Pagination from "./Pagination";
import Link from "next/link";
import Search from "./Search";
import { getDictionaryData } from "@/actions/dictionary/getDictionaryData.action";
import {
  useAuthStore,
  useMobileSearchStore,
} from "@/store/zustand/globalStore";
import LoadingSpinner from "./LoadingSpinner";

function MainPageLayout({ DictData }: { DictData: DictData[] }) {
  console.log("mainpage layout  rendering");

  const showMobileSearch = useMobileSearchStore(
    (state) => state.showMobileSearch
  );
  const changeMode = useMobileSearchStore((state) => state.changeMode);
  const { userData } = useAuthStore();
  const { data, refetch } = useQuery({
    queryKey: ["dictData"],
    queryFn: getDictionaryData,
    initialData: DictData,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
  });

  const [currentData, setCurrentData] = useState<DictData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const SetData = (data: DictData[], currentPage: number) => {
    setCurrentData(data.slice((currentPage - 1) * 8, currentPage * 8));
    setTotalPage(Math.ceil(data.length / 8));
  };
  const highlightSearchQuery = (title: string, searchQuery: string) => {
    if (!searchQuery) return title;

    const parts = title.split(new RegExp(`(${searchQuery})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <span key={index} className="text-red-500">
          {part}
        </span>
      ) : (
        part
      )
    );
  };
  useEffect(() => {
    if (Array.isArray(data)) {
      if (searchCategory === "" && searchQuery === "") {
        SetData(data, currentPage);
      }
      if (searchCategory !== "" && searchQuery === "") {
        let SortData = data.filter((i: DictData) =>
          i.category.some((category) => category.title === searchCategory)
        );
        SetData(SortData, currentPage);
      }
      if (searchCategory === "" && searchQuery !== "") {
        let SortData = data.filter((i) =>
          i.title.toUpperCase().includes(searchQuery.toUpperCase())
        );
        SetData(SortData, currentPage);
      }
      if (searchCategory !== "" && searchQuery !== "") {
        let SortData = data.filter(
          (i: DictData) =>
            i.category.some((category) => category.title === searchCategory) &&
            i.title.toUpperCase().includes(searchQuery.toUpperCase())
        );
        SetData(SortData, currentPage);
      }
    }
  }, [data, currentPage, searchCategory, searchQuery]);
  const [hasRendered, setHasRendered] = useState(false);
  useEffect(() => {
    if (hasRendered && (searchCategory || searchQuery)) {
      setCurrentPage(1);
      changeMode();
    } else {
      setHasRendered(true);
    }
  }, [searchCategory, searchQuery, hasRendered]);
  useEffect(() => {
    if (!userData) {
      refetch();
    }
  }, [userData]);
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <>
      <div
        className={`lg:col-span-8 col-span-7  md:block text-2xl h-full ${
          showMobileSearch ? "hidden" : ""
        } `}
      >
        <div className="grid max-[1030px]:grid-cols-1 grid-cols-2 gap-4 p-4">
          {currentData.length > 0 ? (
            currentData.map((item, index) => (
              <Link href={`/detail/${item._id}`} key={item._id}>
                <div
                  className={`row-span-1 bg-white border-l-4 ${
                    ((index === 0 || index === 1) && "border-indigo-300") ||
                    ((index === 2 || index === 3) && "border-blue-300") ||
                    ((index === 4 || index === 5) && "border-teal-300") ||
                    ((index === 6 || index === 7) && "border-purple-300")
                  } p-4 rounded-lg shadow-lg transform transition-transform hover:scale-110 hover:shadow-md 
          h-[200px] flex flex-col justify-between`}
                >
                  {/* 상단 정보 */}
                  <div>
                    <h3 className="text-2xl text-gray-900 line-clamp-1">
                      {highlightSearchQuery(item.title, searchQuery)}
                    </h3>
                    <div className="mt-2 text-lg text-gray-500 flex">
                      {item.createdAt} | like: {item.like} | save: {item.save}
                      <p className="text-black ms-2">작성자: {item.author}</p>
                    </div>
                    <p className="text-lg text-gray-700 line-clamp-2 overflow-hidden">
                      {item.content}...
                    </p>
                  </div>

                  {/* 하단 카테고리 */}
                  <div className="flex justify-end mt-2">
                    {item.category.map((i) => (
                      <div
                        key={i._id}
                        className={`${
                          searchCategory === i.title
                            ? "bg-indigo-400 text-white"
                            : "bg-gray-100 text-gray-800"
                        } me-2 border rounded-lg p-2 text-lg`}
                      >
                        {i.title}
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="w-full col-span-2 h-80vh flex flex-col justify-center items-center">
              {loading ? (
                <>
                  <LoadingSpinner />
                  <p className="text-3xl mt-4">
                    사전 데이터를 불러오는 중입니다
                  </p>
                </>
              ) : (
                <p className="text-3xl">찾으시는 데이터가 없습니다</p>
              )}
            </div>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPage}
          onPageChange={setCurrentPage}
        />
      </div>

      <div className="lg:col-span-2 col-span-3 ">
        <Search
          categoryChange={setSearchCategory}
          searchCategory={searchCategory}
          setSearchQuery={setSearchQuery}
        />
      </div>
    </>
  );
}
export default MainPageLayout;
