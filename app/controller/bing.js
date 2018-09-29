'use strict';

const { Controller } = require('egg');

class BingController extends Controller {
  async getImgs() {
    const { ctx } = this;
    const result = await ctx.service.bing.getImgs();
    ctx.body = result.images;
  }
}

module.exports = BingController;
