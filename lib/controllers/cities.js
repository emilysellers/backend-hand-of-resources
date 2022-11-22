const { Router } = require('express');
const { City } = require('../models/City');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const city = await City.insert(req.body);
      res.json(city);
    } catch (e) {
      next(e);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const updateCity = await City.updateById(req.params.id, req.body);
      res.json(updateCity);
    } catch (e) {
      next(e);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const cityData = await City.delete(req.params.id);
      res.json(cityData);
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
