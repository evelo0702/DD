import { JwtPayload } from "jsonwebtoken";

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
  likedPosts?: string[];
  folders?: { name: string; savePosts: string[] }[];
  saveCategory?: { id: string; title: string }[];
}
export interface UserInfo extends JwtPayload {
  username: string;
  email: string;
  likedPosts?: string[];
  folders?: { name: string; savePosts: string[] }[];
  saveCategory?: { id: string; title: string }[];
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
  userData: UserInfo | null;
  isAuthenticated: boolean;
  login: (token: string, userData: UserInfo) => void;
  logout: () => void;
}
