const path = require('path');

module.exports = {
  stories: ['../src/**/*.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  core: {
    builder: '@storybook/builder-vite' // 👈 The builder enabled here.
  }
};
