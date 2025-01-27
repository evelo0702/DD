"use client";
import Link from "next/link";
import { useState } from "react";
import LoginModal from "./LoginModal";
import { useAuthStore } from "@/store/zustand/globalStore";
import { logoutAction } from "@/actions/user/logout.action";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated, logout, userData } = useAuthStore();
  const router = useRouter();
  const handleLogin = () => {
    setIsModalOpen(true);
  };
  const handleLogout = async () => {
    logout();
    let res = await logoutAction();
    console.log(res);
    setTimeout(() => {
      router.push("/");
    }, 500);
  };

  return (
    <header className="flex items-center justify-between p-4 ">
      <div className="flex items-center">
        <Link className="text-5xl max-[480px]:text-5xl" href="/">
          DevPedia
        </Link>
        <nav className="">
          <ul>
            <li>
              <Link href="/ai" className="mx-4 text-3xl max-[400px]:text-xl">
                AI 사전 검색
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex justify-end text-2xl max-[480px]:text-xl me-2">
        {isAuthenticated && userData ? (
          <>
            <button className="mx-2 " onClick={handleLogout}>
              로그아웃
            </button>
            <Link href={`/mypage/${userData.username}`}>마이페이지</Link>
          </>
        ) : (
          <>
            <Link className="mx-2" href={"/signup"}>
              회원가입
            </Link>
            <button onClick={handleLogin}>로그인</button>
          </>
        )}
      </div>
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  );
}
