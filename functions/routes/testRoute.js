/* eslint-disable new-cap */
const functions = require('firebase-functions');
const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    // TODO: 현재는 test용 api 사용 중, SEO를 위한 API 존재 시, 해당 부분 수정 필요
    const fetchData = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather?q=seoul&appid=14c53da014666d422b72401e3a84d27c'
    );
    return res.render('test', {
      name: fetchData.data.name,
      main: fetchData.data.main
    });
  } catch (err) {
    functions.logger.error(err);
    next();
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    // TODO: 현재는 test용 api 사용 중, SEO를 위한 API 존재 시, 해당 부분 수정 필요
    const fetchData = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather?q=seoul&appid=14c53da014666d422b72401e3a84d27c'
    );

    return res.render('test_id', {
      id: req.params.id,
      name: fetchData.data.name
    });
  } catch (err) {
    functions.logger.error(err);
    next();
  }
});

module.exports = router;
