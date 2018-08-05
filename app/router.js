module.exports = (app) => {
  app.get('/api/yuque/ariticles', app.controller.yuque.getArticleList);
  app.get('/api/yuque/ariticle/:slug', app.controller.yuque.getArticleDetail);

  app.get('', '/*', app.controller.home.route);
};
