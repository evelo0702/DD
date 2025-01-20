"use client";
import { useRecentDataStore } from "@/store/zustand/globalStore";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RecentBar() {
  const { recentData } = useRecentDataStore();
  const pathname = usePathname();
  return (
    <>
      {pathname !== "/signup" && recentData.length > 0 && (
        <div className="hidden md:block mb-10 me-4">
          <div className="text-center text-2xl font-semibold">
            최근 본 게시물
          </div>
          <div className="grid grid-cols-1">
            {recentData.map((i) => (
              <Link href={`/detail/${i.id}`} key={i.id} className="my-1">
                <div className="mx-auto bg-white border border-gray-300 rounded-lg p-5 shadow-md transform transition-transform hover:scale-105 hover:shadow-lg">
                  <h3 className="text-lg text-center">{i.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
