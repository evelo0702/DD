"use client";

import { FaFolderOpen } from "react-icons/fa";
import Tap from "./Tap";

export default function SideBar({
  folderName,
  isActive,
  setIsActive,
  setFolder,
  folder,
}: {
  folderName: string[];
  isActive: string;
  setIsActive: (type: string) => void;
  setFolder: (type: number) => void;
  folder: number;
}) {
  return (
    <div className="grid md:grid-rows-7 h-full gap-4 max-[767px]:grid-cols-3">
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
                      className="border-b-4 mb-2"
                      onClick={() => setFolder(index)}
                    >
                      <p
                        className={`flex justify-center ${
                          folder === index ? "bg-red-400" : ""
                        }`}
                      >
                        <FaFolderOpen className="text-3xl text-gray-700" />
                      </p>
                      <div className="text-lg text-gray-800 font-medium">
                        {i}
                      </div>
                    </button>
                  ))}
                  {folderName.length < 3 && (
                    <div className="text-center ">
                      <button>폴더 추가하기</button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center bg-red-400">
                  <button>폴더 추가하기</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
