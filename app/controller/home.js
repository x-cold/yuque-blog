'use strict';

const { Controller } = require('egg');
const fs = require('fs');
const path = require('path');

const mobileUserAgentRegx =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/;

module.exports = (app) => {
  const { config } = app;
  const { blog: blogConfig } = config;

  class HomeController extends Controller {
    async renderPage(page, data) {
      const { ctx } = this;
      const userAgent = ctx.get('User-Agent');
      const mobileMode = !!userAgent && mobileUserAgentRegx.test(userAgent);
      await ctx.render('index', {
        config: blogConfig,
        env: config.env,
        mobileMode,
        ...data,
      });
    }

    async defaultRoute() {
      const { ctx } = this;
      const posts = await ctx.service.yuque.getArticleList();
      await this.renderPage('index', {
        posts: posts.data,
      });
    }

    async postRoute() {
      const { ctx } = this;
      const { slug } = ctx.params;
      const post = await ctx.service.yuque.getArticleDetail(slug);
      if (!post.data) {
        return ctx.redirect('/404.html');
      }
      await this.renderPage('index', {
        post: post.data,
      });
    }

    async serviceWorker() {
      const { ctx } = this;
      const filePath = path.join(app.baseDir, 'app/public/service-worker.js');
      const promise = new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
          if (err) {
            return reject(err);
          }
          resolve(data);
        });
      });
      const text = await promise;
      ctx.type = 'application/javascript';
      ctx.body = text;
    }
  }
  return HomeController;
};

