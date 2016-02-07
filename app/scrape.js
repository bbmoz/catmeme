module.exports = (function scrape() {
  'use strict';
  const Nightmare = require('nightmare');
  const vo = require('vo');
  const request = Nightmare();
  let imageNamesStore;
  let imageUrlStore = {};

  setInterval(function () {
    imageNamesStore = undefined;
    imageUrlStore = {};
  }, 21600); // every 6 hours

  return {
    previewImageNames: function (cb) {
      vo(function* () {
        if (imageNamesStore === undefined) {
          const imageNames = yield request
            .useragent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36')
            .goto('https://www.google.com/search?q=cute+cat+meme&tbm=isch&tbs=isz:m')
            .wait('img.rg_i')
            .evaluate(function () {
              const imageNames = [];
              const previewImages = document.querySelectorAll('img.rg_i');
              const length = previewImages.length;
              for (var i = 0; i < length; i += 1) {
                imageNames.push(previewImages[i].name);
              }
              return imageNames;
            });
          return imageNames;
        } else {
          return imageNamesStore;
        }
      })(function (error, imageNames) {
        console.log(imageNames.length);
        if (error) {
          cb(error);
        } else {
          imageNamesStore = imageNames;
          cb(null, imageNames);
        }
      });
    },

    getActualImageSrc: function (imageName, cb) {
      vo(function* () {
        if (imageUrlStore[imageName] !== undefined) {
          return imageUrlStore[imageName];
        } else {
          const imageSrc = yield request
            .goto(`https://www.google.com/search?q=cute+cat+meme&tbm=isch&tbs=isz:m#imgrc=${encodeURIComponent(imageName)}`)
            .wait('#irc_cc img.irc_mi[src^="http"]')
            .evaluate(function () {
              const possibleImages = document.querySelectorAll('#irc_cc img.irc_mi[src^="http"]');
              const length = possibleImages.length;
              var correctImageIndex = 0;
              for (var i = 1; i < length; i += 1) {
                if (possibleImages[i].height > possibleImages[correctImageIndex].height) {
                  correctImageIndex = i;
                }
              }
              return possibleImages[correctImageIndex].src;
            });
          return imageSrc;
        }
      })(function (error, imageSrc) {
        if (error) {
          cb(error);
        } else {
          imageUrlStore[imageName] = imageSrc;
          cb(null, imageSrc)
        }
      });
    }
  };
}());
