// File routes. Contains route definitions relative to api/files.

const express = require('express');
const router = express.Router();
const fileController = require('../../controllers/file.controller');


router.post('/articleImages', fileController.uploadImage);
router.delete('/articleImages/:articleId/:fileName', fileController.deleteImage);



module.exports = router;