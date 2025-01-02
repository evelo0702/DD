"use client";
import { getDictionaryDataById } from "@/app/actions/getDictionaryData.action";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function Detail() {
  const params = useParams();
  const id = params.id;
  const { data } = useQuery({
    queryKey: ["dictData", id],
    queryFn: () => getDictionaryDataById(String(id)),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
  });

  return <div>{data && <h1>{data.title}</h1>}</div>;
}
