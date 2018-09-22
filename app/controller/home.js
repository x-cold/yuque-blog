'use strict';

const { Controller } = require('egg');

const mobileRegx = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/;

module.exports = (app) => {
  const { config } = app;
  const { blog: blogConfig } = config;

  class HomeController extends Controller {
    async defaultRoute() {
      const { ctx } = this;
      const userAgent = ctx.get('User-Agent');
      const isMobile = !!userAgent && mobileRegx.test(userAgent);
      const posts = await ctx.service.yuque.getArticleList();
      await ctx.render('index', {
        posts: posts.data,
        config: blogConfig,
        isMobile,
      });
    }

    async postRoute() {
      const { ctx } = this;
      const { slug } = ctx.params;
      const userAgent = ctx.get('User-Agent');
      const isMobile = !!userAgent && mobileRegx.test(userAgent);
      const post = await ctx.service.yuque.getArticleDetail(slug);
      if (!post.data) {
        return ctx.redirect('/404.html');
      }
      await ctx.render('index', {
        post: post.data,
        config: blogConfig,
        isMobile,
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

