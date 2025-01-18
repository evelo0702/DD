"use client";
import { useEffect, useState } from "react";
import Main from "./MyPageMain";
import { UserData } from "@/types/type";
import SideBar from "./SideBar";
import { useQuery } from "@tanstack/react-query";
import { getUserData } from "@/actions/user/getUserInfo.action";

export default function MyPageLayout({
  initialdata,
  username,
}: {
  initialdata: UserData;
  username: string;
}) {
  const [isActive, setIsActive] = useState("user");
  const [folder, setFolder] = useState(0);

  const { data, refetch } = useQuery({
    queryKey: ["userData"],
    queryFn: () => getUserData(username),
    initialData: initialdata,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
  });
  let folderName =
    data && data.folders
      ? data.folders!.map((folder) => folder.title || "")
      : null;
  useEffect(() => {
    if (data && data.username !== username) {
      refetch();
    }
  }, [username]);
  return (
    <>
      {folderName && (
        <>
          <div className="md:col-span-2 max-[767px]:row-span-1">
            <SideBar
              userName={data.username}
              folderName={folderName}
              setIsActive={setIsActive}
              folder={folder}
              isActive={isActive}
              setFolder={setFolder}
              refetch={refetch}
            />
          </div>
          <div className="md:h-70vh md:col-span-10 max-[767px]:row-span-11 ">
            <Main
              refetch={refetch}
              isActive={isActive}
              folderName={folderName}
              data={data}
              folder={folder}
              setIsActive={setIsActive}
              setFolder={setFolder}
            />
          </div>
        </>
      )}
    </>
  );
}

// const [darkMode, setDarkMode] = useState(false); {darkMode && <BsFileEarmarkPerson />}{darkMode && <BiSolidLike />} {darkMode && <FaFolderOpen className="text-white" />}
