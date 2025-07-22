/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    module.exports = {
      theme: {
        extend: {
          fontFamily: {
            poppins: ['Poppins', 'sans-serif'],
            volkhov: ['Volkhov', 'serif'],
            },
            colors: {
              primary: {
                default: '#1d4ed8',
                light: '#3b82f6',
                dark: '#1e40af',
              }
            }
      },
    },
  };
  
    plugins: [],
  }
  