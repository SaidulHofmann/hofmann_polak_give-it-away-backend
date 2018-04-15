const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserById);
router.post('/register', userController.createUser);
router.post('/login', userController.login);


module.exports = router;