import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "rgb(var(--color-brand) / <alpha-value>)",
        brandLight: "rgb(var(--color-brand-light) / <alpha-value>)",
        brandDark: "rgb(var(--color-brand-dark) / <alpha-value>)",
        brandAccent: "rgb(var(--color-brand-accent) / <alpha-value>)",

        bg: "rgb(var(--color-bg) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",

        text: "rgb(var(--color-text) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};

export default config;
