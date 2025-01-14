"use client";
import { UserData } from "@/types/type";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";

const Card = ({ data }: { data: UserData["likedPosts"][0] }) => {
  return (
    <Link
      href={`/detail/${data.id}`}
      className="p-4 bg-white border rounded-lg shadow hover:shadow-lg transition-all"
    >
      <div className="mb-2 text-lg font-semibold text-gray-800 truncate flex justify-between">
        <p>{data.title} </p>
        <p>{data.author}</p>
      </div>
      <div className="flex flex-col items-end">
        <div className="text-sm text-gray-600">작성일: {data.createdAt} </div>
        <div className="flex text-sm text-gray-600">
          카테고리:
          {data.category.map((i) => (
            <div key={i._id}>{i.title}</div>
          ))}
        </div>
      </div>
    </Link>
  );
};

const CardList = ({
  totaldata,
  folder,
}: {
  totaldata: UserData["likedPosts"];
  folder: number;
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
    <>
      {totaldata.length > 0 ? (
        <>
          <div className="grid grid-cols-2 gap-4">
            {currentData.map((item, index) => (
              <Card key={index} data={item} />
            ))}
          </div>
          <div className="mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      ) : (
        <div className="text-center">저장된 데이터가 없습니다</div>
      )}
    </>
  );
};

export default CardList;
