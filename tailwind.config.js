import { heroui } from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
module.exports = {
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
        roboto: ["Roboto Flex", "serif"],
      },
      fontVariationSettings: {
        custom: {
          slnt: "0",
          wdth: "100",
          GRAD: "0",
          XOPQ: "96",
          XTRA: "468",
          YOPQ: "79",
          YTAS: "750",
          YTDE: "-203",
          YTFI: "738",
          YTLC: "514",
          YTUC: "712",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
}
