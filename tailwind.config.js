/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F5385D',
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '@layer utilities': {
          '.bg-primary': {
            'background-color': 'var(--tw-bg-primary)',
          },
        },
      });
    },
  ],
};


