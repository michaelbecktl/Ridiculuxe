// prettier-ignore
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './client/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'plain1': '#E0E0E0',
        'plain2': '#BDBDBD',
        'plain3': '#9E9E9E',
        'plain4': '#757575',
        'plain5': '#424242',
        'ultimate1': '#3227a7',
        'ultimate2': '#fc15ef',
        'ultimate3': '#0aeaf1',
        'ultimate4': '#fdeb27',
        'ultimate5': '#f82032',
      },
      backgroundColor: theme => ({
        ...theme('colors'),
        'dark': '#1F2937',
        'darker': '#111827',
        'input-dark': '#374151'
      }),
      transformStyle: {
        '3d': 'preserve-3d',
      },
      backfaceVisibility: {
        hidden: 'hidden',
      },
      keyframes: {
        flip: {
          '0%': { transform: 'rotateX(0)' },
          '100%': { transform: 'rotateX(90deg)' },
        },
        flipReverse: {
          '0%': { transform: 'rotateX(-90deg)' },
          '100%': { transform: 'rotateX(0)' },
        }
      },
      animation: {
        flip: 'flip 0.5s ease-in-out forwards',
        flipReverse: 'flipReverse 0.5s ease-in-out forwards',
      },
      transformOrigin: {
        'center-3d': '50% 50% -20px',
      }
    },
  },
  plugins: [],
}
