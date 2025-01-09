"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { UserInfo } from "@/types/type";

export async function getUserInfo(): Promise<{
  token: string | null;
  userInfo: UserInfo | null;
}> {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value ?? null;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserInfo;
      return { token, userInfo: decoded };
    } catch (error) {
      console.error("Token verification failed:", error);
      return { token, userInfo: null }; // 토큰 검증 실패
    }
  }

  // 토큰이 없을 경우
  return { token: null, userInfo: null };
}