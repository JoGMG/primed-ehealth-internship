/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#E8E8E8',
        'secondary': '#FDF9F6',
        'buttons': '#ffffff',
        'primary-text': '#2E2E2E',
      },
    },
  },
  plugins: [],
}
