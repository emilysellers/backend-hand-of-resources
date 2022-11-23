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

  .get('/', async (req, res, next) => {
    try {
      const parks = await Park.getAll();
      res.json(parks);
    } catch (e) {
      next(e);
    }
  });
