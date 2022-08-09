const functions = require('firebase-functions');
const express = require('express');
const fs = require('fs');
const path = require('path');
// const homeRoute = require('./routes/homeRoute');
const homeEjsRoute = require('./routes/homeEjsRoute');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// app.use('/', homeRoute);
app.use('/', homeEjsRoute);
app.get('*', (req, res) => {
  try {
    // build 시, build 결과물에 있는 index.html을 functions에 복사해옴
    fs.readFile('index.html', 'utf8', (err, htmlString) => {
      res.set('Content-Type', 'text/html');
      res.send(Buffer.from(htmlString));
    });
  } catch (err) {
    functions.logger.error('error: ', err);
    res.end();
  }
});

exports.helloFunction = functions.https.onRequest(app);
