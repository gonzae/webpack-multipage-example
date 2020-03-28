const express = require('express');
const path = require('path');

const app = express();

const kStaticDir = __dirname + '/dist';

app.get('/', function (req, res) {
  res.sendFile(path.join(kStaticDir, 'home.html'));
});

app.get('/settings', function (req, res) {
  res.sendFile(path.join(kStaticDir, 'settings.html'));
});

app.use(express.static(kStaticDir));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});