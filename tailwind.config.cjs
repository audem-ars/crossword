/** @type {import('tailwindcss').Config} */
module.exports = {
 content: [
   "./index.html",
   "./src/**/*.{js,ts,jsx,tsx}",
 ],
 theme: {
   extend: {
     keyframes: {
       flow: {
         '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
         '50%': { transform: 'translate(10px, 10px) rotate(1deg)' }
       },
       wave: {
         '0%, 100%': { transform: 'translateY(0)' },
         '50%': { transform: 'translateY(-20px)' },
       }
     },
     animation: {
       'flow': 'flow 8s ease-in-out infinite',
       'wave': 'wave 8s ease-in-out infinite',
       'wave-slow': 'wave 10s ease-in-out infinite',
       'wave-slower': 'wave 12s ease-in-out infinite',
     }
   },
 },
 plugins: [],
}