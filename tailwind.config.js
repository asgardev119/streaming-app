/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#07070c',
        brand: {
          500: '#8b5cf6',
          600: '#7c3aed',
          400: '#a78bfa',
        },
        accent: '#22d3ee',
      },
    },
  },
  plugins: [],
};
