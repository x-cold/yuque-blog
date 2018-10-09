'use strict';

const assert = require('assert');
const md = require('../util/md');
const { Service } = require('egg');

module.exports = (app) => {
  const { config } = app;
  const { blog } = config;
  const { yuque: yuqueConfig } = blog;
  const { base, login, repo } = yuqueConfig;
  assert(login && repo, 'login 和 repo 必须配置');
  const namespace = `${login}/${repo}`;
  const API_HOST = base || 'https://www.yuque.com/api/v2';

  class YuqueService extends Service {
    async getArticleList() {
      const { ctx } = this;
      const api = `${API_HOST}/repos/${namespace}/docs`;
      const result = await ctx.curl(api, {
        dataType: 'json',
      });
      return result.data;
    }

    async getArticleDetail(slug) {
      const data = await this.getArticleDetailRaw(slug);
      try {
        const article = data.data;
        article.body_html = md.render(article.body);
      } catch (error) {
        // do noting
      }
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
