import { getUserSaveData } from "@/actions/user/getUserInfo.action";
import MyPageLayout from "@/components/MyPageLayout";

export default async function MyPage({
  searchParams,
}: {
  searchParams: Promise<{ username: string }>;
}) {
  try {
    const params = await searchParams;  // searchParams Promise 해제
    const { username } = params;  // username 추출
    
    if (!username) {
      return <div>Username is missing</div>; // username이 없을 경우 처리
    }
    
    const res = await getUserSaveData(decodeURIComponent(username));  // 데이터 가져오기
    
    if (!res) {
      return <div>No data found for user: {username}</div>;  // 데이터가 없을 경우 처리
    }

    return (
      <div className="grid md:grid-cols-10 max-[766px]:grid-rows-7 w-full h-80vh">
        <MyPageLayout data={res} /> {/* 데이터를 이용해 렌더링 */}
      </div>
    );
  } catch (error) {
    console.error("Error in MyPage component:", error);
    return <div>Error occurred</div>;  // 오류 발생 시 표시
  }
}
