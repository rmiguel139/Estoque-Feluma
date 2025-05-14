const express = require('express')
const router = express.Router();
const patrimonioController = require('../controllers/patrimonioController');


router.get('/', patrimonioController.listar);
router.post('/', patrimonioController.criar);

module.exports = router;