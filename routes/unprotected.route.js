const express = require('express');
const unprotectedController = require('../controllers/unprotected.controller');
const router = express.Router();

router.post('/register', unprotectedController.registerUser);
router.post('/login', unprotectedController.login);


module.exports = router;