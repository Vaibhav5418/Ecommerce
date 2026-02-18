/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        secondary: "#10B981",
        // New premium palette
        violet: {
          600: '#7C3AED',
        },
        fuchsia: {
          600: '#C026D3',
        },
      },
      backgroundImage: {
        'premium-gradient': 'linear-gradient(to right, #4F46E5, #7C3AED, #C026D3)',
      },
      animation: {
        'in': 'fadeIn 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'zoom-in': 'zoomIn 0.3s ease-out forwards',
        'slide-in-from-bottom': 'slideUp 0.5s ease-out forwards',
        'slide-in-from-right': 'slideRight 0.3s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        zoomIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      }
    },
  },
  plugins: [],
}
