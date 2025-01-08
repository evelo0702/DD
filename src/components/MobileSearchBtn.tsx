"use client";

import { useMobileSearchStore } from "@/store/zustand/globalStore";
import { LuTextSearch } from "react-icons/lu";

export default function MobileSearchBtn() {
  const changeMode = useMobileSearchStore((state) => state.changeMode);

  return (
    <div className="flex justify-end mb-4 md:hidden">
      <button
        onClick={changeMode}
        className="bg-blue-500 text-white px-4 py-2 rounded text-base"
      >
        <LuTextSearch />
      </button>
    </div>
  );
}
