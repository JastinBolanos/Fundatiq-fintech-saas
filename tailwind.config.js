/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        fundatiq: {
          950: '#090d16',
          900: '#0f1626',
          850: '#131d33',
          800: '#16223b',
          700: '#1f2f52',
          600: '#2b3f6b',
        },
        brand: {
          blue: '#3b82f6',
          cyan: '#06b6d4',
          emerald: '#10b981',
          rose: '#f43f5e',
          amber: '#f59e0b',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
      boxShadow: {
        'glow-blue': '0 0 20px -5px rgba(59, 130, 246, 0.25)',
        'glow-emerald': '0 0 20px -5px rgba(16, 185, 129, 0.25)',
      },
    },
  },
  plugins: [],
};
