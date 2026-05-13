import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B1020",
        violet: "#7C3AED",
        cyan: "#22D3EE"
      }
    }
  },
  plugins: []
};
export default config;
