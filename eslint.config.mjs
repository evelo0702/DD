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
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "no-var": "off",
      "prefer-const": "off",
      "@typescript-eslint/no-unused-vars": "warn", 
    },
  },
];

export default eslintConfig;
