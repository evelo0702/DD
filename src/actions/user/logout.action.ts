"use server";

import { cookies } from "next/headers";

export async function logoutAction() {
  const cookieStore = cookies();

  // 쿠키를 만료 처리
  (await cookieStore).set("token", "", {
    path: "/", // 쿠키의 경로 (생성 시의 경로와 일치해야 함)
    httpOnly: true,
    secure: true, // HTTPS에서만 사용
    sameSite: "strict",
    expires: new Date(0), // 과거 시간으로 설정
  });

  return { message: "Logged out successfully" };
}
