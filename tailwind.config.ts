import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    borderWidth: {
      '1': '1px',
    },
    colors: {
      transparent: 'transparent',
      white: '#ffffff',
      black: '#000000',
      gray_bglightgray: '#F5F3F7',
      gray_spacerlight: '#E5E0EB',
      gray_black: '#767279',
      gray_black_dark: '#1A141F',
      purple_brand: '#5E217C',
      purple_light_bg: '#FAF8FB',
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
