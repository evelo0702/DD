"use client";

import { FaFolderOpen } from "react-icons/fa";
import Tap from "./Tap";
import { updateUserFolders } from "@/actions/user/postUserData.action";
import { QueryObserverResult } from "@tanstack/react-query";
import { UserData } from "@/types/type";
import { useState } from "react";

export default function SideBar({
  userName,
  folderName,
  isActive,
  setIsActive,
  setFolder,
  folder,
  refetch,
}: {
  userName: string;
  folderName: string[];
  isActive: string;
  setIsActive: (type: string) => void;
  setFolder: (type: number) => void;
  folder: number;
  refetch: () => Promise<QueryObserverResult<UserData>>;
}) {
  const [title, setTitle] = useState("");
  const addFolders = async (title: string) => {
    if (title.length === 0) {
      return alert("제목을 작성해주세요");
    }
    let res = await updateUserFolders(title, userName, "add");
    await refetch();
    setTitle("");
    console.log(res);
  };
  
  return (
    <div className="grid md:grid-rows-7 h-full md:gap-10 gap-4 max-[767px]:grid-cols-3">
      <div onClick={() => setIsActive("user")} className="md:row-span-1">
        <Tap type={"user"} isActive={isActive} />
      </div>

      <div onClick={() => setIsActive("like")} className="md:row-span-1">
        <Tap type={"like"} isActive={isActive} />
      </div>

      <div onClick={() => setIsActive("save")} className="md:row-span-5">
        <Tap type={"save"} isActive={isActive} />
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden hidden md:block ${
            isActive === "save"
              ? "max-h-[500px] opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-2 pt-4 bg-gray-100 rounded-b-lg ">
            <div className="flex-col py-2">
              {folderName ? (
                <>
                  {folderName.map((i, index) => (
                    <button
                      key={index}
                      className={`border-b-4 mb-2 w-full ${
                        folder === index
                          ? "bg-gray-800 rounded-lg p-1 text-white"
                          : ""
                      }`}
                      onClick={() => setFolder(index)}
                    >
                      <p
                        className={`flex justify-center ${
                          folder === index ? "text-white" : ""
                        }`}
                      >
                        <FaFolderOpen className="text-3xl " />
                      </p>
                      <div
                        className={`text-lg font-medium ${
                          folder === index ? "text-white" : ""
                        }`}
                      >
                        {i}
                      </div>
                    </button>
                  ))}
                  {folderName.length < 3 && (
                    <div className="">
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <button onClick={() => addFolders(title)}>
                        폴더 추가하기
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center bg-red-400">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <button onClick={() => addFolders(title)}>
                    폴더 추가하기
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
