// Article routes - routes relative to api/articles.

const express = require('express');
const router = express.Router();

const articleController = require('../controller/articleController');
const Article = require('../models/Article');


router.get('/:id', articleController.showArticle);
router.get('/', articleController.getArticles);
router.post('/', articleController.createArticle);
router.put('/:id', articleController.updateArticle) ;
router.delete('/:id', articleController.deleteArticle);



module.exports = router;