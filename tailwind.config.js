/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {},
      colors: {
        primaryColor: "#00684A",
        blackColor: "#1A1A1A",
      },
    },
  },
  plugins: [],
};
