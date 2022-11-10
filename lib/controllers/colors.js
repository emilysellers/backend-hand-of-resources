const { Router } = require('express');
const { Color } = require('../models/Color');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const allColors = await Color.getAll();
      res.json(allColors);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const colorData = await Color.insert(req.body);
      res.json(colorData);
    } catch (e) {
      next(e);
    }
  });
