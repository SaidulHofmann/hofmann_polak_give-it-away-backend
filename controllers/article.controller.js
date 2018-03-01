/* Article controller. Handles article api requests. */

const ArticleService = require('../services/article.service');
const Article = require('../models/article.model');

// Save the context of this module.
_this = this;


exports.getArticles = async function (req, res, next) {
    try {
        // Check the existence of the query parameters. If they don't exist, assign a default value.
        let page = req.query.page ? req.query.page : 1;
        let limit = req.query.limit ? req.query.limit : 10;
        let articles = await ArticleService.getArticles({}, page, limit);
        return res.status(200).json({status: 200, data: articles, message: "Articles received successfully."});
    } catch (ex) {
        return res.status(400).json({status: 400, message: ex.message});
    }
};

exports.getArticleById = async function (req, res, next) {
    try {
        let id = req.params.id;
        if (!id) {
            return res.status(400).json({status: 400, message: "Id must be present."});
        }
        let foundArticle = await ArticleService.getArticleById(id);
        if (!foundArticle) {
            return res.status(404).json({status: 404, message: "Article could not be found."});
        }
        return res.status(200).json({status: 200, data: foundArticle, message: "Article received successfully."});
    } catch (ex) {
        return res.status(400).json({status: 400, message: ex.message});
    }
};

exports.createArticle = async function (req, res, next) {
    try {
        // Req.Body contains the form submit values.
        let article = new Article(req.body);
        let createdArticle = await ArticleService.createArticle(article);
        return res.status(201).json({status: 201, data: createdArticle, message: "Article created successfully."});
    } catch (ex) {
        return res.status(400).json({status: 400, message: "Article could not be created."});
    }
};

exports.updateArticle = async function (req, res, next) {
    try {
        let id = req.params.id;
        if (!id) {
            return res.status(400).json({status: 400, message: "Id must be present."});
        }
        let updatedArticle = await ArticleService.updateArticle(id, req.body);
        return res.status(200).json({status: 200, data: updatedArticle, message: "Article updated successfully."});
    } catch (ex) {
        return res.status(400).json({status: 400, message: ex.message});
    }
};

exports.deleteArticle = async function (req, res, next) {
    try {
        let id = req.params.id;
        if (!id) {
            return res.status(400).json({status: 400, message: "Id must be present."});
        }
        let deletedArticle = await ArticleService.deleteArticle(id);
        return res.status(200).json({status: 204, data: deletedArticle, message: "Article deleted successfully."});
    } catch (ex) {
        return res.status(400).json({status: 400, message: ex.message});
    }
};
