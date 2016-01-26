module.exports = (function routes() {
  'use strict';
  const scrape = require('./scrape.js');

  return {
    index: (req, res) => {
      res.sendfile('index.html');
    },

    images: (req, res) => {
      scrape.previewImageNames((e1, imageNames) => {
        if (e1 === null) {
          const randomImageName = imageNames[Math.floor(Math.random() * imageNames.length)];
          scrape.getActualImageSrc(randomImageName, (e2, imageSrc) => {
            if (e2 === null) {
              res.json({
                image: imageSrc
              });
            } else {
              console.log(e2);
            }
          });
        } else {
          console.log(e1);
        }
      });
    }
  };
}());
