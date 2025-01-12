import { getUserSaveData } from "@/actions/user/getUserInfo.action";
import MyPageLayout from "@/components/MyPageLayout";

export default async function MyPage({
  searchParams,
}: {
  searchParams: Promise<{ username: string }>;
}) {
  let { username } = await searchParams;
  const res = await getUserSaveData(decodeURIComponent(username));

  return (
    <div className="grid md:grid-cols-10 max-[766px]:grid-rows-7 w-full h-80vh">
      {res && <MyPageLayout data={res} />}
    </div>
  );
}
