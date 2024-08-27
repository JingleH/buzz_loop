/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['adobe-clean', 'Adobe Clean', 'Trebuchet MS', 'sans-serif'],
      serif: ['adobe-clean-serif', 'Adobe Clean Serif', 'serif'],
    },
    extend: {},
  },
  plugins: [],
};
