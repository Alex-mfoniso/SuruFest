/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'carnival-hero': "url('./img/carnival-hero.jpg')",
      },
    },
  },
  plugins: [],
}