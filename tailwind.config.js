import { colors } from "./src/theme.js";

const sans = ['"IBM Plex Sans"', "system-ui", "-apple-system", '"Segoe UI"', "Roboto", "sans-serif"];
const mono = ['"IBM Plex Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"];

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      // Same palette as src/theme.js, so classes (bg-pine, text-muted) and inline styles agree.
      colors,
      fontFamily: {
        sans,
        display: sans,
        data: mono,
      },
    },
  },
  plugins: [],
};
