/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {},
      colors: {
        primaryColor: "#AE275F",
        blackColor: "#1A1A1A",
        mainColor: "#B31942",
        headingColor: "#0A3161",
      },
    },
  },
  plugins: [],
};
