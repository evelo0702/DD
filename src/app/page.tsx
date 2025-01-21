import { getDictionaryData } from "@/actions/dictionary/getDictionaryData.action";
import MainPageLayout from "../components/MainPageLayout";
import MobileSearchBtn from "../components/MobileSearchBtn";

export default async function Home() {
  let DictData = await getDictionaryData();

  return (
    <div className="h-full">
      <main className="h-full">
        {/* 모바일에서 보일 검색 버튼 */}
        <MobileSearchBtn />

        <div className="grid grid-cols-1 md:grid-cols-9 gap-4 h-full">
          {/* 사전 카드 리스트 */}

          <MainPageLayout DictData={DictData} />

          {/* 사이드바 */}
        </div>
      </main>
    </div>
  );
}
