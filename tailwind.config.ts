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
    screens: {
      xs: '240px',
      xm: '360px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1024px',
      '2xl': '1536px'
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      colors: {
        'disabled-input': '#EBEEF2',
        'dark-purple': '#4F2C74',
        purple: '#5E217C',
        'bright-purple': '#81219A',
        lavender: '#9B86BA',
        'light-purple': '#E5DFEC',
        'light-purple-2': '#F9F5FD',
        'body-text-1': '#637488',
        'body-text-2': '#464B53',
        'body-text-3': '#818494',
        'body-text-4': '#2C3034',
        grey: '#BBBBBB',
        'light-grey': '#D6D6D6',
        'dark-grey': '#798F9F',
        'other-grey': '#ABB5C4',
        error: '#EC2247',
        'error-stroke': '#AE1D1D',
        'secondary-warning': '#FF8E3C',
        'tertiary-warning': '#D96C1E',
        reddist: '#DB3838',
        'dark-reddist': '#AE1D1D',
        lumut: '#DFEEEC',
        'toast-error': '#FFF6F6',
        'toast-error-border': '#EBD2CE',
        'form-disabled-bg': '#E9EEF4',
        white: '#FFFFFF',
        transparent: 'transparent',
        black: '#000000',
        gray_bglightgray: '#F5F3F7',
        gray_spacerlight: '#E5E0EB',
        gray_black: '#767279',
        gray_title: '#2C3034',
        gray_light: '#D4D2D5',
        gray_body: '#1A141F',
        purple_dark: '#5E217C',
        purple_light: '#8A20A6',
        purple_soft: '#6E2082',
        purple_verydark: '#481563',
        purple_separator: '#7A3DA2'
      }
    }
  },
  plugins: []
};

export default config;
