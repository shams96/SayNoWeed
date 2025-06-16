/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'afterglow': '#FFFDD0', // PANTONE 11-0510 TCX Afterglow
        'green-flash': '#A7D129', // PANTONE 15-0146 TCX Green Flash
        'lavender': '#C8A2C8', // PANTONE 15-3817 TCX Lavender
        'dark-green': '#4F6F52', // A darker green for better contrast
        // Keeping some existing dark tones for background/text contrast if needed
        'dark-bg': '#0F172A', // Slate 900 equivalent
        'dark-card': '#1E293B', // Slate 800 equivalent
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to bottom, var(--tw-colors-dark-bg), var(--tw-colors-dark-card))',
        'card-gradient': 'linear-gradient(145deg, #334155, #1E293B)', // Can be updated later
      },
      boxShadow: {
        'recovery': '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)',
      }
    },
  },
  plugins: [],
}
