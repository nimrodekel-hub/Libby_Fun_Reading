/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
        assistant: ['Assistant', 'sans-serif'],
      },
      colors: {
        magic: {
          pink:    '#FCE7F3',
          'pink-mid': '#F9A8D4',
          'pink-deep': '#EC4899',
          lavender: '#F3E8FF',
          'lavender-mid': '#D8B4FE',
          'lavender-deep': '#9333EA',
          cream:   '#FFFBEB',
          gold:    '#FEF08A',
          'gold-deep': '#EAB308',
          sky:     '#E0F2FE',
          mint:    '#D1FAE5',
        },
      },
      animation: {
        'sparkle': 'sparkle 0.6s ease-in-out forwards',
        'float':   'float 3s ease-in-out infinite',
        'shake':   'shake 0.4s ease-in-out',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow':  'pulse 3s infinite',
        'spin-slow':   'spin 4s linear infinite',
        'star-pop':    'starPop 0.5s ease-out forwards',
      },
      keyframes: {
        sparkle: {
          '0%':   { transform: 'scale(1)',    filter: 'brightness(1)' },
          '50%':  { transform: 'scale(1.12)', filter: 'brightness(1.4)' },
          '100%': { transform: 'scale(1)',    filter: 'brightness(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%':      { transform: 'translateX(-8px)' },
          '40%':      { transform: 'translateX(8px)' },
          '60%':      { transform: 'translateX(-6px)' },
          '80%':      { transform: 'translateX(6px)' },
        },
        starPop: {
          '0%':   { opacity: 1, transform: 'scale(0) translateY(0)' },
          '80%':  { opacity: 1, transform: 'scale(1.2) translateY(-30px)' },
          '100%': { opacity: 0, transform: 'scale(0.8) translateY(-50px)' },
        },
      },
      fontSize: {
        'hebrew-xl':  ['5rem',  { lineHeight: '7rem' }],
        'hebrew-2xl': ['7rem',  { lineHeight: '10rem' }],
        'hebrew-3xl': ['9rem',  { lineHeight: '13rem' }],
      },
    },
  },
  plugins: [],
}
