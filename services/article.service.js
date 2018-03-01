/* Article service. Contains CRUD operations and business logic functions. */

const Article = require('../models/article.model');

// Save the context of this module.
_this = this;


exports.getArticles = async function (query, page, limit) {
    // Options setup for the mongoose paginate.
    let options = {page, limit};
    try {
        let articles = await Article.paginate(query, options);
        return articles;
    } catch (ex) {
        throw Error('Error while paginating articles. ' + ex.message);
    }
};

exports.getArticleById = async function (id) {
    let foundArticle = null;
    try {
        foundArticle = await Article.findById(id);
        if (!foundArticle) { return false; }
        return foundArticle;
    } catch (ex) {
        throw Error("Error occured while retrieving the article. " + ex.message);
    }
};

/**
 * Creates an article entry in the database.
 * @param article: new mongoose article object.
 * @returns {Promise<*>}
 */
exports.createArticle = async function (article) {
    try {
        let savedArticle = await article.save();
        return savedArticle;
    } catch (ex) {
        throw Error("Error while creating article. " + ex.message);
    }
};

/**
 * Uodates an existing article.
 * @param id : the id of the object to update.
 * @param params : http request body or json object.
 * @returns {Promise<*>}
 * @remark : An article object cannot be used as input parameter
 * to update the old article object because of save conflict in mongoose.
 */
exports.updateArticle = async function (id, params) {
    let oldArticle = null;
    try {
        oldArticle = await Article.findById(id);
        if (!oldArticle) { throw Error("Article could not be found."); }
    } catch (ex) {
        throw Error("Error occured while retrieving the article. " + ex.message);
    }
    try {
        Object.assign(oldArticle, params);
        let savedArticle = await oldArticle.save();
        return savedArticle;
    } catch (ex) {
        throw Error("An error occured while updating the article. " + ex.message);
    }
};

exports.deleteArticle = async function (id) {
    let article = null;
    try {
        article = await Article.findById(id);
        if (!article) { throw Error("Article could not be found."); }
    } catch (ex) {
        throw Error("Error occured while retrieving the article. " + ex.message);
    }
    try {
        let deletedArticle = await article.remove();
        return deletedArticle;
    } catch (ex) {
        throw Error("Error occured while deleting the article. " + ex.message);
    }
};
