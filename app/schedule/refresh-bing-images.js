'use strict';

const lodash = require('lodash');

module.exports = (app) => {
  return {
    schedule: {
      cron: '0 0 */3 * * *',
      type: 'all',
      immediate: true,
    },

    async task(ctx) {
      const { service } = ctx;
      const images = await service.bing.getImages();
      let bingImages = lodash.get(images, 'images', []);
      bingImages = bingImages.map(
        item => `//cn.bing.com/${item.urlbase}_800x600.jpg`
      );
      if (bingImages.length > 0) {
        app.bingImages = bingImages;
      }
    },
  };
};
