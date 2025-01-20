import MainPageLayout from "../components/MainPageLayout";
import MobileSearchBtn from "../components/MobileSearchBtn";

export default function Home() {
  return (
    <div className="h-full">
      <main className="h-full">
        {/* 모바일에서 보일 검색 버튼 */}
        <MobileSearchBtn />

        <div className="grid grid-cols-1 md:grid-cols-9 gap-4 h-full">
          {/* 사전 카드 리스트 */}

          <MainPageLayout />

          {/* 사이드바 */}
        </div>
      </main>
    </div>
  );
}
