/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("daisyui")],
  theme: {
    extend: {
      fontSize: {
        xxs: "10px",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
        primary: {
          100: "hsl(var(--primary-background-1))",
          200: "hsl(var(--primary-background-2))",
          300: "hsl(var(--primary-background-3))",
        },
        text: {
          100: "hsl(var(--text-1))",
          200: "hsl(var(--text-2))",
          300: "hsl(var(--text-3))",
        },
        success: {
          100: "hsl(var(--success-1))",
        },
        error: {
          100: "hsl(var(--error-1))",
        },
        activity: {
          online: "hsl(var(--activity-online))",
          //idle, do not disturb
        },
      },
      borderRadius: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px",
      },
    },
  },
  // plugins: [],
};
