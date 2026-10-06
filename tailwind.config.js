/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0B192C', // Deep Navy
          dark: '#060E18',
          light: '#182C48',
        },
        secondary: {
          DEFAULT: '#3B82F6', // Electric Blue
          hover: '#2563EB',
          light: '#DBEAFE',
        },
        accent: {
          DEFAULT: '#FF6B35', // Vibrant Coral
          hover: '#E8551E',
          light: '#FFF0EB',
        },
        background: '#F0F4F8', // Very Light Blue
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
