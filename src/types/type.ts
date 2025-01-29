import { JwtPayload } from "jsonwebtoken";

export interface DictData {
  _id: string;
  category: { title: string; _id: string }[];
  title: string;
  content: string;
  code: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  like: number;
  save: number;
}

// 사용자 스키마 타입 정의
export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  createdAt: string;
  saveCategory?: { _id: string; title: string }[];
}
export interface UserInfo extends JwtPayload {
  username: string;
  email: string;
  saveCategory?: { _id: string; title: string }[];
}
export interface SaveData {
  id: string;
  title: string;
  author: string;
  category: { title: string; _id: string }[];
  createdAt: string;
}
export interface UserData {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
  saveCategory: { _id: string; title: string }[];
  likedPosts: SaveData[];
  folders: {
    title: string;
    savedPosts: SaveData[];
  }[];
}
export interface CategoryData {
  _id: string;
  title: string;
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
}

export interface AuthState {
  token: string | null;
  userData: UserInfo | null;
  isAuthenticated: boolean;
  login: (token: string, userData: UserInfo) => void;
  logout: () => void;
}
