import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/screens/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    borderRadius: {
      '40': '40px',
      'full': '100%',
      '20': '20px',
      'xl': '12px',
    },
    screens: {
      d: '1140px',
      t: { min: '768px', max: '1139px' },
      s: { max: '767px' },
    },
    colors: {
      primary: '#FFCB08',
      red: '#C90B0B',
      white: '#FFFFFF',
      black: '#1D1D1D',
      gray: '#D9D9D9',
      darkGray: '#6D6D6D',
      light: '#EDEDED',
      green: '#219F02'
    },
    

  },
  plugins: [],
}
export default config
