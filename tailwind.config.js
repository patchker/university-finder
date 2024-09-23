/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'progress-bar': 'progress-bar 1.5s linear infinite',
      },
      fontFamily: {

        'poppins': ['poppins', 'sans-serif'],


      },
      keyframes: {
        'progress-bar': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}

