'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async route() {
    const { ctx } = this;
    const posts = await ctx.service.yuque.getArticleList();
    await ctx.render('index', { posts });
  }
}

module.exports = HomeController;
