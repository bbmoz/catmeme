const request = require('request');
const cheerio = require('cheerio');

module.exports = (function scrape() {
  'use strict';

  return function (cb) {
    request('https://www.google.com/search?q=cat+meme&tbm=isch', (error, response, html) => {
      if (error === null && response.statusCode === 200) {
        const $ = cheerio.load(html);
        const images = [];

        $('img').each((i, element) => {
          images.push($(element).attr('src'));
        });

        cb(images);
      } else {
        cb(null);
      }
    });
  };
}());
