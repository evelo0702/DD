"use client";

import { getUserInfo } from "@/actions/user/getUserInfo.action";
import { logoutAction } from "@/actions/user/logout.action";
import { useAuthStore } from "@/store/zustand/globalStore";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { useEffect } from "react";

export default function AuthManager() {
  const { logout, userData, login } = useAuthStore();
  const router = useRouter();
  const segment = useSelectedLayoutSegment();

  // 로그인 상태 유지 (userData가 없을 때만 실행)
  useEffect(() => {
    if (!userData) {
      const persistLogin = async () => {
        let { token, userInfo } = await getUserInfo();
        if (token && userInfo) {
          login(token, userInfo);
        } else {
          logout();
          if (segment === "home") {
            router.push("/");
          }
        }
      };
      persistLogin();
    }
  }, []);

  // 로그인 만료 체크 (userData가 있을 때만 실행)
  useEffect(() => {
    if (!userData) return;

    const checkExpiration = () => {
      const currentTime = Math.floor(Date.now() / 1000);
      const exp = userData.exp!;
      if (currentTime >= exp) {
        logout();
        logoutAction();
        alert("로그인 유지 시간이 경과되었습니다");
        router.push("/");
      }
    };

    const interval = setInterval(checkExpiration, 1000 * 60);
    return () => clearInterval(interval);
  }, [userData]);

  return null;
}
