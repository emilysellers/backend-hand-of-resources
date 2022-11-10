const { Router } = require('express');
const { Color } = require('../models/Color');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    console.log('controller', req.body);
    const colorData = await Color.insert(req.body);
    res.json(colorData);
    console.log(colorData);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});
