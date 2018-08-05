'use strict';

const { Service } = require('egg');

const API_HOST = 'https://www.yuque.com/api/v2';
const namespace = 'yinzhi/blog';

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
    const { ctx } = this;
    const api = `${API_HOST}/repos/${namespace}/docs/${slug}`;
    const result = await ctx.curl(api, {
      dataType: 'json',
    });
    return result.data;
  }
}

module.exports = YuqueService;
