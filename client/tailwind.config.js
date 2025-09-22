/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        "onest":["Onest", "sans-serif"]

      },
      colors:{
        "primary":"#F26922",
        "secondary":"#71717A",
        "gray":"#A1A1AA",
        "bgPrimary":"#E4E4E7",
        "bgSecondary":"#F4F4F7",
        "btnSecondary":"#FAFAFA",
        "bgBlack":"#3F3F46",
        "titleColor":"#09090B",
        "descriptionColor":"#6B7280"
      },
      boxShadow: {
        'btnShadow': '0px 4px 48px 0px #0000000F', // Custom shadow definition
      },

      


    },
  },
  plugins: [],
}

