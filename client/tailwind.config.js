/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#016938",
      },
      fontFamily: {
        'mongodb': ['"MongoDB Value Serif"', '"Times New Roman"', 'serif'],
        'euclid': ['Euclid Circular A', 'sans-serif']
      }
    },
  },
  plugins: [
    require('@tailwindcss/custom-forms')
  ],
}