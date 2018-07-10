// User routes. Contains route definitions relative to api/users.

const express = require('express');
const userController = require('../../controllers/user.controller');
const router = express.Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.put('/', userController.updateUser);
router.delete('/:id', userController.deleteUser);


module.exports = router;