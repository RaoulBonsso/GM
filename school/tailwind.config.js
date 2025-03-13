/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4f46e5',
          hover: '#4338ca',
          light: '#e0e7ff',
        },
        secondary: {
          DEFAULT: '#0ea5e9',
          hover: '#0284c7',
          light: '#e0f2fe',
        },
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6',
      },
    },
  },
  plugins: [],
};
