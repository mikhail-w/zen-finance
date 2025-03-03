/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-darker': 'var(--color-primary-darker)',
        secondary: 'var(--color-secondary)',
        'secondary-darker': 'var(--color-secondary-darker)',
        tertiary: 'var(--color-tertiary)',
        'tertiary-darker': 'var(--color-tertiary-darker)',
      },
      backgroundImage: {
        'gradient-primary': 'var(--gradient-primary)',
        'gradient-secondary': 'var(--gradient-secondary)',
      },
      animation: {
        'spin-twice': 'spin 2s linear 1',
        'fade-in': 'fadeIn 0.3s ease-in-out forwards',
        'slide-in': 'slideIn 0.3s ease-in-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      transitionDuration: {
        1000: '1000ms',
        2000: '2000ms',
      },
    },
  },
  plugins: [],
};
