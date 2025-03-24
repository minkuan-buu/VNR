import {heroui} from "@heroui/theme"
import { title } from "process";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
        cus_title: ['title', 'serif'],
        cus_body: ['body', 'serif'],       
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
}

module.exports = config;