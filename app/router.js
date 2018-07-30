module.exports = (app) => {
  app.get('home', '/', app.controller.home.index);

  app.get('about', '/about', 'home.about');

  app.get('getArticleList', '/api/yuque/ariticles', app.controller.yuque.getArticleList);
  app.get('getArticleDetail', '/api/yuque/ariticle/:slug', app.controller.yuque.getArticleDetail);
};
