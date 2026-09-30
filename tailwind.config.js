/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    container: { center: true, padding: { DEFAULT: '24px', md: '40px' }, screens: { '2xl': '1280px' } },
    extend: {
      colors: {
        ink: '#182638',
        sub: '#4E5968',
        muted: '#6B7684',
        dim: '#8B95A1',
        faint: '#B0B8C1',
        line: '#E5E8EB',
        hair: '#F2F4F6',
        panel: '#F5F7FA',
        page: '#F7F9FC',
        blue: { DEFAULT: '#246BFE', pressed: '#1454D9', soft: '#ECF3FF' },
        red: { DEFAULT: '#F04452', soft: '#FDECEC' },
        green: { DEFAULT: '#00B37E', soft: '#E6F7F0' },
        orange: { DEFAULT: '#FF8A00', soft: '#FFF3E0' },
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
      },
      borderRadius: { '2xl': '20px', '3xl': '28px' },
      letterSpacing: { tightest: '-0.035em' },
    },
  },
  plugins: [],
};
