/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

const baseConfig = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      ...colors,
      primary: colors.cyan
    }
  },
  plugins: []
};

export default baseConfig;
