import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// 기본 ESLint 설정 확장
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // 규칙을 추가
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "warn", // 이 줄로 규칙을 비활성화합니다
    },
  },
];

export default eslintConfig;
