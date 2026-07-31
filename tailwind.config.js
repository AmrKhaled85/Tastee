/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdf4',
          100: '#e0f2e9',
          200: '#c5e6d6',
          300: '#94d2b7',
          400: '#5bb792',
          500: '#00875a',
          600: '#006b4d', // Primary reference brand color
          700: '#06543d',
          800: '#074433',
          900: '#073827',
          950: '#032017',
        },
        accent: {
          yellow: '#ffb800',
          orange: '#ff6b00',
          mint: '#e6f7ef',
          softBg: '#f8faf9',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        soft: '0 10px 30px -10px rgba(0, 107, 77, 0.08)',
        card: '0 4px 20px rgba(0, 0, 0, 0.05)',
        hover: '0 14px 28px rgba(0, 107, 77, 0.12)',
        glow: '0 0 25px rgba(0, 107, 77, 0.25)',
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'bounce-soft': 'bounce 3s infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};
