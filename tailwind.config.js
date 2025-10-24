// tailwind.config.js
// module.exports = {
//   content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
//   darkMode: false, // or 'media' or 'class'
//   theme: {
//     extend: {
//         fontFamily: {
//             sans: ['Poppins', 'sans-serif']
//         },
//         gridTemplateColumns: {
//             '70/30': '70% 20%'
//         }
//     },
//   },
//   variants: {
//     extend: {},
//   },
//   plugins: [],
// }
/**@type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx,html}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif']
      },
      gridTemplateColumns: {
        'seven': '70% 28%',
      },
    },
    variants: {
      extend: {},
    },
  },
  plugins: [],
}