"use client";
import { getDictionaryDataById } from "@/actions/dictionary/getDictionaryData.action";
import {
  editLikeNumber,
  editSaveNumber,
} from "@/actions/dictionary/updateDictionaryData.action";
import { getUserData } from "@/actions/user/getUserInfo.action";
import { editLikePost, editSavePost } from "@/actions/user/postUserData.action";
import CodeBlock from "@/components/CodeBlock";
import SaveModal from "@/components/SaveModal";
import { useAuthStore, useRecentDataStore } from "@/store/zustand/globalStore";
import { DictData, UserData } from "@/types/type";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { MdOutlineBookmarkAdd } from "react-icons/md";

export default function DetailPage({
  initialData,
  id,
}: {
  initialData: DictData;
  id: string;
}) {
  const { addData } = useRecentDataStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userData } = useAuthStore();
  const { data, refetch } = useQuery<DictData>({
    queryKey: ["dictData", id],
    queryFn: () => getDictionaryDataById(String(id)),
    initialData: initialData,
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

  return (
    <div className="p-6  rounded-lg shadow-lg h-full max-w-screen-xl">
      {data && (
        <div className="grid grid-rows-8 h-full grid-cols-1">
          <div className="row-span-7 p-2">
            <div className="mb-4">
              <div>
                <p className="text-4xl">제목 : {data.title}</p>
                <div className="flex justify-end">
                  <div className="me-4 flex justify-center items-center">
                    {userData && (
                      <button
                        onClick={() =>
                          LikeBtn(
                            userData.email,
                            userSaveData?.likedPosts.some(
                              (i) => i.id === data._id
                            )
                              ? "del"
                              : "add"
                          )
                        }
                        className="text-2xl me-4"
                      >
                        {userSaveData?.likedPosts.some(
                          (i) => i.id === data._id
                        ) ? (
                          <FcLike />
                        ) : (
                          <FaRegHeart />
                        )}
                      </button>
                    )}

                    <p className="text-xl">좋아요: {Number(data.like)}</p>
                  </div>
                  <div className="me-4  text-xl flex justify-center items-center">
                    {userData && (
                      <button
                        className="me-4 text-3xl"
                        onClick={() => setIsModalOpen(true)}
                      >
                        <MdOutlineBookmarkAdd />
                      </button>
                    )}
                    <p className="">저장: {data.save}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex max-[550px]:flex-col text-xl justify-end">
              <div className="text-end">
                <span className="me-4">작성자 : {data.author}</span>
                <span className="me-4">작성일 : {data.createdAt}</span>
              </div>
            </div>
            <div className="flex space-x-4 mb-4 items-center">
              <span className="font-semibold">카테고리 :</span>
              {data.category.map((i) => (
                <span
                  key={i._id}
                  className="me-2 border rounded-lg p-2 text-lg bg-gray-100 text-gray-800"
                >
                  {i.title}
                </span>
              ))}
            </div>
            <div className="text-2xl text-gray-800 mb-4">{data.content}</div>
            <div className="overflow-x-auto">
              <CodeBlock code={data.code} />
            </div>
          </div>
        </div>
      )}
      {userSaveData && data && userData && (
        <SaveModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          data={userSaveData}
          SaveBtn={SaveBtn}
          id={data._id}
          username={userData.username}
          userRefetch={userRefetch}
        />
      )}
    </div>
  );
}
