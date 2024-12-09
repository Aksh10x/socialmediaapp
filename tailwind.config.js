/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        dropDown: 'dropDown 0.6s ease-in-out'
      },
      keyframes: {

        dropDown: {
        '0%': {opacity: '0', transform: 'translateY(-50px)', zIndex: '0' },
        '100%': {opacity: '1', transform: 'translateY(0)', zIndex: '0'  },
        },

      },
    },
  },
  plugins: [],
};

