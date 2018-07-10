/* Article status service. Contains CRUD operations and business logic functions. */

const ArticleStatus = new require('../models/articleStatus.model');
const customErrors = require('../core/errors.core.js');
const ArgumentError = customErrors.ArgumentError;

// Save the context of this module.
_this = this;


exports.getArticleStatus = async function (query, page, limit) {
    let options = {page, limit};
    return ArticleStatus.paginate(query, options);
};

exports.getArticleStatusById = async function (id) {
    let foundArticleStatus = await ArticleStatus.findById(id);
    if (!foundArticleStatus) { return false; }
    return foundArticleStatus;
};

exports.createArticleStatus = async function (jsonArticleStatus) {
    let newArticleStatus = new ArticleStatus(jsonArticleStatus);
    return newArticleStatus.save();
};

exports.updateArticleStatus = async function (jsonArticleStatus) {
    let oldArticleStatus = await ArticleStatus.findById(jsonArticleStatus._id);
    if (!oldArticleStatus) { throw ArgumentError(`Der Artikel Status mit der Id '${jsonArticleStatus._id}' wurde nicht gefunden.`); }

    Object.assign(oldArticleStatus, jsonArticleStatus);
    return oldArticleStatus.save();
};

exports.deleteArticleStatus = async function (id) {
    let articleStatus = await ArticleStatus.findById(id);
    if (!articleStatus) { throw ArgumentError(`Der Artikel Status mit der Id '${id}' wurde nicht gefunden.`); }
    return articleStatus.remove();
};

exports.createInitialDbEntries = async function () {
    try {
        await this.createArticleStatus({_id: 'available', name: 'Artikel verfügbar'});
        await this.createArticleStatus({_id: 'handoverPending', name: 'Übergabe pendent'});
        await this.createArticleStatus({_id: 'donated', name: 'Artikel verschenkt'});

        console.log('Die initialen Datenbank-Einträge für die Collection ArticleStatus wurden erfolgreich erstellt.');
    } catch(ex) {
        throw Error('Fehler bei der Erstellung der initialen Datenbank-Einträge für die Collection ArticleStatus:\n' + ex.stack);
    }
};
