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
    if (data.saveCategory !== newData) {
      let result = await updateUserCategory(newData, username);
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
    let delConfirm = confirm(`${title}폴더를 삭제하시겠습니까? `);
    if (delConfirm) {
      let res = await updateUserFolders(title, data.username, "del");
      await refetch();
      console.log(res);
      return setFolder(0);
    }
    return;
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
    <div className="w-full h-full p-3 border-4 border-black-50 md:rounded-e-lg rounded-b-lg bg-white shadow-lg flex">
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
              <div className="space-y-2 text-xl font-medium text-gray-800 flex-grow">
                <div className="flex">
                  <span className="font-semibold ">닉네임:</span>
                  <p>{data.username}</p>
                </div>
                <p>
                  <span className="font-semibold ">이메일:</span> {data.email}
                </p>
                <div className="mt-3">
                  <span className="font-semibold ">관심 카테고리:</span>
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
                              className="px-3 py-1 bg-gray-100 text-gray-800   text-xl border p-1  rounded-lg"
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
              <h2 className="text-2xl text-gray-700">
                좋아요 한 글 : {data.likedPosts && data.likedPosts.length}개
              </h2>
              <button
                onClick={() => setIsActive("like")}
                className="px-4 py-2 text-xl  rounded-lg  transition"
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
                    className={`p-3 rounded-lg shadow hover:shadow-lg transition-all border-l-4 ${
                      ((index === 0 || index === 1) && "border-indigo-300") ||
                      ((index === 2 || index === 3) && "border-blue-300") ||
                      ((index === 4 || index === 5) && "border-teal-300")
                    }`}
                  >
                    <p className="text-lg font-medium text-gray-800">
                      {i.title}
                    </p>
                  </Link>
                ))}
            </div>
          </div>
          <div className="p-5 bg-gray-50 border rounded-lg shadow-md h-full flex flex-col">
            <h2 className="mb-4 text-lg  ">저장한 폴더</h2>
            <div className="grid grid-cols-3 gap-4 flex-grow">
              {data.folders &&
                data.folders.map((i, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setFolder(index);
                      setIsActive("save");
                    }}
                    className={`p-4 bg-white  rounded-lg shadow hover:shadow-lg transition-all border-l-4 ${
                      (index === 0 && "border-indigo-300") ||
                      (index === 1 && "border-purple-300") ||
                      (index === 2 && "border-teal-300")
                    }`}
                  >
                    <p className="mb-2 text-xl  text-gray-800 h-1/2">
                      {i.title}
                    </p>
                    <p className="text-lg text-gray-600">
                      저장: {i.savedPosts.length}
                    </p>
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
        <div className="w-full h-full flex flex-col p-2">
          {/* <div className="max-[767px]:block hidden">
            {folderName && (
              <div className="flex flex-wrap gap-2">
                {folderName.map((i, index) => (
                  <button
                    key={index}
                    onClick={() => setFolder(index)}
                    className={`px-4 py-2 bg-gray-200 text-gray-800 rounded-lg shadow-md hover:bg-red-500
                     hover:text-white transition-all`}
                  >
                    {i}
                  </button>
                ))}
              </div>
            )}
          </div> */}
          <div className="max-[767px]:block hidden">
            {folderName && (
              <div className="flex justify-start items-center gap-6">
                {folderName.map((i, index) => (
                  <div
                    key={index}
                    onClick={() => setFolder(index)}
                    className={`cursor-pointer text-xl font-semibold text-gray-800 hover:text-red-500 
          ${
            folder === index ? "border-b-2 border-red-500" : ""
          } transition-all`}
                  >
                    {i}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mb-4 flex justify-between items-center flex-col sm:flex-row sm:items-center">
            <div className="text-3xl mb-2 sm:mb-0">
              {folderName && folderName[folder]}
            </div>
            <div className="flex sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
              {changeTitle ? (
                <>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="p-2 text-xl bg-white border rounded-lg shadow-lg transition-all w-full sm:w-48"
                  />
                  <button
                    className="border rounded-lg p-2 bg-gray-200 w-full sm:w-auto"
                    onClick={() => {
                      setChangeTitle(false);
                      updateFolderName(saveData.title, newTitle);
                    }}
                  >
                    변경 저장
                  </button>
                </>
              ) : (
                <button
                  className="border rounded-lg p-2 bg-gray-200 w-full sm:w-auto"
                  onClick={() => {
                    setChangeTitle(true);
                  }}
                >
                  폴더명 수정하기
                </button>
              )}
              <button
                className="border rounded-lg p-2 bg-gray-200 w-full sm:w-auto"
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
