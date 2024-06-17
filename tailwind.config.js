/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      handjet: ["Handjet", "sans-serif"],
    },
    extend: {
      gridTemplateColumns: {
        "auto-fill-test": "repeat(auto-fit, minmax(15rem, 1fr));",
      },
      animation: {
        bounce200: "bounce 1s infinite 200ms",
        bounce400: "bounce 1s infinite 400ms",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/aspect-ratio")],
};
