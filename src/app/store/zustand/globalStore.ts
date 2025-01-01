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