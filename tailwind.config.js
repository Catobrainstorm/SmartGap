

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        smartGreen: '#22C55E', // Adjust based on Figma hex
        smartDark: '#0F172A',
      },
      fontFamily: {
        sentinel: ['Sentinel', 'serif'],
      },
    },
  },
  plugins: [],
}