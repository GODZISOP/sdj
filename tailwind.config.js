/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cobalt: {
          DEFAULT: '#002FA7',
          bright: '#0038CC',
          dark: '#00227A',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#F5F6F8',
          subtle: '#EAECEF',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
