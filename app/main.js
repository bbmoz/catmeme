const express = require('express');
const path = require('path');
const routes = require('./routes.js');

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', routes.index);
app.get('/images', routes.images);

app.listen(port, function () {
  console.log('[ app listening on port 3000 ]');
});
