"use client";

import { useMobileSearchStore } from "../store/globalStore";

export default function CardList() {
  const showMobileSearch = useMobileSearchStore(
    (state) => state.showMobileSearch
  );
  return (
    <div
      className={` bg-red-400 md:col-span-6 md:block text-4xl  ${
        showMobileSearch ? "hidden" : ""
      } `}
    >
      <div className="grid grid-rows-4 grid-cols-2 h-5/6 p-1">
        <div className="border-4 rounded-lg p-4 m-1">z</div>
        <div className="border-4 rounded-lg p-4 m-1">g</div>
        <div className="border-4 rounded-lg p-4 m-1">b</div>
        <div className="border-4 rounded-lg p-4 m-1">c</div>
        <div className="border-4 rounded-lg p-4 m-1">a</div>
        <div className="border-4 rounded-lg p-4 m-1">e</div>
        <div className="border-4 rounded-lg p-4 m-1">n</div>
        <div className="border-4 rounded-lg p-4 m-1">p</div>
      </div>
      <div className="h-1/6">pagination</div>
    </div>
  );
}
