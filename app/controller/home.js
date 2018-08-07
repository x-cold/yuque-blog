'use strict';

const { Controller } = require('egg');
const path = require('path');
const fs = require('fs');

class HomeController extends Controller {
  async route() {
    const { ctx } = this;
    const posts = await ctx.service.yuque.getArticleList();
    await ctx.render('index', { posts });
  }

  async serviceWorker() {
    const { ctx } = this;

    const result = await ctx.curl(`${ctx.host}/build/service-worker.js`);
    ctx.type = 'application/javascript';
    ctx.body = result.data;
  }
}

module.exports = HomeController;
