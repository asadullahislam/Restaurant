/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        beige: "#FFFFFF",
        // Add beige as a custom color
      },
    },
  },
  plugins: [require("daisyui")],
};
