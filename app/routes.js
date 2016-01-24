const scrape = require('./scrape.js');

module.exports = (function routes() {
  'use strict';

  let images = null;

  return function (app) {
    app.get('/', (req, res) => {
      res.sendfile('index.html')
    });

    app.get('/images', (req, res) => {
      if (images === null) {
        images = scrape();
      }
      res.json({
        images: images
      });
    });
  }
});
