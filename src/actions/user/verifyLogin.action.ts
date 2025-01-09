"use server";

import { User } from "@/types/type";
import { connectDB } from "@/utils/database";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
const db = (await connectDB).db("DevPedia");
export async function verifyLogin(email: string, password: string) {
  try {
    // 유저 조회
    const user: User | null = await db
      .collection<User>("users")
      .findOne({ email });
    if (!user) return { status: 400, msg: "등록된 이메일이 없습니다" };

    // 비밀번호 확인
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return { status: 400, msg: "비밀번호가 일치하지 않습니다" };

    // JWT 토큰 생성 쿠키 저장
    const token = jwt.sign(
      {
        username: user.username,
        email: user.email,
        likedPost: user.likedPosts,
        folders: user.folders,
        saveCategory: user.saveCategory,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );
    (await cookies()).set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
      maxAge: 60 * 60,
    });
    return {
      status: 200,
      msg: "로그인에 성공했습니다",
    };
  } catch (err) {
    console.error("Login Error:", err);
    return { status: 500, msg: "로그인 중 오류가 발생했습니다" };
  }
}
