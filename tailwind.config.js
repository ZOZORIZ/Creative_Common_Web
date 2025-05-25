/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        keyframes: {
          shake: {
            '0%, 100%': { transform: 'translateX(0)' },
            '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
            '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
          },
        },
        animation: {
          shake: 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
        },
        fontFamily:{
            jacquard: ['"Jacquard 12"','cursive'],
        },
      },
    },
    plugins: [],
  }
  