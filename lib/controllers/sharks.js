const { Router } = require('express');
const { Shark } = require('../models/Shark');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const oneShark = await Shark.getById(req.params.id);
      if (!oneShark) {
        next();
      }
      res.json(oneShark);
    } catch (e) {
      next(e);
    }
  })

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
      const sharkData = await Shark.insert(req.body);
      res.json(sharkData);
    } catch (e) {
      next(e);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const updatedShark = await Shark.updateById(req.params.id, req.body);
      res.json(updatedShark);
    } catch (e) {
      next(e);
    }
  });
