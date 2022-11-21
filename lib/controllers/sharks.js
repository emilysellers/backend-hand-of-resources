const { Router } = require('express');
const { Shark } = require('../models/Shark');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    console.log('controller', req.body);
    const sharkData = await Shark.insert(req.body);
    res.json(sharkData);
  } catch (e) {
    next(e);
  }
});
