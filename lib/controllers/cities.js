const { Router } = require('express');
const { City } = require('../models/City');
const pool = require('../utils/pool.js');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const city = await City.insert(req.body);
    res.json(city);
  } catch (e) {
    next(e);
  }
});
