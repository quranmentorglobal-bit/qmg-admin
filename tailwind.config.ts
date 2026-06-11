import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        green: {
          DEFAULT: '#1B5E37',
          dark:    '#0D3D20',
          mid:     '#2A7A4A',
          light:   '#E8F5EE',
        },
        gold: {
          DEFAULT: '#B8952A',
          light:   '#D4AF50',
          pale:    '#F0E4B8',
        },
        cream: {
          DEFAULT: '#F5F0E8',
          dark:    '#EDE6D6',
        },
        ink: {
          DEFAULT: '#1A1A1A',
          mid:     '#3D3D3D',
          light:   '#6B6B6B',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body:    ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
