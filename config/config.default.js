'use strict';

const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');

module.exports = (appInfo) => {
  let blogConfig = {};
  // Get document, or throw exception on error
  try {
    blogConfig = yaml.safeLoad(
      fs.readFileSync(
        path.join(appInfo.baseDir, 'config.yml'),
        'utf8'
      )
    );
  } catch (e) {
    console.error(e.message);
    process.exit(-1);
  }
  const clientViewRoot = path.join(
    appInfo.baseDir, `themes/${blogConfig.theme}`
  );
  const serverViewRoot = path.join(appInfo.baseDir, '/app/view');
  const config = {
    keys: 'key',
    client: clientViewRoot,
    view: {
      defaultExtension: '.jsx',
      root: `$${serverViewRoot},${clientViewRoot}`,
    },
    isomorphic: {
      babel: {
        plugins: [
          require.resolve('babel-plugin-transform-decorators-legacy'),
        ],
      },
      alias: {
        client: clientViewRoot,
      },
    },
    webpack: {
      custom: {
        configPath: path.join(appInfo.baseDir, 'config/webpack.config.js'),
      },
    },
    blog: blogConfig,
  };
  return config;
};
