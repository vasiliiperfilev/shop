/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#edf6f9',
        primary: {
          light: '#008b97',
          DEFAULT: '#006d77',
          dark: '#005f68',
        },
        secondary: '#83c5be',
        btn: {
          primary: '#ffddd2',
          secondary: '#e29578',
        },
        image: {
          background: '#ffffff',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')],
};
