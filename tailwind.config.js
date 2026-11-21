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
          pink:         '#FCE7F3',
          'pink-mid':   '#F9A8D4',
          'pink-deep':  '#EC4899',
          lavender:     '#F3E8FF',
          'lavender-mid':  '#D8B4FE',
          'lavender-deep': '#9333EA',
          cream:        '#FFFBEB',
          gold:         '#FEF08A',
          'gold-deep':  '#EAB308',
          sky:          '#E0F2FE',
          mint:         '#D1FAE5',
        },
      },
      animation: {
        'sparkle':      'sparkle 0.6s ease-in-out forwards',
        'float':        'float 3s ease-in-out infinite',
        'shake':        'shake 0.4s ease-in-out',
        'bounce-slow':  'bounce 2s infinite',
        'pulse-slow':   'pulse 3s infinite',
        'spin-slow':    'spin 4s linear infinite',
        'star-pop':     'starPop 0.5s ease-out forwards',
        'wiggle':       'wiggle 0.5s ease-in-out',
        'score-pop':    'scorePop 0.9s ease-out forwards',
        'glow-pulse':   'glowPulse 1.8s ease-in-out infinite',
        'tile-hit':     'tileHit 0.35s ease-out forwards',
        'heard-burst':  'heardBurst 0.6s ease-out forwards',
        'slide-up':     'slideUp 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'pop-in':       'popIn 0.45s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'float-slow':   'float 5s ease-in-out infinite',
        'float-med':    'float 4s ease-in-out infinite',
      },
      keyframes: {
        sparkle: {
          '0%':   { transform: 'scale(1)',    filter: 'brightness(1)' },
          '50%':  { transform: 'scale(1.12)', filter: 'brightness(1.4)' },
          '100%': { transform: 'scale(1)',    filter: 'brightness(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
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
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg) scale(1)' },
          '25%':      { transform: 'rotate(-14deg) scale(1.08)' },
          '75%':      { transform: 'rotate(14deg) scale(1.08)' },
        },
        scorePop: {
          '0%':   { opacity: 0,   transform: 'translateY(0)    scale(0.4)' },
          '30%':  { opacity: 1,   transform: 'translateY(-24px) scale(1.4)' },
          '70%':  { opacity: 1,   transform: 'translateY(-48px) scale(1.1)' },
          '100%': { opacity: 0,   transform: 'translateY(-80px) scale(0.9)' },
        },
        glowPulse: {
          '0%, 100%': { filter: 'brightness(1) drop-shadow(0 0 4px rgba(167,139,250,0.3))' },
          '50%':      { filter: 'brightness(1.2) drop-shadow(0 0 12px rgba(167,139,250,0.7))' },
        },
        tileHit: {
          '0%':   { transform: 'scale(1)' },
          '30%':  { transform: 'scale(0.87)' },
          '65%':  { transform: 'scale(1.14)' },
          '100%': { transform: 'scale(1)' },
        },
        heardBurst: {
          '0%':   { opacity: 1, transform: 'scale(1)' },
          '40%':  { opacity: 1, transform: 'scale(1.3)' },
          '100%': { opacity: 0, transform: 'scale(2)' },
        },
        slideUp: {
          '0%':   { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        popIn: {
          '0%':   { opacity: 0, transform: 'scale(0.5)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
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
