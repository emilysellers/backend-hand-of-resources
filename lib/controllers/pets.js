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

  .get('/:id', async (req, res, next) => {
    try {
      const onePet = await Pet.getById(req.params.id);
      res.json(onePet);
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
  })

  .put('/:id', async (req, res, next) => {
    try {
      const pet = await Pet.updateById(req.params.id, req.body);
      res.json(pet);
    } catch (e) {
      next(e);
    }
  });
