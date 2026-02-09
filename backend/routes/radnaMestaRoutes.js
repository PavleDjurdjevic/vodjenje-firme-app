const express = require('express');
const router = express.Router();
const radnaMestaController = require('../controllers/radnaMestaController');

router.get('/', radnaMestaController.getAll);
router.get('/:id', radnaMestaController.getById);
router.post('/', radnaMestaController.create);
router.put('/:id', radnaMestaController.update);
router.delete('/:id', radnaMestaController.delete);

module.exports = router;
