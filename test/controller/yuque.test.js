'use strict';

const { app } = require('egg-mock/bootstrap');
const assert = require('assert');

describe('test/controller/yuque.test.js', () => {
  describe('GET /api/yuque/ariticles', () => {
    it('should GET /api/yuque/ariticles', async () => {
      const result = await app
        .httpRequest()
        .get('/api/yuque/ariticles');
      assert.equal(result.status, 200);
      assert.equal(Array.isArray(result.body.data), true);
    });
  });

  describe('GET /api/yuque/ariticleToc', () => {
    it('should GET /api/yuque/ariticleToc', async () => {
      const result = await app
        .httpRequest()
        .get('/api/yuque/ariticleToc');
      assert.equal(result.status, 200);
      assert.equal(Array.isArray(result.body.data), true);
    });
  });

  describe('GET /api/yuque/ariticle/:slug', () => {
    it('should GET /api/yuque/ariticle/:slug', async () => {
      const result = await app
        .httpRequest()
        .get('/api/yuque/ariticle/gdquyk');
      assert.equal(result.status, 200);
      assert.equal(typeof result.body.data, 'object');
    });
  });
});
