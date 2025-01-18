"use client";
import { UserData } from "@/types/type";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { deleteUserSavedData } from "@/actions/user/postUserData.action";
import { useAuthStore } from "@/store/zustand/globalStore";
import { QueryObserverResult } from "@tanstack/react-query";

const Card = ({
  data,
  isActive,
  title,
  refetch,
}: {
  data: UserData["likedPosts"][0];
  isActive: string;
  title?: string;
  refetch: () => Promise<QueryObserverResult<UserData>>;
}) => {
  const { userData } = useAuthStore();
  const delData = async (id: string) => {
    let res = confirm("해당 데이터를 삭제하시겠습니까?");
    if (res) {
      if (isActive === "like") {
        let result = await deleteUserSavedData(
          userData!.username,
          id,
          isActive
        );
        refetch();
        return console.log(result);
      }
      if (isActive === "save") {
        let result = await deleteUserSavedData(
          userData!.username,
          id,
          isActive,
          title
        );
        refetch();
        return console.log(result);
      }
    } else return;
  };
  return (
    <div className="p-4 bg-white border rounded-lg shadow hover:shadow-lg transition-all">
      <Link
        href={`/detail/${data.id}`}
        className="mb-2 text-lg font-semibold text-gray-800 truncate flex justify-between"
      >
        <p>{data.title}</p>
        <p>{data.author}</p>
      </Link>
      <div className="grid grid-cols-2 w-full h-1/2">
        <button
          className="w-2/3 col-span-1 flex items-center justify-center px-2 py-1 bg-gray-100 border border-gray-300 text-gray-800 
          text-base font-semibold rounded-lg transition-all duration-200 ease-in-out hover:bg-gray-300 hover:text-gray-900 
          focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          onClick={() => {
            delData(data.id);
          }}
        >
          <span className="mr-1">🗑️</span>삭제
        </button>
        <div className="col-span-1 flex flex-col items-end">
          <div className="text-sm text-gray-600">작성일: {data.createdAt}</div>
          <div className="flex text-sm text-gray-600">
            카테고리:
            {data.category.map((i) => (
              <div key={i._id}>{i.title}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CardList = ({
  totaldata,
  folder,
  isActive,
  title,
  refetch,
}: {
  totaldata: UserData["likedPosts"];
  folder: number;
  isActive: string;
  title?: string | "";
  refetch: () => Promise<QueryObserverResult<UserData>>;
}) => {
  const [currentData, setCurrentData] = useState<UserData["likedPosts"]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const setData = (data: UserData["likedPosts"], currentPage: number) => {
    setCurrentData(data.slice((currentPage - 1) * 8, currentPage * 8));
    setTotalPage(Math.ceil(data.length / 8));
  };
  useEffect(() => {
    setData(totaldata, currentPage);
  }, [totaldata, currentPage]);
  useEffect(() => {
    setCurrentPage(1);
  }, [folder]);
  return (
    <div className="h-full flex ">
      {totaldata.length > 0 ? (
        <div className="w-full">
          <div className="grid md:grid-cols-2 gap-4">
            {currentData.map((item, index) => (
              <Card
                key={index}
                data={item}
                title={title}
                isActive={isActive}
                refetch={refetch}
              />
            ))}
          </div>
          <div className="mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      ) : (
        <div className="text-center">저장된 데이터가 없습니다</div>
      )}
    </div>
  );
};

export default CardList;
