"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import LoginModal from "./LoginModal";
import { useAuthStore } from "@/store/zustand/globalStore";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated, logout } = useAuthStore();
  const handleLogin = () => setIsModalOpen(true);
  const handleLogout = () => {
    logout();
  };

  return (
    <header className="flex items-center mx-4">
      <Image src="/main.png" alt="" width={100} height={100} />
      <Link className="text-5xl" href="/">
        DevPedia
      </Link>
      <nav className="">
        <ul>
          <li>
            <Link href="/ai" className="mx-4 text-3xl">
              AI 사전 검색
            </Link>
            <Link href={"/signup"}>회원가입</Link>
          </li>
        </ul>
      </nav>
      {isAuthenticated ? (
        <button onClick={handleLogout}>로그아웃</button>
      ) : (
        <button onClick={handleLogin}>로그인!</button>
      )}
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  );
}