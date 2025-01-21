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
export default function ChatLayout() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const { data } = useQuery<DictData[]>({
    queryKey: ["dictData"],
    queryFn: getDictionaryData,
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
  return (
    <div className="flex flex-col h-80vh bg-gray-100 p-5">
      <div className="flex flex-col flex-grow max-w-3xl mx-auto bg-white shadow-lg rounded-lg  w-full h-full p-5">
        {/* 메시지 목록 */}
        <div className="h-full overflow-y-auto">
          <div className="p-4  grid max-[640px]:grid-cols-2 sm:grid-cols-4 max-[400px]:grid-cols-1 gap-2">
            {messages.map((msg, index) =>
              msg.type === "msg" ? (
                <div
                  key={index}
                  className={`col-span-4 max-[640px]:col-span-2 max-[400px]:col-span-1 mb-2 p-3 rounded-lg text-xl ${
                    msg.sender === "bot"
                      ? "bg-gray-200 text-gray-800"
                      : "bg-blue-200  text-end"
                  }`}
                >
                  {msg.text}
                </div>
              ) : (
                <Link key={index} href={`/detail/${msg.id!}`} className="col-span-1">
                  <div className="group max-w-xs bg-white border-2 border-gray-200 rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-blue-300">
                    <div className="p-6 max-[400px]:p-1 max-[400px]:text-center">
                      <h2 className="text-2xl  text-gray-900  transition-colors duration-300">
                        {msg.text}
                      </h2>
                    </div>
                  </div>
                </Link>
              )
            )}
            {loading && (
              <div className="col-span-4 max-[400px]:col-span-1">
                <LoadingSpinner />
              </div>
            )}
            <div ref={messageEndRef} />
          </div>
        </div>
        {/* 입력창 */}
        <div className="flex items-center p-4 border-t border-gray-200">
          <input
            type="text"
            className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-xl"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="ml-4 px-4 py-2 bg-blue-200 hover:bg-slate-600 hover:text-white rounded-lg  text-xl"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
