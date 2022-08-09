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
      const htmlString = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
            <meta charset="utf-8" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" href="/logo192.png" />

            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />
            <meta name="description" content="Home Test Description" />
            <meta name="url" content="url" />
            <meta property="og:title" content="Home Test Title ${data.data.name}" />
            <meta property="og:type" content="Home Test Type" />
            <meta property="og:url" content="Home Test URL" />
            <meta property="og:image" content="http://cdn.edujin.co.kr/news/photo/202007/33451_61410_5236.jpg" />
            <meta property="og:site_name" content="Home Test Site name ${data.data.name}" />
            <meta property="og:description" content="Home Test Description ${data.data.name}" />
            <title>Home 입니다~</title>  
        </head>
        <body>
            <h1>Home Test!!!</h1>
            <div>로봇인가요?</div>
            <div>name : ${data.data.name}</div>
        </body>
      </html>
      `;

      res.set('Content-Type', 'text/html');
      res.send(Buffer.from(htmlString));
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
