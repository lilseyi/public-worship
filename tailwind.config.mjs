/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1A1A1A",
        cream: "#FBF1ED",
        "cream-soft": "#FAEEE9",
        red: {
          DEFAULT: "#D03A3A",
          50: "#FBE8E8",
          100: "#F7CECE",
          200: "#EFA0A0",
          300: "#E47373",
          400: "#DA5454",
          500: "#D03A3A",
          600: "#B62F2F",
          700: "#922424",
        },
        pink: {
          soft: "#F5C7C0",
          softer: "#FBE3DE",
          band: "#F0BFB7",
        },
        peach: "#F0E2BC",
        mint: "#A8D9C4",
        lavender: "#C9A8E0",
        sky: "#D6E5F2",
        "link-blue": "#4A6BC0",
      },
      fontFamily: {
        display: ["'Corben'", "Georgia", "serif"],
        body: ["'DM Sans'", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "72rem",
        prose: "42rem",
      },
      boxShadow: {
        soft: "0 6px 24px -8px rgba(26,26,26,0.08)",
      },
      borderRadius: {
        pill: "9999px",
      },
    },
  },
  plugins: [],
};
