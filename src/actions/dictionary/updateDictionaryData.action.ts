"use server";

import { connectDB } from "@/utils/database";
import { ObjectId } from "mongodb";

const db = (await connectDB).db("DevPedia");
export async function editLikeNumber(id: string, type: string) {
  try {
    const objectId = new ObjectId(id);
    await db
      .collection("dictionary")
      .updateOne(
        { _id: objectId },
        { $inc: { like: type === "add" ? 1 : -1 } }
      );
    return { status: 200, msg: "Success add number" };
  } catch (err) {
    console.error(err);
    return { status: 500, msg: "Failed add number" };
  }
}
export async function editSaveNumber(id: string, type: string) {
  try {
    const objectId = new ObjectId(id);
    await db
      .collection("dictionary")
      .updateOne(
        { _id: objectId },
        { $inc: { save: type === "add" ? 1 : -1 } }
      );
    return { status: 200, msg: "Success add number" };
  } catch (err) {
    console.error(err);
    return { status: 500, msg: "Failed add number" };
  }
}
