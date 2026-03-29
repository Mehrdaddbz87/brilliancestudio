import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        accent: "#b99a45",
        background: "#000000",
        text: "#ffffff",
      },
      fontFamily: {
        classic: ["var(--font-classic)", "Georgia", "Times New Roman", "serif"],
        fantasy: ["var(--font-fantasy)", "Papyrus", "fantasy"],
      },
      screens: {
        xs: "480px",
        "3xl": "1800px",
      },
    },
  },
  plugins: [],
};

export default config;
