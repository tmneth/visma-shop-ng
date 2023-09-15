/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundImage: {
        "btn-sprite": "url('/assets/btn-sprite.svg')",
      },
    },
  },
  plugins: [],
};
