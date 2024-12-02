/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "custom-white":
          "0px 0px 10px 5px rgba(255, 255, 255, 0.5), 0 2px 4px -1px rgba(255, 255, 255, 0.3)",
        "custom-blue":
          "0 4px 32px -1px rgba(0, 0, 255, 0.5), 0 2px 4px -1px rgba(0, 0, 255, 0.3)",
        "custom-black": "0px 0px 15px 5px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
