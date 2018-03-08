// Article status controller. Handles article status api requests.

const ArticleStatusService = require('../services/articleStatus.service');

// Save the context of this module.
_this = this;


exports.getArticleStatus = async function (req, res, next) {
    try {
        // Check the existence of the query parameters. If they don't exist, assign a default value.
        let page = req.query.page ? req.query.page : 1;
        let limit = req.query.limit ? req.query.limit : 10;

        let articleStatus = await ArticleStatusService.getArticleStatus({}, page, limit);
        return res.status(200).json({status: 200, data: articleStatus, message: "Article status entries received successfully."});
    } catch (ex) {
        return res.status(400).json({status: 400, message: ex.message});
    }
};

exports.getArticleStatusById = async function (req, res, next) {
    try {
        let id = req.params.id;
        if (!id) {
            return res.status(400).json({status: 400, message: "Id must be present."});
        }
        let foundArticleStatus = await ArticleStatusService.getArticleStatusById(id);
        if (!foundArticleStatus) {
            return res.status(404).json({status: 404, message: "Article status entry could not be found."});
        }
        return res.status(200).json({status: 200, data: foundArticleStatus, message: "Article status entry received successfully."});
    } catch (ex) {
        return res.status(400).json({status: 400, message: ex.message});
    }
};