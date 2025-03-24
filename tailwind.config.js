/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "480px",
      sm: "640px",
      "sm-md": "720px",
      md: "768px",
      "md-lg": "880px",
      lg: "1024px",
      "lg-xl": "1154px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        montserrat: ["var(--font-montserrat)", "sans-serif"],
      },
    },
  },
  plugins: [
    require("tailwindcss-rtl"), // Add RTL support
    plugin(({ addBase }) => {
      addBase({
        "html[dir='rtl'] body": {
          direction: "rtl",
          textAlign: "right",
        },
        "html[dir='ltr'] body": {
          direction: "ltr",
          textAlign: "left",
        },
      });
    }),
  ],
};
