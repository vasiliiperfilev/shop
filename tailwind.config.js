/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#edf6f9',
        secondary: {
          light: '#008b97',
          DEFAULT: '#83c5be',
          dark: '#005f68',
        },
        btn: {
          primary: '#935FA7',
          secondary: '#9B489B',
        },
      },
    },
    backgroundSize: {
      auto: 'auto',
      cover: 'cover',
      contain: 'contain',
      '200%': '100% 200%',
    },
  },
  variants: {
    scrollbar: ['rounded'],
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar'),
  ],
};
