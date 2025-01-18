import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brown: {
          50: "#544c4a",
          100: "#D5A6A1", // 연한 갈색
          200: "#C1897E", // 따뜻한 연갈색
          300: "#A06B4B", // 부드러운 갈색
          400: "#8B4D2E", // 중간 갈색
          500: "#7A3F23", // 진한 갈색
          600: "#6A2C14", // 어두운 갈색
          700: "#591F0A", // 매우 어두운 갈색
          800: "#4B1506", // 아주 짙은 갈색
          900: "#3E0C02", // 검붉은 갈색
        },
      },
      height: {
        "95vh": "95vh",
        "90vh": "90vh",
        "85vh": "85vh",
        "80vh": "80vh",
        "70vh": "70vh",
      },
    },
  },
  plugins: [],
} satisfies Config;
