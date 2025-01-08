"use client";
import { getDictionaryDataById } from "@/actions/dictionary/getDictionaryData.action";
import CodeBlock from "@/components/CodeBlock";
import { useRecentDataStore } from "@/store/zustand/globalStore";
import { DictData } from "@/types/type";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function Detail() {
  const { addData } = useRecentDataStore();
  const params = useParams();
  const id = params.id;
  const { data } = useQuery<DictData>({
    queryKey: ["dictData", id],
    queryFn: () => getDictionaryDataById(String(id)),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
  });
  useEffect(() => {
    if (data) {
      addData({ id: data._id, title: data.title });
    }
  }, [data]);

  return (
    <div className="p-4">
      {data && (
        <div>
          <h1>제목 : {data.title}</h1>
          <p>작성자 : {data.author}</p>
          <p>조회수 : {data.views}</p>
          <p>작성일 : {data.createdAt}</p>
          <div className="flex">
            카테고리 :
            {data.category.map((i) => (
              <div key={i._id}>{i.name}</div>
            ))}
          </div>
          <div>{data.content}</div>
          <CodeBlock code={data.code} />
        </div>
      )}
    </div>
  );
}
