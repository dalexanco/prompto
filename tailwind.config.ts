/** @type {import('tailwindcss').Config} */
import materialColors from './src/styles/tailwind-material';
import colors from 'tailwindcss/colors';

const baseConfig = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      ...colors,
      ...materialColors
    }
  },
  plugins: []
};

export default baseConfig;
