"use client";
import { getDictionaryDataById } from "@/actions/dictionary/getDictionaryData.action";
import {
  editLikeNumber,
  editSaveNumber,
} from "@/actions/dictionary/updateDictionaryData.action";
import { getUserData } from "@/actions/user/getUserInfo.action";
import {
  editLikePost,
  editSavePost,
  updateUserFolders,
} from "@/actions/user/postUserData.action";
import CodeBlock from "@/components/CodeBlock";
import { useAuthStore, useRecentDataStore } from "@/store/zustand/globalStore";
import { DictData, UserData } from "@/types/type";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Detail() {
  const { addData } = useRecentDataStore();
  const { userData } = useAuthStore();
  const params = useParams();
  const id = params.id as string;
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
  const SaveBtn = async (email: string, folderTitle: string, type: string) => {
    if (data) {
      let Postdata = {
        id: data._id,
        title: data.title,
        author: data.author,
        category: data.category,
        createdAt: data.createdAt,
      };
      let res = await editSaveNumber(id, type);
      let res2 = await editSavePost(email, folderTitle, Postdata, type);
      console.log(res);
      console.log(res2);
      await refetch();
      await userRefetch();
    }
  };
  const [title, setTitle] = useState("");
  const LikeBtn = async (email: string, type: string) => {
    if (data) {
      let Postdata = {
        id: data._id,
        title: data.title,
        author: data.author,
        category: data.category,
        createdAt: data.createdAt,
      };
      let res = editLikeNumber(id, type);
      let res2 = editLikePost(email, Postdata, type);
      console.log(res);
      console.log(res2);
      await refetch();
      await userRefetch();
    }
  };
  const addFolder = async () => {
    if (title.length === 0) {
      return alert("폴더명을 입력해주세요");
    }
    let res = await updateUserFolders(title, userData!.username, "add");
    console.log(res);
    await userRefetch();
    setTitle("");
  };
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      {data && (
        <div className="">
          {userData && (
            <div className="my-4 space-y-8 md:flex md:items-start md:justify-between">
              {userSaveData && (
                <div className="w-full md:w-1/2">
                  {userSaveData.folders.length > 0 ? (
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                      {userSaveData.folders.map((folder, index) => (
                        <div
                          key={index}
                          className="p-5 bg-gray-100 border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
                        >
                          <h3 className="text-lg text-gray-800 me-4">
                            {folder.title}
                          </h3>
                          <button
                            onClick={() =>
                              SaveBtn(
                                userData.email,
                                folder.title,
                                folder.savedPosts.some((i) => i.id === data._id)
                                  ? "del"
                                  : "add"
                              )
                            }
                            className={`p-3 rounded-lg text-white transition ${
                              folder.savedPosts.some((i) => i.id === data._id)
                                ? "bg-red-500 hover:bg-red-600"
                                : "bg-blue-500 hover:bg-blue-600"
                            }`}
                          >
                            {folder.savedPosts.some((i) => i.id === data._id)
                              ? "삭제"
                              : "저장"}
                          </button>
                        </div>
                      ))}
                      {userSaveData.folders.length < 3 && (
                        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-5 rounded-lg">
                          <input
                            type="text"
                            className="border border-gray-300 p-3 rounded-md w-full mb-3 focus:ring focus:ring-blue-200 focus:outline-none"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="폴더 이름 입력"
                          />
                          <button
                            onClick={addFolder}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                          >
                            폴더 생성하기
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500">저장된 폴더가 없습니다.</p>
                  )}
                </div>
              )}
              <div className="w-full md:w-1/3 flex justify-end">
                <button
                  onClick={() =>
                    LikeBtn(
                      userData.email,
                      userSaveData?.likedPosts.some((i) => i.id === data._id)
                        ? "del"
                        : "add"
                    )
                  }
                  className={`px-6 py-3 rounded-lg font-semibold text-white shadow-md transition-transform transform hover:scale-105 ${
                    userSaveData?.likedPosts.some((i) => i.id === data._id)
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {userSaveData?.likedPosts.some((i) => i.id === data._id)
                    ? "좋아요 취소"
                    : "좋아요"}
                </button>
              </div>
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
