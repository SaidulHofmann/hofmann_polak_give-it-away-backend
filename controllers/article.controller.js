// Article controller. Handles article api requests.

const ArticleService = require('../services/article.service');
const helper = require('../utils/helper');
const customErrors = require('../core/errors.core.js');
const ArgumentError = customErrors.ArgumentError;

// Save the context of this module.
_this = this;


exports.getArticles = async function (req, res) {
    try {
        let articles = await ArticleService.getArticles(helper.getUserId(req), req.query);
        return res.status(200).json({status: 200, data: articles, message: 'Die Artikel wurden erfolgreich geladen.'});
    } catch (ex) {
        return res.status(ex.status || 400).json({status: ex.status || 400, name: ex.name, message: 'Die Artikel konnten nicht geladen werden. ' + ex.message});
    }
};

exports.getArticleById = async function (req, res) {
    try {
        let userId = helper.getUserId(req);
        let articleId = req.params.id;
        let includeUsersReservation = JSON.parse(req.query.includeUsersReservation);

        if (!articleId) {
            throw new ArgumentError('Beim Laden des Artikels muss die Artikel Id angegeben werden.');
        }
        let foundArticle = await ArticleService.getArticleById(userId, articleId, includeUsersReservation);
        if (!foundArticle) {
            throw new ArgumentError(`Der Artikel mit der Id '${articleId}' wurde nicht gefunden.`, 404);
        }
        return res.status(200).json({status: 200, data: foundArticle, message: 'Der Artikel wurde erfolgreich geladen.'});
    } catch (ex) {
        return res.status(ex.status || 400).json({status: ex.status || 400, name: ex.name, message: 'Der Artikel konnte nicht geladen werden. ' + ex.message});
    }
};

exports.createArticle = async function (req, res) {
    try {
        let createdArticle = await ArticleService.createArticle(req.body);
        return res.status(201).json({status: 201, data: createdArticle, message: 'Der Artikel wurde erfolgreich erfasst.'});
    } catch (ex) {
        return res.status(ex.status || 400).json({status: ex.status || 400, name: ex.name, message: 'Der Artikel-Eintrag konnte nicht erstellt werden. ' +ex.message});
    }
};

exports.updateArticle = async function (req, res) {
    try {
        if (!req.body._id) {
            throw new ArgumentError('Bei der Aktualisierung eines Artikels muss die Artikel Id angegeben werden.');
        }
        let updatedArticle = await ArticleService.updateArticle(req.body);
        return res.status(200).json({status: 200, data: updatedArticle, message: 'Der Artikel wurde erfolgreich aktualisiert.'});
    } catch (ex) {
        return res.status(ex.status || 400).json({status: ex.status || 400, name: ex.name, message: 'Der Artikel konnte nicht aktualisiert werden. ' + ex.message});
    }
};

exports.deleteArticle = async function (req, res) {
    try {
        let id = req.params.id;
        if (!id) {
            throw new ArgumentError('Beim Entfernen eines Artikels muss die Artikel Id angegeben werden.');
        }
        let deletedArticle = await ArticleService.deleteArticle(id);
        return res.status(200).json({status: 200, data: deletedArticle, message: `Der Artikel mit der Id '${id}' wurde erfolgreich entfernt.`});
    } catch (ex) {
        return res.status(ex.status || 400).json({status: ex.status || 400, name: ex.name, message: 'Beim Entfernen des Artikels ist ein Fehler aufgetreten: ' + ex.message});
    }
};
