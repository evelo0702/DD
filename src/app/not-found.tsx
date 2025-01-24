"use client";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="h-80vh flex flex-col items-center justify-center  text-gray-800">
      <h1 className="text-6xl font-bold text-blue-600">404</h1>
      <p className="mt-4 text-3xl text-gray-600">
        접속하신 페이지를 찾을 수 없습니다 홈으로 돌아가기 버튼을 눌러주세요
      </p>
      <button
        onClick={() => router.push("/")}
        className="mt-6 px-6 py-2 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition"
      >
        Home
      </button>
    </div>
  );
}
