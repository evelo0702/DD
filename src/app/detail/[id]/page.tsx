import { getDictionaryDataById } from "@/actions/dictionary/getDictionaryData.action";
import DetailPage from "@/components/DetailPage";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getDictionaryDataById(id);
  return {
    title: `${data.title} 상세정보`,
    description: `DevPedia에 저장된 ${data.title}의 상세 정보 페이지 입니다`,
    openGraph: {
      title: `${data.title} 상세정보`,
      description: `DevPedia에 저장된 ${data.title}의 상세 정보 페이지 입니다`,
      images: ["/main.png"],
    },
    metadataBase: new URL("https://dev-pedia.vercel.app"),
  };
}
export default async function PageName({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getDictionaryDataById(id);
  return (
    <div>
      <DetailPage initialData={data} id={id} />
    </div>
  );
}
