const request = require('request');
const cheerio = require('cheerio');

module.exports = (function scrape() {
  'use strict';

  return function () {
    request('https://www.google.com/search?q=cat+meme&tbm=isch', (error, response, html) => {
      if (error === null && response.statusCode === 200) {
        const $ = cheerio.load(html);

        const imgSrcs = [];
        $('img').each((i, element) => {
          imgSrcs.push($(element).attr('src'));
        });
      }
    });
  };
});
