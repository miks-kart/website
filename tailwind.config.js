module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    require("@tailwindcss/typography"),
    // ...
  ],
  theme: {
    extend: {
      colors: {
        "primary-dark": "var(--primary-dark)",
        "primary-gray": "var(--primary-gray)",
        "primary-gray-dark": "var(--primary-gray-dark)",
        "primary-red": "var(--primary-red)",
        "primary-red-active": "var(--primary-red-active)",
        "primary-red-hover": "var(--primary-red-hover)",
      },
      fontFamily: {
        sans: [
          "PFDinDisplayPro",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
    },
  },
};
