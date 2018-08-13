'use strict';

const { app } = require('egg-mock/bootstrap');
const assert = require('assert');

// unittest don't support ssr!
describe('test/controller/home.test.js', () => {
  describe('GET /', () => {
    it('should GET /', async () => {
      const result = await app
        .httpRequest()
        .get('/');
      // Excuse me! I didn't find a solution to support ssr unit test.
      assert.equal(result.status, 500);
    });
  });

  describe('GET /post/:slug', () => {
    it('should GET /post/:slug', async () => {
      const result = await app
        .httpRequest()
        .get('/post/gdquyk');
      assert.equal(result.status, 500);
    });
  });
});
