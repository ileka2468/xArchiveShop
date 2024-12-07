/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "pulse-border": "pulseBorder 3s ease-in-out infinite",
      },
      keyframes: {
        pulseBorder: {
          "0%, 100%": {
            "border-color": "#7e22ce", // purple-600
            "box-shadow": "0 0 10px 0 #7e22ce",
          },
          "50%": {
            "border-color": "#db2777", // pink-600
            "box-shadow": "0 0 10px 0 #db2777",
          },
        },
      },
    },
  },
  plugins: [],
};
