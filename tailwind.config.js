/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        montserrat: ["var(--font-montserrat)", "sans-serif"],
        "jetbrains-mono": ["var(--font-jetbrains-mono)", "monospace"],
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
