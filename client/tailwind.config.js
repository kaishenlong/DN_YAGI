/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        judson: ['Judson', 'serif'],
        taviraj: ['Taviraj', 'serif'],
        jaldi: ['Jaldi', 'sans-serif'],
        taviraj: ['Taviraj', 'serif']
      },
    },
  },
  plugins: [],
}