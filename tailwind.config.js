/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [{
      mytheme: {
        "primary": "#101D24"
      }
    }, "light"]
  },
  theme: {
    extend: {},
  },
  plugins: [daisyui],
}

