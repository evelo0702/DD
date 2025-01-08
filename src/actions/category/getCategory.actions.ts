"use server";

import { transformData } from "@/utils/changeStringId";
import { connectDB } from "@/utils/database";

export async function getCategoryData() {
  try {
    const db = (await connectDB).db("DevPedia");
    const result = await db.collection("category").find({}).toArray();
    return { status: 200, category: transformData(result) };
  } catch (error) {
    console.error("Error fetching category data ", error);
    throw new Error("Failed to fetch category data");
  }
}
