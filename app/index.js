const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

require('./routes.js')(app);

app.listen(3000, function () {
  console.log('[ app listening on port 3000 ]');
});
