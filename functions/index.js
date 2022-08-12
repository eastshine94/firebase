const functions = require('firebase-functions');
const express = require('express');
const path = require('path');
const { isBot, goToCSR } = require('./lib/helper');
// const homeRoute = require('./routes/homeRoute');
const homeEjsRoute = require('./routes/homeEjsRoute');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// app.use('/', homeRoute);
app.use('/', homeEjsRoute);
app.get('*', (req, res) => {
  return goToCSR(req, res);
});

const exportFunc = functions.https.onRequest((req, res) => {
  return isBot(req) ? app(req, res) : goToCSR(req, res);
});

module.exports = {
  helloFunction: exportFunc
};
