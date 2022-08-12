const functions = require('firebase-functions');
const axios = require('axios');
const path = require('path');

const isBot = req => {
  const botList = [
    'facebookexternalhit', // facebook
    'Twitterbot', // twitter
    'kakaotalk-scrap', // kakaoTalk
    'Slackbot-LinkExpanding', // slack
    'Yeti', // naver
    'Googlebot' // google
  ];

  const userAgent = req.headers['user-agent'];

  return !!botList.find(bot => {
    const regExp = new RegExp(`${bot}`, 'i');
    return !!userAgent.match(regExp);
  });
};

const goToCSR = async (req, res) => {
  const host =
    req.hostname === 'localhost'
      ? 'http://localhost:3000'
      : `https://${req.hostname}`;

  try {
    const fetch = await axios.get(`${host}/app.html`);
    res.set('Content-Type', 'text/html');
    return res.send(Buffer.from(fetch.data));
  } catch (err) {
    functions.logger.error(err);
    return res.sendFile('app.html', {
      root: path.join(__dirname, '../')
    });
  }
};

module.exports = { isBot, goToCSR };
