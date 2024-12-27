/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {},
      colors: {
        // primaryColor: "#00684A",
        primaryColor: "#1DA1F2",
        blackColor: "#14171A",
      },
    },
  },
  plugins: [],
};
