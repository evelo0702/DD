import { updateUserFolders } from "@/actions/user/postUserData.action";
import { UserData } from "@/types/type";
import { QueryObserverResult } from "@tanstack/react-query";
import { useState } from "react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  SaveBtn: (email: string, folderTitle: string, type: string) => void;
  data: UserData;
  id: string;
  userRefetch: () => Promise<QueryObserverResult<UserData>>;
}

export default function SaveModal({
  isOpen,
  onClose,
  data,
  SaveBtn,
  id,
  username,
  userRefetch,
}: LoginModalProps) {
  const [title, setTitle] = useState("");
  const addFolder = async () => {
    if (title.length === 0) {
      return alert("폴더명을 입력해주세요");
    }
    if (title.length > 10) {
      return alert("폴더명을 10글자 이하로 작성해주세요");
    }
    let res = await updateUserFolders(title, username, "add");
    console.log(res);
    await userRefetch();
    setTitle("");
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md py-16 px-2 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-600 hover:text-gray-800 text-3xl font-bold"
        >
          X
        </button>
        <div className="grid grid-cols-3">
          {data.folders.map((folder, index) => (
            <div
              key={index}
              className=" bg-gray-100 border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex items-center justify-between me-2"
            >
              <h3 className="text-lg text-gray-800 mx-3">{folder.title}</h3>
              <button
                onClick={() =>
                  SaveBtn(
                    data.email,
                    folder.title,
                    folder.savedPosts.some((i) => i.id === id) ? "del" : "add"
                  )
                }
                className={`p-3 rounded-lg text-white transition ${
                  folder.savedPosts.some((i) => i.id === id)
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {folder.savedPosts.some((i) => i.id === id) ? "삭제" : "저장"}
              </button>
            </div>
          ))}
          {data.folders.length < 3 && (
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-2 rounded-lg">
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
                폴더생성
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
