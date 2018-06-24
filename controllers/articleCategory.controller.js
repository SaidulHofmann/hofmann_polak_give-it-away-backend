// Article category controller. Handles article category api requests.

const ArticleCategoryService = require('../services/articleCategory.service');
const customErrors = require('../core/errors.core.js');
const ArgumentError = customErrors.ArgumentError;

// Save the context of this module.
_this = this;


exports.getArticleCategories = async function (req, res, next) {
    try {
        let page = req.query.page ? req.query.page : 1;
        let limit = req.query.limit ? req.query.limit : 10;

        let articleCategories = await ArticleCategoryService.getArticleCategories({}, page, limit);
        return res.status(200).json({status: 200, data: articleCategories, message: 'Die Artikel Kategorien wurden erfolgreich geladen.'});
    } catch (ex) {
        return res.status(ex.status || 400).json({status: ex.status || 400, name: ex.name, message: 'Die Artikel Kategorien konnten nicht geladen werden. ' + ex.message});
    }
};

exports.getArticleCategoryById = async function (req, res, next) {
    try {
        let id = req.params.id;
        if (!id) {
            throw new ArgumentError('Beim Laden der Artikel Kategorie muss die Id angegeben werden.');
        }
        let foundArticleCategory = await ArticleCategoryService.getArticleCategoryById(id);
        if (!foundArticleCategory) {
            throw new ArgumentError(`Die Artikel Kategorie mit der Id '${id}' wurde nicht gefunden.`, 404);
        }
        return res.status(200).json({status: 200, data: foundArticleCategory, message: 'Die Artikel Kategorie wurde erfolgreich geladen.'});
    } catch (ex) {
        return res.status(ex.status || 400).json({status: ex.status || 400, name: ex.name, message: 'Die Artikel Kategorie konnte nicht geladen werden. ' + ex.message});
    }
};