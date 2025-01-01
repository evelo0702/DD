"use server";
import { DictData } from "../types/type";
import { connectDB } from "../utils/database";

export async function getDictionaryData() {
  try {
    const db = (await connectDB).db("DevPedia");
    const result = await db.collection("dictionary").find({}).toArray();
    const dictData: DictData[] = result.map((item) => {
      return {
        _id: item._id.toString(),
        category: item.category,
        title: item.title,
        content: item.content,
        code: item.code,
        author: item.author,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        views: item.views,
      };
    });
    return dictData;
  } catch (error) {
    console.error("Error fetching dictionary data:", error);
    throw new Error("Failed to fetch dictionary data");
  }
}
