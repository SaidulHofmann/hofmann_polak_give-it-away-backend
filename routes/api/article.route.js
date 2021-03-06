// Article routes. Contains route definitions relative to api/articles.

const express = require('express');
const router = express.Router();
const articleController = require('../../controllers/article.controller');


router.get('/', articleController.getArticles);
router.get('/:id', articleController.getArticleById);
router.post('/', articleController.createArticle);
router.put('/', articleController.updateArticle) ;
router.delete('/:id', articleController.deleteArticle);



module.exports = router;