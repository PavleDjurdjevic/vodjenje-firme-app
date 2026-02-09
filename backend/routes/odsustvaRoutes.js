const express = require('express');
const router = express.Router();
const odsustvaController = require('../controllers/odsustvaController');

router.get('/', odsustvaController.getAll);

// NOVO: /api/odsustva/moja?email=...
router.get('/moja', odsustvaController.getByEmail);

router.get('/:id', odsustvaController.getById);
router.post('/', odsustvaController.create);
router.put('/:id', odsustvaController.update);
router.delete('/:id', odsustvaController.delete);

module.exports = router;

