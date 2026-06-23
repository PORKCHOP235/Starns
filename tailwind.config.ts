import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        teal:   "#00C2CB",
        purple: "#7C3AED",
        pink:   "#EC4899",
        orange: "#F97316",
        yellow: "#FBBF24",
        navy:   "#1B2957",
        "navy-dk": "#0D1628",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
