const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

//router.post("/login", function (req, res) {
//    userController.login(req, res);
//});

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);


module.exports = router;