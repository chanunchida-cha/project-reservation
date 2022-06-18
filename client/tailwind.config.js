module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-blue": "#e8ebed",
        "dark-blue": "#4065b0",
      },
      backgroundImage: {
        "index": "url('../public/images/food.jpg')",
      },
    },
  },
  plugins: [require("daisyui")],
};
