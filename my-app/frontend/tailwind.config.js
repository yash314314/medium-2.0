/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 1s ease-in-out",
        slideUp: "slideUp 0.8s ease-in-out",
        fadeInRight: "fadeInRight 1s ease-in-out",
        scaleIn: "scaleIn 0.6s ease-out",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideUp: {
          from: { transform: "translateY(50px)", opacity: 0 },
          to: { transform: "translateY(0)", opacity: 1 },
        },
        fadeInRight: {
          from: { transform: "translateX(50px)", opacity: 0 },
          to: { transform: "translateX(0)", opacity: 1 },
        },
        scaleIn: {
          from: { transform: "scale(0.9)", opacity: 0 },
          to: { transform: "scale(1)", opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}

