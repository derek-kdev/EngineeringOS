/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyan: "#00E5FF",
        violet: "#7B2FBE",
        "midnight-dark": "#0b0e14",
        engineering: {
          background: "#0B132B",
          cyan: "#00D2FF",
          blue: "#0284C7",
          orange: "#FF6B00",
        },
      },
      animation: {
        "pulse-once": "pulse-once 2s ease-out 1",
      },
      keyframes: {
        "pulse-once": {
          "0%": { transform: "scale(1)" },
          "50%": {
            transform: "scale(1.05)",
            boxShadow: "0 0 40px rgba(0,229,255,0.5)",
          },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};