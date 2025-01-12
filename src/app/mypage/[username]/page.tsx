// import { getUserSaveData } from "@/actions/user/getUserInfo.action";
// import MyPageLayout from "@/components/MyPageLayout";

// export default async function MyPage({
//   searchParams,
// }: {
//   searchParams: Promise<{ username: string }>;
// }) {
//   const params = await searchParams;
//   console.log(params);
//   const { username } = params;
//   console.log(username);

//   const res = await getUserSaveData(decodeURIComponent(username));
//   console.log(res);
//   return (
//     <div className="grid md:grid-cols-10 max-[766px]:grid-rows-7 w-full h-80vh">
//       {/* {res && <MyPageLayout data={res} />}  */}
//     </div>
//   );
// }
import { getUserSaveData } from "@/actions/user/getUserInfo.action";
import MyPageLayout from "@/components/MyPageLayout";
export default async function MyPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  let res = await getUserSaveData(decodeURIComponent(username));
  return (
    <div className="grid md:grid-cols-10 max-[766px]:grid-rows-7 w-full h-80vh">
      <MyPageLayout data={res} />
    </div>
  );
}
