const { Router } = require('express');
const { Shark } = require('../models/Shark');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const allSharks = await Shark.getAll();
      res.json(allSharks);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      console.log('controller', req.body);
      const sharkData = await Shark.insert(req.body);
      res.json(sharkData);
    } catch (e) {
      next(e);
    }
  });
