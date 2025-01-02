"use server";
import { ObjectId } from "mongodb";
import { DictData } from "../types/type";
import { connectDB } from "../utils/database";
import withStringId from "../utils/changeStringId";

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

export async function getDictionaryDataById(id: string) {
  try {
    const db = (await connectDB).db("DevPedia");
    const objectId = new ObjectId(id);
    const result = await db.collection("dictionary").findOne({ _id: objectId });
    console.log("server에서 데이터 받는중!");
    return withStringId(result);
  } catch (error) {
    console.error("Error fetching dictionary data:", error);
    throw new Error("Failed to fetch dictionary data");
  }
}
