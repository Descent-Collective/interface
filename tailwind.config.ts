import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './views/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      colors: {
        black: {
          50: '#000000',
          100: '#030303',
          150: '#181818',
          200: '#060703',
          250: '#474747',
        },
        blue: {
          50: '#826CFF',
          100: '#BCFD00',
          150: '#0052FF',
        },
        white: {
          50: '#FFFFFF',
          100: '#ECECEC',
          150: '#f8f8f8',
          200: '#FAFFFE',
          250: '#FCFCFC',
          300: '#FBFAF9',
          350: '#EEEEEE',
          400: '#FEFEFF',
          450: '#E8E8E8',
          500: '#FDFDFD',
        },
        green: {
          50: '#26A989',
          100: '#26A989',
          150: '#95C900',
          200: '#F6F9F0',
          250: '#8EBF00',
          300: '#E7F7BA',
          400: 'rgba(188, 253, 0, 0.16)',
        },
        grey: {
          50: '#979797',
          100: '#EAEAEA',
          150: '#E3E3E3',
          200: '#4D4D4D',
          250: '#454545',
          300: '#2B2B2B',
          350: '#E6E6E6',
          400: 'rgba(3, 3, 3, 0.32)',
          450: '#C5C5C5',
          500: '#909090',
          550: '#8D8D8D',
          600: '#545454',
          650: '#9F9F9F',
          700: '#C0C0C0',
          750: '#FAFAFA',
          800: '#B6B6B6',
          850: '#E7E7E7',
          900: '#F6F6F6',
          950: '#D9D9D9',
          1000: 'rgba(248, 248, 248, 0.20)',
        },
        red: {
          50: '#FF7663',
          100: '#FDF3EC',
          150: '#E66E17',
        },
      },

      fontFamily: {
        SF_UI_Display: ['SF UI Display'],
        Space_Mono: ['Space Mono'],
      },
    },
  },
  plugins: [],
};
export default config;
