"use client";

import { useMobileSearchStore } from "../store/globalStore";

export default function Search() {
  const showMobileSearch = useMobileSearchStore(
    (state) => state.showMobileSearch
  );
  return (
    <div
      className={` h-full md:col-span-2
              ${showMobileSearch ? "" : "hidden"} md:block`}
    >
      <div className="grid grid-rows-3 h-full">
        <div className="bg-lime-100 row-span-1">서치바</div>
        <div className="bg-slate-500 row-span-2">키워드 검색</div>
      </div>
    </div>
  );
}
