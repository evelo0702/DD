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
  likedPosts: string[];
  folders: { name: string; savePosts: string[] }[];
}

export interface CategoryData {
  _id: string;
  name: string;
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