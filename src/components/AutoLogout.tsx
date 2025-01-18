"use client";

import { getUserInfo } from "@/actions/user/getUserInfo.action";
import { logoutAction } from "@/actions/user/logout.action";
import { useAuthStore } from "@/store/zustand/globalStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AutoLogout() {
  const { logout, userData, login } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    logout();
    let res = await logoutAction();
    console.log(res);
    setTimeout(() => {
      router.push("/");
    }, 500);
  };
  const persistLogin = async () => {
    let { token, userInfo } = await getUserInfo();

    if (token && userInfo) {
      login(token, userInfo);
    } else {
      logout();
      router.push("/");
    }
  };
  useEffect(() => {
    if (!userData) {
      persistLogin();
      return;
    }
    if (userData) {
      const checkExpiration = () => {
        const currentTime = Math.floor(Date.now() / 1000);
        const exp = userData.exp!;
        if (currentTime >= exp) {
          handleLogout();
          alert("로그인 유지 시간이 경과되었습니다");
        }
      };
      const interval = setInterval(checkExpiration, 1000 * 60);
      return () => clearInterval(interval);
    }
  }, [userData, router]);
  return null;
}
