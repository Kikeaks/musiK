/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        'fondo': '#121212',
        'cards': '#1E1E1E',
        'highlight' : '#FF4081',
      }
    },
  },
  plugins: [require("flowbite/plugin")],
};
