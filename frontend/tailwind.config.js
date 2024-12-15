/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,svg}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'text': '2px 2px 8px rgba(0, 0, 0, 0.2)', // Ombre personnalisée pour le texte
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-shadow': {
          textShadow: '2px 2px 8px rgba(0, 0, 0, 0.2)', // Ombre pour le texte
        },
      }, ['responsive', 'hover']); // Si vous voulez ajouter des variantes comme hover
    },
  ],
}
