'use strict';

const WorkboxPlugin = require('workbox-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const isDev = process.env.NODE_ENV === 'development';

const workboxRuntimeCaching = [{
  // Match any request ends with .png, .jpg, .jpeg or .svg.
  urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

  // Apply a cache-first strategy.
  handler: 'cacheFirst',

  options: {
    // Use a custom cache name.
    cacheName: 'images',

    // Only cache 10 images.
    expiration: {
      maxEntries: 100,
    },
  },
}];

if (!isDev) {
  workboxRuntimeCaching.push({
    urlPattern: /\.*/,
    handler: 'networkFirst',
  });
} else {
  workboxRuntimeCaching.push({
    urlPattern: /\.*/,
    handler: 'networkOnly',
  });
}

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

  // For Pwa support
  defaultConfig.plugins.push(
    new WorkboxPlugin.GenerateSW({
      cacheId: 'webpack-pwa',
      skipWaiting: true, // 强制等待中的 Service Worker 被激活
      clientsClaim: true, // Service Worker 被激活后使其立即获得页面控制权
      exclude: [
        /\.(?:png|jpg|jpeg|svg)$/,
      ],
      templatedUrls: {
        '/': '/',
      },
      directoryIndex: '/',
      runtimeCaching: workboxRuntimeCaching,
    })
  );

  defaultConfig.plugins.push(
    new BundleAnalyzerPlugin()
  );

  defaultConfig.externals = {
    Snap: 'Snap',
  };

  return defaultConfig;
};
