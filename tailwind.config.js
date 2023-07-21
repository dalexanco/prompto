/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

export const content = ['./src/**/*.{js,ts,jsx,tsx}'];
export const theme = {
  extend: {
    colors: {
      primary: colors.cyan
    }
  }
};
export const plugins = [];
