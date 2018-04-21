/* Article category service. Contains CRUD operations and business logic functions. */

const ArticleCategory = new require('../models/articleCategory.model');

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
 * @param jsonArticleCategory: ArticleCategory object, partial or complete, in json format.
 * @returns {Promise<*>}
 */
exports.createArticleCategory = async function (jsonArticleCategory) {
    try {
        let newArticleCategory = new ArticleCategory(jsonArticleCategory);
        let savedArticleCategory= await newArticleCategory.save();
        return savedArticleCategory;
    } catch (ex) {
        throw Error("Error while creating article category entry. " + ex.message);
    }
};

/**
 * Uodates an existing article category.
 * @param jsonArticleCategory : ArticleCategory object, partial or complete, in json format.
 * @returns {Promise<*>}
 */
exports.updateArticleCategory = async function (jsonArticleCategory) {
    let oldArticleCategory = null;
    try {
        oldArticleCategory = await ArticleCategory.findById(jsonArticleCategory._id);
        if (!oldArticleCategory) { throw Error("Article category entry could not be found."); }
    } catch (ex) {
        throw Error("Error occured while retrieving the article category entry. " + ex.message);
    }
    try {
        Object.assign(oldArticleCategory, jsonArticleCategory);
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

        console.log("ArticleCategory entries created successfully.");
    } catch(ex) {
        throw Error("Error while creating initial entries for article category. " + ex.message);
    }
};
