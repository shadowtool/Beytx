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
        deepCharcoal: "#333",
        softGray: "#e4e4e4",
      },
      fontFamily: {
        montserrat: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        orbitron: ["var(--font-orbitron)", "system-ui", "sans-serif"],
      },
      fontWeight: {
        thin: "100",
        extralight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
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
