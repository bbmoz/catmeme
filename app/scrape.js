module.exports = (function scrape() {
  'use strict';
  const Nightmare = require('nightmare');
  const vo = require('vo');
  const request = Nightmare();
  let imageNamesStore;

  return {
    previewImageNames: function (cb) {
      vo(function* () {
        if (imageNamesStore === undefined) {
          const imageNames = yield request
            .useragent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36')
            .goto('https://www.google.com/search?q=cat+meme&tbm=isch&tbs=isz:lt,islt:svga')
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
        const imageSrc = yield request
          .goto(`https://www.google.com/search?q=cat+meme&tbm=isch&tbs=isz:lt,islt:svga#imgrc=${encodeURIComponent(imageName)}`)
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
      })(function (error, imageSrc) {
        if (error) {
          cb(error);
        } else {
          cb(null, imageSrc)
        }
      });
    }
  };
}());
