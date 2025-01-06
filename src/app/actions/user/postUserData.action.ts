"use server";
import { CategoryData } from "@/app/types/type";
import { connectDB } from "@/app/utils/database";
import { getCurrentTimeFormatted } from "@/app/utils/getTime";
import bcrypt from "bcryptjs";

const db = (await connectDB).db("DevPedia");

export async function postUserData(
  result: {
    username: string;
    email: string;
    password: string;
    saveCategory: CategoryData[];
  }[]
) {
  const date = getCurrentTimeFormatted();
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(result[0].password, saltRounds);
  try {
    await db.collection("users").insertOne({
      username: result[0].username,
      email: result[0].email,
      password: hashedPassword,
      createdAt: date,
      likedPosts: [],
      folders: [],
      saveCategory: result[0].saveCategory,
    });
  } catch (err) {
    console.error(err);
  }
}
