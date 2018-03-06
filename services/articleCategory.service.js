/* Article category service. Contains CRUD operations and business logic functions. */

const ArticleCategory = require('../models/articleCategory.model');

// Save the context of this module.
_this = this;


exports.getArticleCategories = async function (query, page, limit) {
    try {
        // Options setup for the mongoose paginate.
        let options = {page, limit};
        let articlesCategories = await ArticleCategory.paginate(query, options);
        return articlesCategories;
    } catch (ex) {
        throw Error('Error while paginating article categories. ' + ex.message);
    }
};

exports.getArticleCategoryById = async function (id) {
    try {
        let foundArticleCategory = await ArticleCategory.findById(id);
        if (!foundArticleCategory) { return false; }
        return foundArticleCategory;
    } catch (ex) {
        throw Error("Error occured while retrieving the article category entry. " + ex.message);
    }
};

/**
 * Creates an articleCategory entry in the database.
 * @param articleCategory: new mongoose articleCategory object.
 * @returns {Promise<*>}
 */
exports.createArticleCategory = async function (articleCategory) {
    try {
        let savedArticleCategory= await articleCategory.save();
        return savedArticleCategory;
    } catch (ex) {
        throw Error("Error while creating article category entry. " + ex.message);
    }
};

/**
 * Uodates an existing article category.
 * @param id : the id of the object to update.
 * @param params : http request body or json object.
 * @returns {Promise<*>}
 * @remark : An articleCategory object cannot be used as input parameter
 * to update the old articleCategory object because of save conflict in mongoose.
 */
exports.updateArticleCategory = async function (id, params) {
    let oldArticleCategory = null;
    try {
        oldArticleCategory = await ArticleCategory.findById(id);
        if (!oldArticleCategory) { throw Error("Article category entry could not be found."); }
    } catch (ex) {
        throw Error("Error occured while retrieving the article category entry. " + ex.message);
    }
    try {
        Object.assign(oldArticleCategory, params);
        let savedArticleCategory = await oldArticleCategory.save();
        return savedArticleCategory;
    } catch (ex) {
        throw Error("An error occured while updating the article category entry. " + ex.message);
    }
};

exports.deleteArticleCategory = async function (id) {
    let articleCategory = null;
    try {
        articleCategory = await ArticleCategory.findById(id);
        if (!articleCategory) { throw Error("Article category entry could not be found."); }
    } catch (ex) {
        throw Error("Error occured while retrieving the article category entry. " + ex.message);
    }
    try {
        let deletedArticleCategory = await articleCategory.remove();
        return deletedArticleCategory;
    } catch (ex) {
        throw Error("Error occured while deleting the article category entry. " + ex.message);
    }
};

exports.createInitialEntries = async function () {
    try {
        await this.createArticleCategory(new ArticleCategory({_id: 'household', name: 'Haushalt'}));
        await this.createArticleCategory(new ArticleCategory({_id: 'garden', name: 'Garten '}));
        await this.createArticleCategory(new ArticleCategory({_id: 'mobility', name: 'Mobilität'}));
        await this.createArticleCategory(new ArticleCategory({_id: 'hygiene', name: 'Hygiene'}));
        await this.createArticleCategory(new ArticleCategory({_id: 'nutrition', name: 'Ernährung'}));
        await this.createArticleCategory(new ArticleCategory({_id: 'health', name: 'Gesundheit'}));
        await this.createArticleCategory(new ArticleCategory({_id: 'office', name: 'Bürobedarf'}));
        await this.createArticleCategory(new ArticleCategory({_id: 'leisure', name: 'Freizeit'}));
        await this.createArticleCategory(new ArticleCategory({_id: 'electronics', name: 'Elektronik'}));
        await this.createArticleCategory(new ArticleCategory({_id: 'others', name: 'Sonstiges'}));

        console.log("ArticleCategory entries created successfully.");
    } catch(ex) {
        throw Error("Error while creating initial values for article category. " + ex.message);
    }
};
