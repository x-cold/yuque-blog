'use strict';

const { Controller } = require('egg');

module.exports = (app) => {
  const { config } = app;
  const { blog: blogConfig } = config;

  class HomeController extends Controller {
    async defaultRoute() {
      const { ctx } = this;
      const posts = await ctx.service.yuque.getArticleList();
      await ctx.render('index', {
        posts: posts.data,
        config: blogConfig,
      });
    }

    async postRoute() {
      const { ctx } = this;
      const { slug } = ctx.params;
      const post = await ctx.service.yuque.getArticleDetail(slug);
      if (!post.data) {
        return ctx.redirect('/404.html');
      }
      await ctx.render('index', {
        post: post.data,
        config: blogConfig,
      });
    }

    async serviceWorker() {
      const { ctx } = this;
      const result = await ctx.curl(`${ctx.host}/build/service-worker.js`);
      ctx.type = 'application/javascript';
      ctx.body = result.data;
    }
  }
  return HomeController;
};

