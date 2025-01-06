"use server";
import { connectDB } from "@/app/utils/database";
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
