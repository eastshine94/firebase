/* eslint-disable new-cap */
const functions = require('firebase-functions');
const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const fetchData = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather?q=seoul&appid=14c53da014666d422b72401e3a84d27c'
    );
    return res.render('home', { name: fetchData.data.name });
  } catch (err) {
    functions.logger.error(err);
    next();
  }
});

module.exports = router;
