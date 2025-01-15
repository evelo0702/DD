"use client";

import { BiLike } from "react-icons/bi";
import { BsFileEarmarkPerson } from "react-icons/bs";
import { FaFolderOpen } from "react-icons/fa";

export default function Tap({
  type,
  isActive,
}: {
  type: string;
  isActive: string;
}) {
  return (
    <>
      <div
        className={`p-2 flex col-span-1   ${
          type === "save" ? "md:h-1/6" : "md:h-full"
        } w-full justify-center items-center
                max-[767px]:rounded-t-lg md:rounded-s-lg 
                transition-all duration-300 ease-in-out 
                max-[767px]:border-b-4  ${
                  isActive === type
                    ? "bg-gray-800 text-white shadow-lg md:border-r-4 border-gray-600"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
      >
        {type === "user" && (
          <div className="flex items-center">
            <BsFileEarmarkPerson className="text-3xl" />
            <p className="md:text-2xl text-xl ms-2 ">유저</p>
          </div>
        )}
        {type === "like" && (
          <div className="flex items-center">
            <BiLike className="text-3xl" />
            <p className="md:text-2xl text-xl ms-2">좋아요</p>
          </div>
        )}
        {type === "save" && (
          <div className="flex items-center">
            <FaFolderOpen className="text-3xl" />
            <p className="md:text-2xl text-xl ms-2">저장</p>
          </div>
        )}
      </div>
    </>
  );
}
