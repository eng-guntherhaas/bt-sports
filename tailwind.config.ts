import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

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

      typography: {
        DEFAULT: {
          css: {
            color: "rgb(var(--color-text) / 1)",

            h2: {
              color: "rgb(var(--color-text) / 1)",
            },

            strong: {
              color: "rgb(var(--color-text) / 1)",
              fontWeight: "600",
            },

            a: {
              color: "rgb(var(--color-brand) / 1)",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            },

            ul: {
              paddingLeft: "1.25rem",
            },
          },
        },
      },
    },
  },

  plugins: [typography],
};

export default config;
