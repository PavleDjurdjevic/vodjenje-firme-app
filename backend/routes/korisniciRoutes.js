const express = require('express');
const router = express.Router();
const korisniciController = require('../controllers/korisniciController');

router.get('/', korisniciController.getAll);
router.get('/:id', korisniciController.getById);
router.post('/', korisniciController.create);
router.put('/:id', korisniciController.update);
router.delete('/:id', korisniciController.delete);
router.post('/login', korisniciController.login);

module.exports = router;
