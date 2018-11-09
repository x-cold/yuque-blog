'use strict';

const assert = require('assert');
const lodash = require('lodash');
const { Service } = require('egg');

const md = require('../util/md');

module.exports = (app) => {
  const { config } = app;
  const { blog } = config;
  const { yuque: yuqueConfig } = blog;
  const { base, login, repo } = yuqueConfig;
  assert(login && repo, 'login 和 repo 必须配置');
  const namespace = `${login}/${repo}`;
  const API_HOST = base || 'https://www.yuque.com/api/v2';

  class YuqueService extends Service {
    getRandomImage() {
      const { bingImages = [] } = app;
      const rand = Math.floor(Math.random() * bingImages.length);
      return bingImages[rand];
    }

    async getArticleList() {
      const { ctx } = this;
      const api = `${API_HOST}/repos/${namespace}/docs`;
      const result = await ctx.curl(api, {
        dataType: 'json',
      });
      const { data } = result;
      let list;
      try {
        list = data.data;
        list.forEach((article) => {
          article.thumb = this.getRandomImage();
        });
      } catch (error) {
        ctx.logger.error(error);
      }
      data.data = list;
      return data;
    }

    async getArticleDetail(slug) {
      const { ctx } = this;
      const data = await this.getArticleDetailRaw(slug);
      let article;
      try {
        article = data.data;
        article = lodash.pick(article, [
          'id',
          'slug',
          'book_id',
          'user_id',
          'format',
          'public',
          'status',
          'likes_count',
          'comments_count',
          'content_updated_at',
          'deleted_at',
          'created_at',
          'updated_at',
          'published_at',
          'word_count',
          '_serializer',
          'book',
          'creator',
          'body',
          'body_html',
          'body_draft',
        ]);
        article.body_html = md.render(article.body);
        article.thumb = this.getRandomImage();
      } catch (error) {
        ctx.logger.error(error);
      }
      data.data = article;
      return data;
    }

    async getArticleDetailRaw(slug) {
      const { ctx } = this;
      const api = `${API_HOST}/repos/${namespace}/docs/${slug}?raw=true`;
      const result = await ctx.curl(api, {
        dataType: 'json',
      });
      return result.data;
    }

    async getArticleToc() {
      const { ctx } = this;
      const api = `${API_HOST}/repos/${namespace}/toc`;
      const result = await ctx.curl(api, {
        dataType: 'json',
      });
      return result.data;
    }

    async getUser(id) {
      const { ctx } = this;
      const api = `${API_HOST}/users/${id}`;
      const result = await ctx.curl(api, {
        dataType: 'json',
      });
      return result.data;
    }
  }
  return YuqueService;
};
