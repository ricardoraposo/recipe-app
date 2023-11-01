/** @type {import('tailwindcss').Config} */
module.exports = {
content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],  theme: {
    extend: {
      colors: {
        mainPurple: '#41197F',
        mainYellow: '#FCC436',
      }
    },
  },
  plugins: [],
}

