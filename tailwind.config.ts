import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#b2e0ff',
          dark: '#171717',
          bgDark: '#6C757D',
          bgLight: '#f3f2e9',
          glass: '#bcd1d094',
          hover: '',
        },
        primary: {
          fontLight: '#000000',
          light: '#f3f3f3',
          DEFAULT: '#FF1493',
          dark: '#B30068',
        },
        secondary: {
          fontLight: '#0f1b9c',
          light: '#6C757D',
          DEFAULT: '#495057',
          dark: '#343A40',
        },
        inactive: {
          light: '#c8c8c8',
          dark: '#343A40',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
} as const;
export default config;