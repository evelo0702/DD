"use client";
import { useAuthStore } from "@/store/zustand/globalStore";
import { UsersaveData } from "@/types/type";
export default function Main({
  data,
  isActive,
  folder,
}: {
  data: UsersaveData;
  isActive: string;
  folder: number;
}) {
  const { userData } = useAuthStore();
  return (
    <div
      className="w-full h-full p-4 border-4 
    rounded-e-lg rounded-bl-lg border-brown-50 grid grid-rows-5"
    >
      {isActive === "user" && (
        <>
          <div className="row-span-1 bg-red-400">
            {userData && (
              <>
                <div>닉네임 : {userData.username}</div>
                <div>이메일 : {userData.email}</div>
                {userData.saveCategory &&
                  userData.saveCategory.map((i) => (
                    <div key={i._id}>{i.title}</div>
                  ))}
              </>
            )}

            <div></div>
          </div>
          <div className="row-span-2 border-4">
            <div className="p-10 grid grid-cols-4 grid-rows-2 h-full">
              <div className="col-span-1 row-span-1">
                {data.likedPosts[0].title}
              </div>
              <div className="col-span-1  row-span-1">
                {data.likedPosts[1].title}
              </div>
              <div className="col-span-1 row-span-1">
                {data.likedPosts[2].title}
              </div>
              <div className="col-span-1 row-span-2 flex items-center">
                +{data.likedPosts.length - 6}
              </div>
              <div className="col-span-1  row-span-1">
                {data.likedPosts[3].title}
              </div>
              <div className="col-span-1  row-span-1">
                {data.likedPosts[4].title}
              </div>
              <div className="col-span-1 row-span-1">
                {data.likedPosts[5].title}
              </div>
            </div>
          </div>
          <div className="row-span-2">
            <div className="p-10 grid grid-cols-3 ">
              {data.folders.map((i, index) => (
                <div className="cols-span-1" key={index}>
                  <p>{i.title}</p>
                  <div>{i.savedPosts.length}</div>
                  <div>{i.savedPosts[0].title}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
