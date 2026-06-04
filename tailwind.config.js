/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Rozha One"', 'serif'],
        body: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        surface: 'var(--surface)',
        surface2: 'var(--surface2)',
        border: 'var(--border)',
        primary: 'var(--primary)',
        textMain: 'var(--text)',
        textSub: 'var(--sub)',
      },
      boxShadow: {
        card: '0 4px 24px rgba(0,0,0,0.35)',
        float: '0 8px 40px rgba(0,0,0,0.55)',
        glow: '0 0 28px var(--primary-glow)',
      },
      animation: {
        'slide-up': 'slideUp 0.38s cubic-bezier(0.22,0.68,0,1.2)',
        'fade-in':  'fadeIn 0.22s ease',
        'pop':      'pop 0.32s cubic-bezier(0.22,0.68,0,1.4)',
        'sheet-in': 'sheetIn 0.4s cubic-bezier(0.32,0.72,0,1)',
      },
      keyframes: {
        slideUp:  { from: { opacity: '0', transform: 'translateY(28px) scale(0.96)' }, to: { opacity: '1', transform: 'none' } },
        fadeIn:   { from: { opacity: '0' }, to: { opacity: '1' } },
        pop:      { '0%': { opacity: '0', transform: 'scale(0.84)' }, '70%': { transform: 'scale(1.05)' }, '100%': { opacity: '1', transform: 'none' } },
        sheetIn:  { from: { transform: 'translateY(100%)' }, to: { transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}
