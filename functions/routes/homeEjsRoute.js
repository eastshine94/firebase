/* eslint-disable new-cap */
const functions = require('firebase-functions');
const express = require('express');
const axios = require('axios');
const fs = require('fs');

const router = express.Router();

router.get('*', async (req, res) => {
  if (
    req.headers['user-agent'].match(/facebookexternalhit/i) ||
    req.headers['user-agent'].match(/Twitterbot/i) ||
    req.headers['user-agent'].match(/kakaotalk-scrap/i) ||
    req.headers['user-agent'].match(/Slackbot-LinkExpanding/i) ||
    req.headers['user-agent'].match(/Yeti/i) ||
    req.headers['user-agent'].match(/Googlebot/i)
  ) {
    try {
      const data = await axios.get(
        'https://api.openweathermap.org/data/2.5/weather?q=seoul&appid=14c53da014666d422b72401e3a84d27c'
      );

      return res.render('home', { name: data.data.name });
    } catch (err) {
      functions.logger.error('error: ', err);
      res.end();
    }
  } else {
    try {
      fs.readFile('index.html', 'utf8', (err, htmlString) => {
        res.set('Content-Type', 'text/html');
        res.send(Buffer.from(htmlString));
      });
    } catch (err) {
      functions.logger.error('error: ', err);
      res.end();
    }
  }
});

module.exports = router;
