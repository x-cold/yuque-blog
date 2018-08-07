/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js");

// importScripts(
//   "/build/precache-manifest.4660512449480f7914d47d0cbd93ef92.js"
// );

self.__precacheManifest = [
  {
    "revision": "da89354fb2e8adc830f3",
    "url": "/build/manifest.js"
  },
  {
    "url": "/build/index.js?0cfced22c77cdcf6ea76"
  },
  {
    "revision": "5832e05d4aa23a9168c0",
    "url": "/build/index.css"
  },
  {
    "url": "/"
  },
];

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/\.(?:png|jpg|jpeg|svg)$/, workbox.strategies.cacheFirst({ cacheName: "images", plugins: [new workbox.expiration.Plugin({ "maxEntries": 10, "purgeOnQuotaError": false })] }), 'GET');
workbox.routing.registerRoute(/\.(?:png|jpg|jpeg|svg)$/, workbox.strategies.cacheFirst({ cacheName: "static", plugins: [new workbox.expiration.Plugin({ "maxEntries": 10, "purgeOnQuotaError": false })] }), 'GET');
