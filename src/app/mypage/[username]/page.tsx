import { getUserData } from "@/actions/user/getUserInfo.action";
import { verifyUserPermission } from "@/actions/user/verifyUserData.action";
import MyPageLayout from "@/components/MyPageLayout";
export default async function MyPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  let res = await getUserData(username);
  let correct = await verifyUserPermission(username);
  if (correct) {
    return (
      <div className="grid md:grid-cols-10 max-[766px]:grid-rows-12 w-full">
        <MyPageLayout initialdata={res} username={username} />
      </div>
    );
  } else {
    return <div> 해당 페이지에 대한 권한이 없습니다</div>;
  }
}
