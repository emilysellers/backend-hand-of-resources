const { Router } = require('express');
const { City } = require('../models/City');
const pool = require('../utils/pool.js');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const city = await City.insert(req.body);
      res.json(city);
    } catch (e) {
      next(e);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const oneCity = await City.getById(req.params.id);
      if (!oneCity) {
        next();
      }
      res.json(oneCity);
    } catch (e) {
      next(e);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const allCities = await City.getAll();
      res.json(allCities);
    } catch (e) {
      next(e);
    }
  });
