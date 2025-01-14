"use server";
import { CategoryData } from "@/types/type";
import { connectDB } from "@/utils/database";
import { getCurrentTimeFormatted } from "@/utils/getTime";
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
    return { status: 201, msg: "Success Post UserData" };
  } catch (err) {
    console.error(err);
    return { status: 500, msg: "Failed Post User Data" };
  }
}

export async function updateUserCategory(
  data: CategoryData[],
  username: string
) {
  try {
    await db
      .collection("users")
      .updateOne({ username }, { $set: { saveCategory: data } });

    return { status: 200, msg: "Success Update User Category" };
  } catch (err) {
    console.error(err);
    return { status: 500, msg: "Failed update User Category" };
  }
}
interface User {
  username: string;
  folders: { title: string; savedPosts: any[] }[];
}
export async function updateUserFolders(
  title: string,
  username: string,
  type: string,
  newTitle?: string 
) {
  try {
    if (type === "add") {
      await db.collection<User>("users").updateOne(
        { username }, // username이 일치하는 사용자 찾기
        {
          $push: {
            folders: {
              title, // 전달받은 title
              savedPosts: [], // 빈 savedPosts 배열
            },
          },
        }
      );
      return { status: 200, msg: "Success Update User Folders" };
    }
    if (type === "del") {
      await db
        .collection<User>("users")
        .updateOne({ username }, { $pull: { folders: { title } } });
    }
    if (type === "change") {
      await db
        .collection<User>("users")
        .updateOne(
          { username, "folders.title": title },
          { $set: { "folders.$.title": newTitle } }
        );
    }
  } catch (err) {
    console.error(err);
    return { status: 500, msg: "Failed update User Folders" };
  }
}
