"use server";

import { DictData } from "@/types/type";

export async function DetailAnalysisOpenAi(
  DictData: DictData[],
  msg: string
): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is missing in the environment variables");
  }
  const sortData = DictData.map((i) => ({ id: i._id, title: i.title }));
  const newMsg = `다음 데이터의 객체들의 title값을 기반으로 3초 내로 질문:"${msg}"와 관련된 객체들을 빠르게 찾아서 배열속에 넣어서 반환해주세요 3초안에 해주세요. 3초가 지났으면 더이상 분석하지말고 그전까지 찾은 데이터만 바로 반환해주세요 그리고 답변양식을 꼭 지켜서 답변해주세요  
  데이터: ${JSON.stringify(
    sortData
  )} ,답변 양식 :[질문과 관련있는 객체들을 담은 배열(없을땐 빈배열로 반환해주세요)]`;
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: newMsg }],
      max_tokens: 2000,
    }),
  });
  if (!res.ok) {
    throw new Error(
      `OpenAI API DetailAnalysisOpenAi error : ${res.statusText}`
    );
  }
  const data = await res.json();
  return data.choices[0]?.message.content;
}

export async function QuickAnalysisOpenAi(msg: string): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is missing in the environment variables");
  }
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `"질문:${msg}"에 대해서 200자 이내로 간단하게 요약해서 답변해주세요 `,
        },
      ],
      max_tokens: 200,
    }),
  });
  if (!res.ok) {
    throw new Error(`OpenAI API error: ${res.statusText}`);
  }

  if (!res.body) {
    throw new Error(
      "Response body is undefined. Check the API or network connection."
    );
  }
  // const reader = res.body.getReader();
  // const decoder = new TextDecoder("utf-8");
  // let done = false;
  // while (!done) {
  //   const { value, done: readerDone } = await reader.read();
  //   done = readerDone;
  //   const chunk = decoder.decode(value, { stream: true });
  //   console.log(chunk); // 스트림으로 도착하는 데이터를 처리
  // }

  const data = await res.json();
  return data.choices[0]?.message.content;
}
