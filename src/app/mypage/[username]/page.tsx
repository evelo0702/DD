import { getUserSaveData } from "@/actions/user/getUserInfo.action";
import MyPageLayout from "@/components/MyPageLayout";

export default async function MyPage({
  searchParams,
}: {
  searchParams: Promise<{ username: string }>;
}) {
  const params = await searchParams; // searchParams Promise 해제
  const { username } = params; // username 추출

  const res = await getUserSaveData(decodeURIComponent(username)); // 데이터 가져오기

  return (
    <div className="grid md:grid-cols-10 max-[766px]:grid-rows-7 w-full h-80vh">
      <MyPageLayout data={res} /> {/* 데이터를 이용해 렌더링 */}
    </div>
  );
}
