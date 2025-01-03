/** @type {import('tailwindcss').Config} */

export default {
  darkMode: ['class'],
  content: ['./components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        'palette-gray-0': '#FFFFFF',
        'palette-gray-200': '#E5E5E5',
        'palette-gray-500': '#5C5C5C',
        'palette-gray-1000': '#000000',
        'palette-pink-50': 'rgba(255, 0, 174, 0.2)',
        'palette-pink-100': '#E7C0DB',
        'palette-pink-200': '#C698B8',
        'palette-pink-600': '#FF00AE',
        'palette-violet-50': '#E2DCE7',
        'palette-violet-100': '#775C90',
        'palette-violet-600': '#6727A6',
        'palette-violet-900': '#3C1661',
        'palette-red-600': '#D23F63',
        'palette-green-600': '#67C076',
      },
    },
  },
  // eslint-disable-next-line
  plugins: [require('tailwindcss-animate')],
}
