const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

//router.post("/login", function (req, res) {
//    userController.login(req, res);
//});


router.post('/', userController.createUser);


module.exports = router;