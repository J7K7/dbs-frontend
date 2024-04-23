import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bkg: {
          100: "#F8F9FA",
          200: "#F5FAFB",
          300: "#E9ECEF",
          400: "#DEE2E6",
        },
        accent: {
          100: "#CED4DA",
          200: "#ADB5BD",
          300: "#6C757D",
          400: "#495057",
        },
        text: {
          100: "#52616b",
          200: "#343a40",
          300: "#1e2022",
        },
      },
    },
  },
  plugins: [],
};

export default config;