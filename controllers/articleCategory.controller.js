// Article category controller. Handles article category api requests.

const ArticleCategoryService = require('../services/articleCategory.service');

// Save the context of this module.
_this = this;


exports.getArticleCategories = async function (req, res, next) {
    try {
        // Check the existence of the query parameters. If they don't exist, assign a default value.
        let page = req.query.page ? req.query.page : 1;
        let limit = req.query.limit ? req.query.limit : 10;

        let articleCategories = await ArticleCategoryService.getArticleCategories({}, page, limit);
        return res.status(200).json({status: 200, data: articleCategories, message: "Article categories received successfully."});
    } catch (ex) {
        return res.status(400).json({status: 400, message: ex.message});
    }
};

exports.getArticleCategoryById = async function (req, res, next) {
    try {
        let id = req.params.id;
        if (!id) {
            return res.status(400).json({status: 400, message: "Id must be present."});
        }
        let foundArticleCategory = await ArticleCategoryService.getArticleCategoryById(id);
        if (!foundArticleCategory) {
            return res.status(404).json({status: 404, message: "Article category could not be found."});
        }
        return res.status(200).json({status: 200, data: foundArticleCategory, message: "Article category received successfully."});
    } catch (ex) {
        return res.status(400).json({status: 400, message: ex.message});
    }
};