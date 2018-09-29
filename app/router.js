module.exports = (app) => {
  app.get('/api/yuque/ariticles', app.controller.yuque.getArticleList);
  app.get('/api/yuque/ariticleToc', app.controller.yuque.getArticleToc);
  app.get('/api/yuque/ariticle/:slug', app.controller.yuque.getArticleDetail);
  app.get('/api/bing/imgs', app.controller.bing.getImgs);

  // 禁用 static 的缓存
  app.get('', '/service-worker.js', app.controller.home.serviceWorker);
  app.get('', '/post/:slug', app.controller.home.postRoute);
  app.get('', '/*', app.controller.home.defaultRoute);
};
