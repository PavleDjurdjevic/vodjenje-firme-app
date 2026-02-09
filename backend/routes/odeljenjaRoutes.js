const express = require('express');
const router = express.Router();
const odeljenjaController = require('../controllers/odeljenjaController');

router.get('/', odeljenjaController.getAll);
router.get('/:id', odeljenjaController.getById);
router.post('/', odeljenjaController.create);
router.put('/:id', odeljenjaController.update);
router.delete('/:id', odeljenjaController.delete);

module.exports = router;
