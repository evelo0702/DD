"use client";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { getCategoryData } from "@/actions/category/getCategory.actions";
import { postUserData } from "@/actions/user/postUserData.action";
import {
  verifyEmailAction,
  verifyUsernameAction,
} from "@/actions/user/verifyUserData.action";
import { CategoryData, CategoryRes, FormState } from "@/types/type";
import { verifyField } from "@/utils/verifyMethod";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [saveCategory, setCategorys] = useState<CategoryData[]>([]);
  const { data } = useQuery<CategoryRes>({
    queryKey: ["category"],
    queryFn: getCategoryData,
  });

  const [formState, setFormState] = useState<FormState>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const updateFormState = (key: string, value: string) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const [verifiedState, setVerifiedState] = useState({
    email: { state: false, msg: "" },
    username: { state: false, msg: "" },
    password: { state: false, msg: "" },
  });

  const updateVerifiedState = (key: string, state: boolean, msg: string) => {
    setVerifiedState((prev) => ({ ...prev, [key]: { state, msg } }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormState(name, value.trim());
  };

  const handleSaveCategory = (item: CategoryData) => {
    if (saveCategory.some((i) => i._id === item._id)) {
      setCategorys(saveCategory.filter((i) => i._id !== item._id));
    } else {
      setCategorys([...saveCategory, item]);
    }
  };
  const router = useRouter();
  const handleSubmit = async () => {
    if (!verifiedState.email.state) {
      updateVerifiedState("email", false, "이메일을 확인해주세요");
    }
    if (!verifiedState.username.state) {
      updateVerifiedState("username", false, "닉네임을 확인해주세요");
    }

    if (
      verifiedState.password.state &&
      verifiedState.email.state &&
      verifiedState.username.state
    ) {
      const result = [
        {
          username: formState.username,
          email: formState.email,
          password: formState.password,
          saveCategory,
        },
      ];
      let status = await postUserData(result);
      console.log(status);
      router.push("/");
    }
  };

  // 비밀번호 확인 디바운스 처리
  const debouncePasswordVerify = debounce(() => {
    if (inputRef.current) {
      verifyField(
        "password",
        formState.password,
        updateVerifiedState,
        updateFormState,
        "비밀번호가 일치하지 않습니다",
        "비밀번호가 일치합니다",
        undefined,
        inputRef.current.value
      );
    }
  }, 1000);

  return (
    <div className="h-80vh max-w-4xl mx-auto">
      <div className="flex justify-center items-center px-4 py-10 bg-gray-50">
        <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8">
          <h2 className="text-3xl  text-center mb-6">회원가입</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-lg font-medium">
                닉네임
              </label>
              <div className="flex gap-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="flex-1 border rounded-md px-3 py-2"
                  value={formState.username}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  onClick={() =>
                    verifyField(
                      "username",
                      formState.username,
                      updateVerifiedState,
                      updateFormState,
                      "이미 등록된 닉네임이 있습니다",
                      "사용 가능한 닉네임 입니다",
                      verifyUsernameAction
                    )
                  }
                >
                  중복확인
                </button>
              </div>
              {verifiedState.username.msg && (
                <p
                  className={`mt-1 text-lg ${
                    verifiedState.username.state
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {verifiedState.username.msg}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-lg font-medium">
                이메일
              </label>
              <div className="flex gap-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="flex-1 border rounded-md px-3 py-2"
                  value={formState.email}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  onClick={() =>
                    verifyField(
                      "email",
                      formState.email,
                      updateVerifiedState,
                      updateFormState,
                      "이미 등록된 이메일이 있습니다",
                      "사용 가능한 이메일 입니다",
                      verifyEmailAction
                    )
                  }
                >
                  중복확인
                </button>
              </div>
              {verifiedState.email.msg && (
                <p
                  className={`mt-1 text-lg ${
                    verifiedState.email.state
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {verifiedState.email.msg}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-lg font-medium">
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full border rounded-md px-3 py-2"
                value={formState.password}
                onChange={(e) => {
                  updateFormState(e.target.name, e.target.value);
                }}
                autoComplete="off"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-lg font-medium"
              >
                비밀번호 확인
              </label>
              <input
                name="confirmPassword"
                type="password"
                required
                className="w-full border rounded-md px-3 py-2"
                value={formState.confirmPassword}
                onChange={(e) => {
                  updateFormState(e.target.name, e.target.value);
                  debouncePasswordVerify();
                }}
                ref={inputRef}
                autoComplete="off"
              />
              {verifiedState.password.msg && (
                <p
                  className={`mt-1 text-lg ${
                    verifiedState.password.state
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {verifiedState.password.msg}
                </p>
              )}
            </div>
          </form>
          <div>
            <p className="text-lg font-medium">관심 카테고리 설정</p>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {data?.category?.map((category) => (
                <button
                  key={category._id}
                  className={`px-4 py-2 rounded-md text-lg max-[370px]:p-1 ${
                    saveCategory.some((c) => c._id === category._id)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => handleSaveCategory(category)}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
