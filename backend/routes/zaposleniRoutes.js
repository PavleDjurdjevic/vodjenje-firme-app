const express = require('express');
const router = express.Router();
const zaposleniController = require('../controllers/zaposleniController');

// Sve rute za zaposlene
router.get('/', zaposleniController.getAll);
router.get('/:id',zaposleniController.getById);
router.post('/', zaposleniController.create);
router.put('/:id', zaposleniController.update);
router.delete('/:id', zaposleniController.delete);

module.exports = router;
