"use client";
import {
  DetailAnalysisOpenAi,
  QuickAnalysisOpenAi,
} from "@/actions/openai.action";
import { useEffect, useRef, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import { getDictionaryData } from "@/actions/dictionary/getDictionaryData.action";
import { DictData } from "@/types/type";
import Link from "next/link";
interface Msg {
  sender: string;
  text: string;
  type: string;
  id?: string;
}
export default function ChatLayout({ DictData }: { DictData: DictData[] }) {
  const [messages, setMessages] = useState<Msg[]>([
    {
      sender: "bot",
      text: "ai에게 질문을 하시면 간단한 답변과 사전에 저장된 관련데이터를 불러옵니다. ex)리액트 훅에 대해 궁금해요",
      type: "msg",
    },
  ]);
  const { data } = useQuery<DictData[]>({
    queryKey: ["dictData"],
    queryFn: getDictionaryData,
    initialData: DictData,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = async () => {
    if (input && data) {
      setLoading(true);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", text: input, type: "msg" },
      ]);
      const msg = await QuickAnalysisOpenAi(input);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: msg, type: "msg" },
      ]);
      const res = await DetailAnalysisOpenAi(data, input);
      const list = JSON.parse(res.replace(/```json|```/g, "").trim());
      const newMsg = list.map((i: { id: string; title: string }) => ({
        sender: "bot",
        text: i.title,
        type: "link",
        id: i.id,
      }));
      if (newMsg && Array.isArray(newMsg) && newMsg.length > 0) {
        setMessages((prevMessages) => [...prevMessages, ...newMsg]);
      }
      setLoading(false);
    }
  };
  const sendMessage = async () => {
    if (input.trim() !== "") {
      setInput("");
      return await handleSubmit();
    }
    alert("메시지를 입력해주세요");
  };
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };
  return (
    <div className="flex flex-col h-full bg-gray-100 p-5">
      <div className="flex flex-col max-w-3xl mx-auto bg-white shadow-lg rounded-lg w-full h-full p-5">
        {/* 메시지 목록 */}
        <div className="h-full overflow-y-auto">
          <div className="p-4 grid max-[640px]:grid-cols-2 sm:grid-cols-4 max-[400px]:grid-cols-1 gap-2">
            {messages.map((msg, index) =>
              msg.type === "msg" ? (
                <div
                  key={index}
                  className={`col-span-4 max-[640px]:col-span-2 max-[400px]:col-span-1 mb-2 p-3 rounded-lg text-xl ${
                    msg.sender === "bot"
                      ? "bg-gray-200 text-gray-800"
                      : "bg-blue-200 text-end"
                  }`}
                >
                  {msg.text}
                </div>
              ) : (
                <Link
                  target="_blank"
                  key={index}
                  href={`/detail/${msg.id!}`}
                  className="col-span-1 h-[150px] max-[400px]:h-[100px]"
                >
                  <div className="group max-w-xs h-full bg-white border-2 border-gray-200 rounded-lg overflow-auto  transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-blue-300 flex items-center">
                    <div className="p-3 max-[400px]:p-1 text-center">
                      <h2 className="text-2xl text-gray-900 transition-colors duration-300">
                        {msg.text}
                      </h2>
                    </div>
                  </div>
                </Link>
              )
            )}
            {loading && (
              <div className="col-span-4 max-[400px]:col-span-1">
                <p className="text-xl text-center">
                  Ai가 질문과 관련있는 사전 데이터를 불러오는 중입니다
                </p>
                <LoadingSpinner />
              </div>
            )}
            <div ref={messageEndRef} />
          </div>
        </div>

        {/* 입력창 */}
        <div className="w-full pt-2 border-t border-gray-200 grid grid-cols-10">
          <input
            type="text"
            className="col-span-9 me-2 max-[400px]:col-span-7 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-xl"
            placeholder="질문을 입력해주세요"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleEnterKey}
          />
          <button
            className="col-span-1 max-[400px]:col-span-3 px-4 py-2 bg-blue-200 hover:bg-slate-600 hover:text-white rounded-lg text-xl"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
