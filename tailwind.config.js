// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
   theme: {
     extend: {
       colors: {
        principal : "#7910ff",
         primary: "#161622",
         secondary: {
           DEFAULT: "#FF9C01",
           100: "#FF9001",
           200: "#FF8E01",
         },
         black: {
           DEFAULT: "#282534",
           100: "#1E1E2D",
           200: "#232533",
         },
         gray: {
           100: "#CDCDE0",
         },
       },
       fontFamily: {
        rthin: ["Roboto-Thin", "sans-serif"],
        rextralight: ["Roboto-ExtraLight", "sans-serif"],
        rlight: ["Roboto-Light", "sans-serif"],
        rregular: ["Roboto-Regular", "sans-serif"],
        rmedium: ["Roboto-Medium", "sans-serif"],
        rsemibold: ["Roboto-SemiBold", "sans-serif"],
        rbold: ["Roboto-Bold", "sans-serif"],
        rextrabold: ["Roboto-ExtraBold", "sans-serif"],
        rblack: ["Roboto-Black", "sans-serif"],
       },
     },
   },
   plugins: [],
 }