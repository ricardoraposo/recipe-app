/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        bounce: {
          '0%, 100%': {
            transform: 'translateY(-5%)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
            '50%': {
              transform: 'none',
              'animation-timing-function': 'cubic- bezier(0, 0, 0.2, 1)',
            }
          },
        }
      },
      animation: {
        'bounce-once': 'bounce 0.7s 1.5'
      },
      colors: {
        mainPurple: '#41197F',
        mainYellow: '#FCC436',
      }
    },
  },
  plugins: [],
}

