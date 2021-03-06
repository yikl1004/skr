import type { StorybookConfig } from '@storybook/react/types';

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5'
  },
  webpackFinal: async (config, options) => {
    if (config.resolve) {
      config.resolve.plugins = [...(config.resolve.plugins || []), new TsconfigPathsPlugin({
        extensions: config.resolve.extensions
      })];
    }

    return config;
  }
};
export default config;
export const core = {
  builder: "webpack5"
};