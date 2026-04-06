/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "system-ui",
          "ui-sans-serif",
          "SF Pro Text",
          "Inter",
          "sans-serif",
        ],
      },
      colors: {
        accent: {
          blue: "#38bdf8",
          purple: "#a855f7",
        },
      },
    },
  },
  plugins: [],
};
