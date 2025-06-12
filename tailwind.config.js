/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#1e293b',
        accent: '#f59e0b',
        background: '#f3f4f6',
        text: '#111827',
      },
    },
  },
  plugins: [],
};
