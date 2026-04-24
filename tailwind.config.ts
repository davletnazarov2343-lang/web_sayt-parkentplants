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
        forest: {
          50: "#D8F3DC",
          100: "#B7E4C7",
          200: "#95D5B2",
          400: "#52B788",
          600: "#40916C",
          700: "#2D6A4F",
          900: "#1B4332",
        },
        gold: {
          100: "#E8D4A0",
          400: "#C9A961",
          700: "#8B6F47",
        },
        cream: {
          DEFAULT: "#FEFCF8",
          100: "#F5F1EA",
        },
        earth: {
          400: "#A8A39B",
          700: "#5A5A5A",
          900: "#1A1A1A",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
