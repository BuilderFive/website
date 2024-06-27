/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme";
const {nextui} = require("@nextui-org/react");

module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
          "2xl": "1400px",
      },
    },
    colors: {
        tabs: 'var(--tabs)',
        background1: 'var(--background-1)',
        'background1-translucent': 'var(--background-1-translucent)',
        background2: 'var(--background-2)',
        background3: 'var(--background-3)',
        background4: 'var(--background-4)',
        white: 'var(--white)',
        success1: 'var(--success-1)',
        online: 'var(--activity-online)',
        idle: 'var(--activity-idle)',

        error1: 'var(--error-1)',
        secondary1: 'var(--secondary-1)',
        secondary2: 'var(--secondary-2)',
        secondary3: 'var(--secondary-3)',
        secondary4: 'var(--secondary-4)',
        text1: 'var(--text-1)',
        text2: 'var(--text-2)',
        text3: 'var(--text-3)',
        text4: 'var(--text-4)',
        text5: 'var(--text-5)',
        text6: 'var(--text-6)',
        text7: 'var(--text-7)',
        text8: 'var(--text-8)',

        border: "var(--background-3)",
        input: "var(--secondary-1)",
        ring: "var(--ring)",
        background: "var(--background-1)",
        foreground: "var(--background-2)",
        border: "var(--background-1)"
    },
    backgroundImage: {
        "twighlight": 
          "linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(255, 255, 255, 0)), url('/static/Twighlight.svg')",
        "landscape": "url('/static/bottom-background.svg')",
        "landscape-2": "url('/static/landscape-alien.svg')",
        "sunset": "url('/static/Sunset.svg')",
      },
    extend: {
      
      borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
          "accordion-down": {
              from: { height: "0" },
              to: { height: "var(--radix-accordion-content-height)" },
          },
          "accordion-up": {
              from: { height: "var(--radix-accordion-content-height)" },
              to: { height: "0" },
          },
          slidein: {
            from: {
              opacity: "0",
              transform: "translateY(-10px)",
            },
            to: {
              opacity: "1",
              transform: "translateY(0)",
            },
          },
      },
      animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
          slidein: "slidein 1s ease var(--slidein-delay, 0) forwards",
        },
      fontFamily: {
          sans: ["var(--font-sans)", ...fontFamily.sans],
          poppins: "var(--font-poppins)", ...fontFamily.poppins,

      },
    },
  },
  plugins: [nextui()],
}

