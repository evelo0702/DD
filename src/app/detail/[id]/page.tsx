"use client";
import { getDictionaryDataById } from "@/actions/dictionary/getDictionaryData.action";
import {
  addLikeNumber,
  addSaveNumber,
} from "@/actions/dictionary/updateDictionaryData.action";
import { getUserData } from "@/actions/user/getUserInfo.action";
import { addLikePost, addSavePost } from "@/actions/user/postUserData.action";
import CodeBlock from "@/components/CodeBlock";
import { useAuthStore, useRecentDataStore } from "@/store/zustand/globalStore";
import { DictData, UserData } from "@/types/type";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Detail() {
  const { addData } = useRecentDataStore();
  const { userData } = useAuthStore();
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const { data, refetch } = useQuery<DictData>({
    queryKey: ["dictData", id],
    queryFn: () => getDictionaryDataById(String(id)),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
  });
  const { data: userSaveData, refetch: userRefetch } = useQuery<UserData>({
    queryKey: ["userData"],
    queryFn: () => getUserData(userData!.username),
  });
  useEffect(() => {
    if (data) {
      addData({ id: data._id, title: data.title });
    }
  }, [data]);
  const SaveBtn = async (email: string, folderTitle: string) => {
    if (data) {
      let Postdata = {
        id: data._id,
        title: data.title,
        author: data.author,
        category: data.category,
        createdAt: data.createdAt,
      };
      let res = await addSaveNumber(id);
      let res2 = await addSavePost(email, folderTitle, Postdata);
      console.log(res);
      console.log(res2);
      await refetch();
      await userRefetch();
    }
  };
  const LikeBtn = async (email: string) => {
    if (data) {
      let Postdata = {
        id: data._id,
        title: data.title,
        author: data.author,
        category: data.category,
        createdAt: data.createdAt,
      };
      let res = addLikeNumber(id);
      let res2 = addLikePost(email, Postdata);
      console.log(res);
      console.log(res2);
      await refetch();
      await userRefetch();
    }
  };
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      {data && (
        <div>
          {userData && (
            <div className="my-3 flex items-center justify-end space-x-4">
              <button
                onClick={() => {
                  LikeBtn(userData.email);
                }}
                className="px-4 mx-2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
              >
                좋아요
              </button>
              {userSaveData && (
                <div>
                  {userSaveData.folders.map((i, index) => (
                    <div className="flex" key={index}>
                      <div>{i.title}</div>
                      <button
                        onClick={() => SaveBtn(userData.email, i.title)}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none"
                      >
                        저장
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          <div className="flex mb-4 justify-between">
            <p className="text-4xl font-semibold me-4">제목 : {data.title}</p>
            <div className="max-[540px]:flex max-[540px]:flex-col">
              <span className="mr-4">좋아요: {Number(data.like)}</span>
              <span>저장: {data.save}</span>
            </div>
          </div>
          <div className="flex text-gray-600"></div>
          <p className="text-xl text-gray-600 mb-2">작성자 : {data.author}</p>
          <p className="text-xl text-gray-600 mb-4">
            작성일 : {data.createdAt}
          </p>

          <div className="flex space-x-4 mb-4">
            <span className="font-semibold">카테고리 :</span>
            {data.category.map((i) => (
              <span
                key={i._id}
                className="bg-gray-200 px-3 py-1 rounded-full text-xl text-gray-700"
              >
                {i.title}
              </span>
            ))}
          </div>

          <div className="text-2xl text-gray-800 mb-4">{data.content}</div>

          <CodeBlock code={data.code} />
        </div>
      )}
    </div>
  );
}
