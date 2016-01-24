const request = require('request');
const cheerio = require('cheerio');

request('https://www.google.com/search?q=cat+meme&tbm=isch', (error, response, html) => {
  if (error === null && response.statusCode === 200) {
    console.log(html);
  }
});
