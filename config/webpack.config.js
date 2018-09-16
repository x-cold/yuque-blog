'use strict';

const WorkboxPlugin = require('workbox-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const isDev = process.env.NODE_ENV === 'development';

const workboxRuntimeCaching = [{
  urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
  handler: 'cacheFirst',
  options: {
    cacheName: 'images',
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
}

const workboxPlugin = new WorkboxPlugin.GenerateSW({
  cacheId: 'webpack-pwa',
  skipWaiting: true, // 强制等待中的 Service Worker 被激活
  clientsClaim: true, // Service Worker 被激活后使其立即获得页面控制权
  exclude: [
    // /\.(?:png|jpg|jpeg|svg)$/,
    /\.*/,
  ],
  chunks: [],
  // 备注: 注释掉下面这两项配置是用于单页应用首页的，多页+单页的混合模式不适用
  // templatedUrls: {
  //   '/': '/',
  // },
  // directoryIndex: '/',
  runtimeCaching: workboxRuntimeCaching,
});

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

  defaultConfig.externals = {
    Snap: 'Snap',
  };

  defaultConfig.plugins.push(workboxPlugin);

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
