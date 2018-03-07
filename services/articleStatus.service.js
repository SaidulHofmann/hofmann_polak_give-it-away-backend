/* Article status service. Contains CRUD operations and business logic functions. */

const ArticleStatus = require('../models/articleStatus.model');

// Save the context of this module.
_this = this;


exports.getArticleStatus = async function (query, page, limit) {
    try {
        // Options setup for the mongoose paginate.
        let options = {page, limit};
        let articlesStatus = await ArticleStatus.paginate(query, options);
        return articlesStatus;
    } catch (ex) {
        throw Error('Error while paginating article status. ' + ex.message);
    }
};

exports.getArticleStatusById = async function (id) {
    try {
        let foundArticleStatus = await ArticleStatus.findById(id);
        if (!foundArticleStatus) { return false; }
        return foundArticleStatus;
    } catch (ex) {
        throw Error("Error occured while retrieving the article status entry. " + ex.message);
    }
};

/**
 * Creates an articleStatus entry in the database.
 * @param jsonArticleStatus: ArticleStatus object, partial or complete, in json format.
 * @returns {Promise<*>}
 */
exports.createArticleStatus = async function (jsonArticleStatus) {
    try {
        let newArticleStatus = new Article(jsonArticleStatus);
        let savedArticleStatus = await newArticleStatus.save();
        return savedArticleStatus;
    } catch (ex) {
        throw Error("Error while creating article status entry. " + ex.message);
    }
};

/**
 * Uodates an existing article status.
 * @param params : ArticleStatus object, partial or complete, in json format.
 * @returns {Promise<*>}
 */
exports.updateArticleStatus = async function (jsonArticleStatus) {
    let oldArticleStatus = null;
    try {
        oldArticleStatus = await ArticleStatus.findById(jsonArticleStatus._id);
        if (!oldArticleStatus) { throw Error("ArticleStatus entry could not be found."); }
    } catch (ex) {
        throw Error("Error occured while retrieving the article status entry. " + ex.message);
    }
    try {
        Object.assign(oldArticleStatus, jsonArticleStatus);
        let savedArticleStatus = await oldArticleStatus.save();
        return savedArticleStatus;
    } catch (ex) {
        throw Error("An error occured while updating the article status entry. " + ex.message);
    }
};

exports.deleteArticleStatus = async function (id) {
    let articleStatus = null;
    try {
        articleStatus = await ArticleStatus.findById(id);
        if (!articleStatus) { throw Error("Article status entry could not be found."); }
    } catch (ex) {
        throw Error("Error occured while retrieving the article status entry. " + ex.message);
    }
    try {
        let deletedArticleStatus = await articleStatus.remove();
        return deletedArticleStatus;
    } catch (ex) {
        throw Error("Error occured while deleting the article status entry. " + ex.message);
    }
};

exports.createInitialEntries = async function () {
    try {
        await this.createArticleStatus({_id: 'available', name: 'Verfügbar'});
        await this.createArticleStatus({_id: 'handoverPending', name: 'Übergabe pendent'});
        await this.createArticleStatus({_id: 'donated', name: 'Verschenkt'});

        console.log("ArticleStatus entries created successfully.");
    } catch(ex) {
        throw Error("Error while creating initial values for article status. " + ex.message);
    }
};
