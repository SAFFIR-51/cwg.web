/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    container: { center: true, padding: { DEFAULT: '24px', md: '40px' }, screens: { '2xl': '1280px' } },
    extend: {
      colors: {
        ink: '#182638',
        sub: '#4E5968',
        muted: '#66738A',
        dim: '#8C97A8',
        faint: '#B3BCC9',
        line: '#E1E7EF',
        hair: '#EEF2F7',
        panel: '#F5F7FA',
        page: '#F7F9FC',
        sky: '#63D5FF',
        cobalt: '#064CCE',
        blue: { DEFAULT: '#0786F6', pressed: '#0669D0', soft: '#EAF4FF', panel: '#F3F7FD' },
        red: { DEFAULT: '#F04452', soft: '#FDECEC' },
        green: { DEFAULT: '#5DBE3F', soft: '#EEF8EA' },
        orange: { DEFAULT: '#FF8A00', soft: '#FFF3E0' },
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
      },
      borderRadius: { xl: '14px', '2xl': '20px', '3xl': '28px' },
      letterSpacing: { tightest: '-0.035em' },
    },
  },
  plugins: [],
};
