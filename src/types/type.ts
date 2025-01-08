export interface DictData {
  _id: string;
  category: { name: string; _id: string }[];
  title: string;
  content: string;
  code: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  views: number;
}

// 사용자 스키마 타입 정의
export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  createdAt: string;
  likedPost?: string[];
  folders?: { name: string; savePosts: string[] }[];
  saveCategorys?: { id: string; title: string }[];
}

export interface CategoryData {
  _id: string;
  name: string;
}
export interface CategoryRes {
  status: number;
  category: CategoryData[];
}
// 최근 게시물
export interface RecentData {
  id: string;
  title: string;
}
export interface RecentDataState {
  recentData: RecentData[];
  addData: (data: Omit<RecentData, "viewAt">) => void;
}

export interface FormState {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}
