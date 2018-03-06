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
 * @param articleStatus: new mongoose articleStatus object.
 * @returns {Promise<*>}
 */
exports.createArticleStatus = async function (articleStatus) {
    try {
        let savedArticleStatus = await articleStatus.save();
        return savedArticleStatus;
    } catch (ex) {
        throw Error("Error while creating article status entry. " + ex.message);
    }
};

/**
 * Uodates an existing article status.
 * @param id : the id of the object to update.
 * @param params : http request body or json object.
 * @returns {Promise<*>}
 * @remark : An articleStatus object cannot be used as input parameter
 * to update the old articleStatus object because of save conflict in mongoose.
 */
exports.updateArticleStatus = async function (id, params) {
    let oldArticleStatus = null;
    try {
        oldArticleStatus = await ArticleStatus.findById(id);
        if (!oldArticleStatus) { throw Error("ArticleStatus entry could not be found."); }
    } catch (ex) {
        throw Error("Error occured while retrieving the article status entry. " + ex.message);
    }
    try {
        Object.assign(oldArticleStatus, params);
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
        await this.createArticleStatus(new ArticleStatus({_id: 'available', name: 'Verfügbar'}));
        await this.createArticleStatus(new ArticleStatus({_id: 'handoverPending', name: 'Übergabe pendent'}));
        await this.createArticleStatus(new ArticleStatus({_id: 'donated', name: 'Verschenkt'}));

        console.log("ArticleStatus entries created successfully.");
    } catch(ex) {
        throw Error("Error while creating initial values for article status. " + ex.message);
    }
};
