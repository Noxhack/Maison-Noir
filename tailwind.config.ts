import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F7F2EA",
        sand: "#ECE1CE",
        stone: "#E4D7C0",
        mocha: "#6B4A2B",
        espresso: "#2A1C10",
        ink: "#120A05",
        accent: "#C88A4A",
        wayne: "#A88A6A",
        waynedeep: "#8E7356",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(42,28,16,0.04), 0 8px 24px -8px rgba(42,28,16,0.10)",
        lift: "0 10px 30px -10px rgba(42,28,16,0.22)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
export default config;
