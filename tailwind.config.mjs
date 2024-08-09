import defaultTheme from "tailwindcss/defaultTheme";
import typographyPlugin from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    screens: {
      sm: defaultTheme.screens.sm,
      md: defaultTheme.screens.md,
      lg: defaultTheme.screens.lg,
    },
    extend: {
      fontFamily: {
        sans: ["Atkinson Hyperlegible", ...defaultTheme.fontFamily.sans],
        mono: ["Fira Code", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [typographyPlugin],
};
