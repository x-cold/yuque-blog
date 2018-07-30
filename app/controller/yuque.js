'use strict';

const { Controller } = require('egg');

class YuqueController extends Controller {
  async getArticleList() {
    const { ctx } = this;
    const result = await ctx.service.yuque.getArticleList();
    ctx.body = result;
  }

  async getArticleDetail() {
    const { ctx } = this;
    const { slug } = ctx.params;
    const result = await ctx.service.yuque.getArticleDetail(slug);
    ctx.body = result;
  }
}

module.exports = YuqueController;
