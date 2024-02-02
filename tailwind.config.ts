import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    fontFamily: {
      opensans: 'var(--font-open-sans)',
      karla: 'var(--font-karla)'
    },
    colors: {
      transparent: 'transparent',
      white: '#ffffff',
      black: '#000000',
      gray_bglightgray: '#F5F3F7',
      gray_spacerlight: '#E5E0EB',
      gray_title: '#2C3034',
      gray_light: '#D4D2D5',
      gray_body: '#1A141F',
      gray_black: '#767279',
      purple_dark: '#5E217C',
      purple_light: '#8A20A6'
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      }
    }
  },
  plugins: []
};

export default config;
