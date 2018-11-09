'use strict';

const { Service } = require('egg');

module.exports = () => {
  const Api = 'https://cn.bing.com/HPImageArchive.aspx';
  class BingService extends Service {
    async getImages() {
      const { ctx } = this;
      const now = Date.now();
      const api = `${Api}?format=js&idx=0&n=8&nc=${now}&pid=hp`;
      const result = await ctx.curl(api, {
        dataType: 'json',
      });
      return result.data;
    }
  }
  return BingService;
};
