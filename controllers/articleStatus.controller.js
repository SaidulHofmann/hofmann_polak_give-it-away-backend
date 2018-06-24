// Article status controller. Handles article status api requests.

const ArticleStatusService = require('../services/articleStatus.service');
const customErrors = require('../core/errors.core.js');
const ArgumentError = customErrors.ArgumentError;

// Save the context of this module.
_this = this;


exports.getArticleStatus = async function (req, res, next) {
    try {
        let page = req.query.page ? req.query.page : 1;
        let limit = req.query.limit ? req.query.limit : 10;

        let articleStatus = await ArticleStatusService.getArticleStatus({}, page, limit);
        return res.status(200).json({status: 200, data: articleStatus, message: 'Die Artikel-Status Einträge wurden erfolgreich geladen.'});
    } catch (ex) {
        return res.status(ex.status || 400).json({status: ex.status || 400, name: ex.name, message: 'Die Artikel-Status Einträge konnten nicht geladen werden. ' + ex.message});
    }
};

exports.getArticleStatusById = async function (req, res, next) {
    try {
        let id = req.params.id;
        if (!id) {
            throw new ArgumentError('Beim Laden des Artikel-Status Eintrags muss die Artikel Id angegeben werden.');
        }
        let foundArticleStatus = await ArticleStatusService.getArticleStatusById(id);
        if (!foundArticleStatus) {
            throw new ArgumentError(`Der Artikel-Status Eintrag mit der Id '${id}' wurde nicht gefunden.`, 404);
        }
        return res.status(200).json({status: 200, data: foundArticleStatus, message: 'Der Artikel-Status Eintrag wurde erfolgreich geladen.'});
    } catch (ex) {
        return res.status(ex.status || 400).json({status: ex.status || 400, name: ex.name, message: 'Der Artikel-Status Eintrag konnte nicht geladen werden. ' + ex.message});
    }
};