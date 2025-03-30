// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'pc': '1200px',
        'tablet': '744px',
        'mobile': '375px',
      },
      fontFamily: {
        nanum: ['"NanumSquare"', 'sans-serif'],
      },
      fontSize: {
        base: "16px",
        md: "18px",
        lg: "20px",
      },
      fontWeight: {
        regular: "400",
        bold: "700",
      },
    },
  },
  plugins: [],
};