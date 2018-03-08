// Article category routes. Contains route definitons relative to api/articleCategories.

const express = require('express');
const router = express.Router();
const articleCategoryController = require('../../controllers/articleCategory.controller');


router.get('/', articleCategoryController.getArticleCategories);
router.get('/:id', articleCategoryController.getArticleCategoryById);




module.exports = router;