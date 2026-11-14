import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f7ff",
          100: "#e0effe",
          200: "#bae0fd",
          300: "#7cc5fb",
          400: "#36a4f7",
          500: "#0c87eb",
          600: "#026ac8",
          700: "#0354a2",
          800: "#074786",
          900: "#0c3b6e",
          950: "#082649",
        },
        surface: {
          dark: "#0b0f17",
          card: "#111827",
          cardHover: "#172033",
          border: "#1f293d",
          muted: "#94a3b8",
        }
      },
    },
  },
  plugins: [],
};
export default config;
