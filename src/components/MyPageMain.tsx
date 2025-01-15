"use client";
import { CategoryData, CategoryRes, UserData } from "@/types/type";
import CardList from "./CardList";
import { useEffect, useState } from "react";
import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import { getCategoryData } from "@/actions/category/getCategory.actions";
import {
  updateUserCategory,
  updateUserFolders,
} from "@/actions/user/postUserData.action";
import Link from "next/link";
export default function Main({
  data,
  isActive,
  folder,
  setFolder,
  folderName,
  setIsActive,
  refetch,
}: {
  data: UserData;
  isActive: string;
  folder: number;
  setFolder: (type: number) => void;
  folderName: string[] | "";
  setIsActive: (type: string) => void;
  refetch: () => Promise<QueryObserverResult<UserData>>;
}) {
  const likeData = data.likedPosts;
  const saveData = data.folders && data.folders[folder];
  const [editMode, setEditMode] = useState(false);
  const [changeTitle, setChangeTitle] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const { data: categoryData } = useQuery<CategoryRes>({
    queryKey: ["category"],
    queryFn: getCategoryData,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
  });
  const [editCategory, setCategory] = useState([{ _id: "", title: "" }]);
  const handleCategoryChange = (data: { _id: string; title: string }) => {
    if (editCategory.some((i) => i._id === data._id)) {
      setCategory(editCategory.filter((i) => i._id !== data._id));
    } else {
      setCategory([...editCategory, data]);
    }
  };
  const handleSaveCategory = async (
    username: string,
    newData: CategoryData[]
  ) => {
    console.log(data.saveCategory);
    console.log(newData);
    if (data.saveCategory !== newData) {
      let result = await updateUserCategory(newData, username);
      console.log(result);
      await refetch();
    }
    return;
  };

  useEffect(() => {
    if (data && data.saveCategory) {
      setCategory(data.saveCategory);
    }
  }, [data]);
  const delFolder = async (title: string) => {
    let res = await updateUserFolders(title, data.username, "del");
    await refetch();
    console.log(res);
    setFolder(0);
  };
  const updateFolderName = async (title: string, newTitle: string) => {
    if (newTitle.length === 0) {
      return alert("폴더명을 입력해주세요");
    }
    if (newTitle !== saveData.title) {
      let res = await updateUserFolders(
        title,
        data.username,
        "change",
        newTitle
      );
      await refetch();
      console.log(res);
    }
  };
  return (
    <div className="w-full h-full p-3 border-4 border-brown-50 md:rounded-e-lg rounded-b-lg bg-white shadow-lg flex">
      {isActive === "user" && (
        <div className="grid gap-2 h-full w-full">
          <div className="p-5 bg-gray-50 border rounded-lg shadow-md flex flex-col h-full">
            <div className="text-end">
              {editMode ? (
                <button
                  onClick={() => {
                    handleSaveCategory(data.username, editCategory);
                    setEditMode(false);
                  }}
                >
                  저장하기
                </button>
              ) : (
                <button onClick={() => setEditMode(true)}>수정하기</button>
              )}
            </div>
            {data && (
              <div className="space-y-2 text-lg font-medium text-gray-800 flex-grow">
                <div className="flex">
                  <span className="font-semibold text-brown-600">닉네임:</span>
                  <p>{data.username}</p>
                </div>
                <p>
                  <span className="font-semibold text-brown-600">이메일:</span>{" "}
                  {data.email}
                </p>
                <div className="mt-3">
                  <span className="font-semibold text-brown-600">
                    관심 카테고리:
                  </span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {editMode ? (
                      <>
                        {categoryData &&
                          categoryData.category.map((i) => (
                            <button
                              key={i._id}
                              onClick={() => {
                                handleCategoryChange({
                                  _id: i._id,
                                  title: i.title,
                                });
                              }}
                              className={`${
                                editCategory.some((data) => data._id === i._id)
                                  ? "text-red-400"
                                  : ""
                              }`}
                            >
                              {i.title}
                            </button>
                          ))}
                      </>
                    ) : (
                      <>
                        {data.saveCategory &&
                          data.saveCategory.map((i) => (
                            <span
                              key={i._id}
                              className="px-3 py-1 text-sm bg-brown-100 text-brown-800 rounded-lg"
                            >
                              {i.title}
                            </span>
                          ))}
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="p-5 bg-gray-50 border rounded-lg shadow-md h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700">
                좋아요 한 글 : {data.likedPosts && data.likedPosts.length}개
              </h2>
              <button
                onClick={() => setIsActive("like")}
                className="px-4 py-2 text-sm font-medium text-white bg-brown-600 rounded-lg hover:bg-brown-700 transition"
              >
                전체 글 보러가기
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3 flex-grow">
              {data.likedPosts &&
                data.likedPosts.slice(0, 6).map((i, index) => (
                  <Link
                    href={`/detail/${i.id}`}
                    key={index}
                    className="p-3 rounded-lg shadow hover:shadow-lg transition-all"
                  >
                    <p className="text-sm font-medium text-gray-800">
                      {i.title}
                    </p>
                  </Link>
                ))}
            </div>
          </div>
          <div className="p-5 bg-gray-50 border rounded-lg shadow-md h-full flex flex-col">
            <h2 className="mb-4 text-lg font-semibold text-gray-700">
              저장한 폴더
            </h2>
            <div className="grid grid-cols-3 gap-4 flex-grow">
              {data.folders &&
                data.folders.map((i, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setFolder(index);
                      setIsActive("save");
                    }}
                    className="p-4 bg-white border rounded-lg shadow hover:shadow-lg transition-all"
                  >
                    <p className="mb-2 text-sm font-semibold text-gray-800">
                      {i.title}
                    </p>
                    <p className="text-xs text-gray-600">
                      저장된 글: {i.savedPosts.length}
                    </p>
                    {i.savedPosts[0] && (
                      <p className="mt-2 text-sm text-gray-700 truncate">
                        {i.savedPosts[0].title}
                      </p>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
      {isActive === "like" && (
        <div className="w-full h-full p-5 bg-gray-50 border rounded-lg shadow-md">
          <CardList
            totaldata={likeData}
            folder={folder}
            isActive={isActive}
            refetch={refetch}
          />
        </div>
      )}
      {isActive === "save" && saveData && (
        <div className="w-full h-full flex flex-col">
          <div className="max-[767px]:block hidden">
            {folderName &&
              folderName.map((i, index) => (
                <button key={index} onClick={() => setFolder(index)}>
                  {i}
                </button>
              ))}
          </div>
          <div className="mb-2 flex justify-between">
            <div>{folderName && folderName[folder]}</div>
            <div>
              {changeTitle ? (
                <>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                  <button
                    className="border rounded-lg p-2 bg-red-600 text-white"
                    onClick={() => {
                      setChangeTitle(false);
                      updateFolderName(saveData.title, newTitle);
                    }}
                  >
                    변경 저장
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="border rounded-lg p-2 bg-red-600 text-white"
                    onClick={() => {
                      setChangeTitle(true);
                    }}
                  >
                    폴더명 수정하기
                  </button>
                </>
              )}
              <button
                className="border rounded-lg p-2 bg-red-600 text-white"
                onClick={() => delFolder(saveData.title)}
              >
                폴더 삭제하기
              </button>
            </div>
          </div>
          <div className="flex-grow p-1 bg-gray-50 border rounded-lg shadow-md">
            {folderName && (
              <CardList
                totaldata={saveData.savedPosts}
                folder={folder}
                isActive={isActive}
                title={folderName[folder]}
                refetch={refetch}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
