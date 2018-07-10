// Article category service. Contains CRUD operations and business logic functions.

const ArticleCategory = new require('../models/articleCategory.model');
const customErrors = require('../core/errors.core.js');
const ArgumentError = customErrors.ArgumentError;

// Save the context of this module.
_this = this;


exports.getArticleCategories = async function (query, page, limit) {
    let options = {page, limit};
    return ArticleCategory.paginate(query, options);
};

exports.getArticleCategoryById = async function (id) {
    let foundArticleCategory = await ArticleCategory.findById(id);
    if (!foundArticleCategory) { return false; }
    return foundArticleCategory;
};

exports.createArticleCategory = async function (jsonArticleCategory) {
    let newArticleCategory = new ArticleCategory(jsonArticleCategory);
    return newArticleCategory.save();
};

exports.updateArticleCategory = async function (jsonArticleCategory) {
    let oldArticleCategory = await ArticleCategory.findById(jsonArticleCategory._id);
    if (!oldArticleCategory) { throw ArgumentError(`Die Artikel Kategorie mit der Id '${jsonArticleCategory._id}' wurde nicht gefunden.`); }

    Object.assign(oldArticleCategory, jsonArticleCategory);
    return oldArticleCategory.save();
};

exports.deleteArticleCategory = async function (id) {
    let articleCategory = await ArticleCategory.findById(id);
    if (!articleCategory) { throw ArgumentError(`Die Artikel Kategorie mit der Id '${id}' wurde nicht gefunden.`); }
    return articleCategory.remove();
};

exports.createInitialDbEntries = async function () {
    try {
        await this.createArticleCategory({_id: 'others', name: 'Sonstiges'});
        await this.createArticleCategory({_id: 'household', name: 'Haushalt'});
        await this.createArticleCategory({_id: 'garden', name: 'Garten '});
        await this.createArticleCategory({_id: 'mobility', name: 'Mobilität'});
        await this.createArticleCategory({_id: 'hygiene', name: 'Hygiene'});
        await this.createArticleCategory({_id: 'nutrition', name: 'Ernährung'});
        await this.createArticleCategory({_id: 'health', name: 'Gesundheit'});
        await this.createArticleCategory({_id: 'office', name: 'Bürobedarf'});
        await this.createArticleCategory({_id: 'leisure', name: 'Freizeit'});
        await this.createArticleCategory({_id: 'electronics', name: 'Elektronik'});

        console.log('Die initialen Datenbank-Einträge für die Collection ArticleCategory wurden erfolgreich erstellt.');
    } catch(ex) {
        throw Error('Fehler bei der Erstellung der initialen Datenbank-Einträge für die Collection ArticleCategory:\n' + ex.stack);
    }
};
