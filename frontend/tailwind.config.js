/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        sans: ["Poppins", "sans-serif"],
        cursive: ["Pacifico", "cursive"],
      },
      colors:{
        brand: "#2da42b",
      },
      container:{
        center: true,
        padding:{
          DEFAULT: "1em",
          sm: "2em",
        },
      },
    },
  },
  plugins: [],
}

