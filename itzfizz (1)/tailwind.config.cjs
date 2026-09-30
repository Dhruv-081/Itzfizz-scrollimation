/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0b0d0d',
        chalk: '#f3f0e7',
        lime: '#d8f94f',
      },
    },
  },
  plugins: [],
}
