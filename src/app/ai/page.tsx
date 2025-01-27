import { getDictionaryData } from "@/actions/dictionary/getDictionaryData.action";
import ChatLayout from "@/components/ChatAI";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DevPedia Ai 검색",
  description:
    "Ai를 통해 질문에 대해 간단한 답변과 사전에 저장된 데이터를 검색해보세요",
  openGraph: {
    title: "DevPedia Ai 검색",
    description:
      "Ai를 통해 질문에 대해 간단한 답변과 사전에 저장된 데이터를 검색해보세요",
    images: ["/main.png"],
  },
  metadataBase: new URL("https://dev-pedia.vercel.app"),
};
export default async function ChatAi() {
  let DictData = await getDictionaryData();

  return (
    <div className="h-85vh">
      <ChatLayout DictData={DictData} />
    </div>
  );
}
