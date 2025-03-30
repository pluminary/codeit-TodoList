/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          900: "#0F172A",
          800: "#1E293B",
          500: "#64748B",
          400: "#94A3B8",
          300: "#CBD5E1",
          200: "#E2E8F0",
          100: "#F1F5F9",
        },
        accent: {
          violet600: "#7C3AED",
          violet100: "#EDE9FE",
          rose500: "#F43F5E",
          lime300: "#BEF264",
          amber800: "#92400E",
        },
      },
    },
  },
  plugins: [],
};