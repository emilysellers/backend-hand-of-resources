const { Router } = require('express');
const { Park } = require('../models/Park');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const newPark = await Park.insert(req.body);
      res.json(newPark);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const park = await Park.getById(req.params.id);
      if (!park) {
        next();
      }
      res.json(park);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const parks = await Park.getAll();
      res.json(parks);
    } catch (e) {
      next(e);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const updatedPark = await Park.updateById(req.params.id, req.body);
      res.json(updatedPark);
    } catch (e) {
      next(e);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const park = await Park.deleteById(req.params.id);
      res.json(park);
    } catch (e) {
      next(e);
    }
  });
