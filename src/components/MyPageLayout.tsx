"use client";
import { useState } from "react";
import Main from "./MyPageMain";
import { UsersaveData } from "@/types/type";
import SideBar from "./SideBar";

export default function MyPageLayout({ data }: { data: UsersaveData }) {
  const [isActive, setIsActive] = useState("user");
  const [folder, setFolder] = useState(0);
  let folderName = data.folders.map((folder) => folder.title);
  console.log(data);
  return (
    <>
      <div className="md:col-span-1 max-[766px]:row-span-1">
        <SideBar
          folderName={folderName}
          setIsActive={setIsActive}
          isActive={isActive}
          setFolder={setFolder}
        />
      </div>
      <div className="md:col-span-9 max-[766px]:row-span-6">
        <Main isActive={isActive} data={data} folder={folder} />
      </div>
    </>
  );
}

// const [darkMode, setDarkMode] = useState(false); {darkMode && <BsFileEarmarkPerson />}{darkMode && <BiSolidLike />} {darkMode && <FaFolderOpen className="text-white" />}
