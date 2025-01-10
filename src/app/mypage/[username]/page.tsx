import { getUserSaveData } from "@/actions/user/getUserInfo.action";
import MyPageLayout from "@/components/MyPageLayout";

export default async function MyPage({
  params,
}: {
  params: { username: string };
}) {
  const { username } = await params;
  let res = await getUserSaveData(decodeURIComponent(username));

  return (
    <div className="grid md:grid-cols-10 max-[766px]:grid-rows-7 w-full h-80vh">
      <MyPageLayout data={res} />
    </div>
  );
}
