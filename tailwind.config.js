/* eslint-disable no-undef */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    dark: {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      ...require("daisyui/src/colors/themes")["[data-theme=light]"],
      primary: "blue",
      "primary-focus": "mediumblue",
      "base-200":"white"
    },

    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      backgroundColor:{
        "black":"black"
      }
    },
    container: {
      center: true,
    },
  },
  plugins: [require("daisyui")],
}
