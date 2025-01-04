"use client";
import { useQuery } from "@tanstack/react-query";
import { getDictionaryData } from "../actions/dictionary/getDictionaryData.action";
import { useMobileSearchStore } from "../store/zustand/globalStore";
import { useEffect, useState } from "react";
import { DictData } from "../types/type";
import Pagination from "./Pagination";
import Link from "next/link";
import Search from "./Search";

export default function CardList() {
  const showMobileSearch = useMobileSearchStore(
    (state) => state.showMobileSearch
  );
  const changeMode = useMobileSearchStore((state) => state.changeMode);

  const { data } = useQuery({
    queryKey: ["dictData"],
    queryFn: getDictionaryData,
  });

  const [currentData, setCurrentData] = useState<DictData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const SetData = (data: DictData[], currentPage: number) => {
    setCurrentData(data.slice((currentPage - 1) * 8, currentPage * 8));
    setTotalPage(Math.ceil(data.length / 8));
  };
  const highlightSearchQuery = (title: string, searchQuery: string) => {
    if (!searchQuery) return title;

    const parts = title.split(new RegExp(`(${searchQuery})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <span key={index} className="text-red-400">
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
          i.category.some((category) => category.name === searchCategory)
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
            i.category.some((category) => category.name === searchCategory) &&
            i.title.includes(searchQuery)
        );
        SetData(SortData, currentPage);
      }
    }
  }, [data, currentPage, searchCategory, searchQuery]);
  useEffect(() => {
    setCurrentPage(1);
    changeMode();
  }, [searchCategory, searchQuery]);
  return (
    <>
      <div
        className={`md:col-span-6 md:block text-2xl  ${
          showMobileSearch ? "hidden" : ""
        } `}
      >
        <div className="grid grid-rows-4 grid-cols-2 h-5/6 p-1">
          {currentData.length > 0 ? (
            currentData?.map((item) => (
              <Link
                href={`/detail/${item._id}`}
                key={item._id}
                className="border-4 rounded-lg p-4 m-1 flex flex-col justify-center items-center"
              >
                <p>{highlightSearchQuery(item.title, searchQuery)}</p>
                <div className="flex">
                  {item.category.map((i) => (
                    <div
                      key={i._id}
                      className={`${
                        searchCategory === i.name
                          ? "text-red-400"
                          : "text-sky-900"
                      } mx-2 border-4 rounded-lg p-2`}
                    >
                      {i.name}
                    </div>
                  ))}
                </div>
              </Link>
            ))
          ) : (
            <div>데이터가 없음</div>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPage}
          onPageChange={setCurrentPage}
        />
      </div>

      <Search
        categoryChange={setSearchCategory}
        searchCategory={searchCategory}
        setSearchQuery={setSearchQuery}
      />
    </>
  );
}
