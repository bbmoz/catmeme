const scrape = require('./scrape.js');

module.exports = (function routes() {
  'use strict';

  let imagesStore = [];

  function getRandomImage(images) {
    return images[Math.floor(Math.random() * images.length)];
  }

  return {
    index: (req, res) => {
      res.sendfile('index.html');
    },

    images: (req, res) => {
      if (imagesStore.length === 0) {
        scrape(function (images) {
          res.json({
            image: getRandomImage(images)
          });
          imagesStore = images;
        });
      } else {
        res.json({
          image: getRandomImage(imagesStore)
        });
      }
    }
  };
}());
