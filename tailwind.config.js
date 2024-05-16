/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        'cards': '#1E1E1E',
        'highlight' : '#FF4081',
      }
    },
  },
  plugins: [require("flowbite/plugin")],
};
