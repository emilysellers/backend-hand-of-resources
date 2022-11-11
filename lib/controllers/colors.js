const { Router } = require('express');
const { Color } = require('../models/Color');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const color = await Color.getById(req.params.id);
      res.json(color);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const allColors = await Color.getAll();
      res.json(allColors);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const data = await Color.updateById(req.params.id, req.body);
      console.log('controller data', data);
      res.json(data);
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
