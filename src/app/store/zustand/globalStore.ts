import { RecentDataState } from "@/app/types/type";
import { create } from "zustand";

// 모바일 검색 상태
interface MobileSearchState {
  showMobileSearch: boolean;
  changeMode: () => void;
}
export const useMobileSearchStore = create<MobileSearchState>((set) => ({
  showMobileSearch: false,
  changeMode: () =>
    set((state) => ({ showMobileSearch: !state.showMobileSearch })),
}));

// 다크모드 on/off를 위한 상태

// 최근 본 게시물


const MAX_DATA = 5;
export const useRecentDataStore = create<RecentDataState>((set) => ({
  recentData: [],
  addData: (data) => {
    set((state) => {
      const existingData = state.recentData.filter((i) => i.id === data.id)[0];
      let updatedData = [data, ...state.recentData];
      if (existingData) {
        let temp = updatedData.filter((i) => i.id !== existingData.id);
        updatedData = [existingData, ...temp];
      }
      if (updatedData.length > MAX_DATA) {
        updatedData.pop();
      }

      return { recentData: updatedData };
    });
  },
}));
