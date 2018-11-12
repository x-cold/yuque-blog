module.exports = (app) => {
  // 语雀文章 API
  app.get('/api/yuque/ariticles', app.controller.yuque.getArticleList);
  app.get('/api/yuque/ariticleToc', app.controller.yuque.getArticleToc);
  app.get('/api/yuque/ariticle/:slug', app.controller.yuque.getArticleDetail);
  app.get('/api/yuque/user/:id', app.controller.yuque.getUser);

  // sw
  app.get('', '/service-worker.js', app.controller.home.serviceWorker);

  // 页面相关
  app.get('', '/post/:slug', app.controller.home.postRoute);
  app.get('', '/404.html', app.controller.home.defaultRoute);
  app.get('', '/*', app.controller.home.defaultRoute);
};
