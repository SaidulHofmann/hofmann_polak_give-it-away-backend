// Article status routes. Contains route definitons relative to api/articleStatus.

const express = require('express');
const router = express.Router();
const articleStatusController = require('../../controllers/articleStatus.controller');


router.get('/', articleStatusController.getArticleStatus);
router.get('/:id', articleStatusController.getArticleStatusById);




module.exports = router;