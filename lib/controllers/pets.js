const { Router } = require('express');
const { Pet } = require('../models/Pet');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const pet = await Pet.insert(req.body);
      res.json(pet);
    } catch (e) {
      next(e);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const allPets = await Pet.getAll();
      res.json(allPets);
    } catch (e) {
      next(e);
    }
  });
