'use strict';

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const isDev = process.env.NODE_ENV === 'development';

module.exports = (app, defaultConfig) => {
  // For mobx decorators
  for (const loader of defaultConfig.module.rules) {
    if (loader.test.test('.jsx') && loader.test.test('.js')) {
      if (!Array.isArray(loader.use.options.plugins)) {
        loader.use.options.plugins = [];
      }
      loader.use.options.plugins.push(
        require.resolve('babel-plugin-transform-decorators-legacy')
      );
      break;
    }
  }

  // development
  if (isDev) {
    return defaultConfig;
  }

  // production
  defaultConfig.plugins.push(
    new BundleAnalyzerPlugin()
  );

  return defaultConfig;
};
