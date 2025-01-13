"use server";
import { connectDB } from "@/utils/database";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { UserInfo } from "@/types/type";

const db = (await connectDB).db("DevPedia");

export async function verifyEmailAction(email: string): Promise<boolean> {
  try {
    const result = await db.collection("users").findOne({ email: email });
    return result !== null;
  } catch (error) {
    console.error("Error verify email :", error);
    throw new Error("Error verify email");
  }
}
export async function verifyUsernameAction(username: string): Promise<boolean> {
  try {
    const result = await db.collection("users").findOne({ username: username });
    return result !== null;
  } catch (error) {
    console.error("Error verify username :", error);
    throw new Error("Error verify username");
  }
}

export async function verifyUserPermission(username: string): Promise<boolean> {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value ?? null;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserInfo;
      if (decoded.username === username) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Failed verify User Permission:", error);
      return false; // 토큰 검증 실패
    }
  }
  return false;
}
