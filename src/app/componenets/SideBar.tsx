"use client";
import { useEffect } from "react";
import { useRecentDataStore } from "../store/zustand/globalStore";
import Link from "next/link";

export default function SideBar() {
  const { recentData } = useRecentDataStore();
  useEffect(() => {
    if (recentData) {
      console.log(recentData);
    }
  }, [recentData]);
  return (
    <div className="md:col-span-1 h-full hidden md:block">
      <div>최근 본 게시물</div>
      <div className="grid grid-rows-5 h-5/6">
        {recentData &&
          recentData.map((i) => (
            <Link
              href={`/detail/${i.id}`}
              key={i.id}
              className="bg-red-100 hover:bg-brown-300 hover:cursor-pointer"
            >
              {i.title}
            </Link>
          ))}
      </div>
    </div>
  );
}
