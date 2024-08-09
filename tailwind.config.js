/** @type {import('tailwindcss').Config} */
import scrollbar from 'tailwind-scrollbar'
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {},
  },
  plugins: [scrollbar({ nocompatible: true })]
}

