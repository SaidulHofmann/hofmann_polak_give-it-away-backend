/* Article service. Contains CRUD operations and business logic functions. */

const Article = require('../models/article.model');

// Save the context of this module.
_this = this;


exports.getArticles = async function (query, page, limit) {
    try {
        // Options setup for the mongoose paginate.
        let options = {page, limit};
        let articles = await Article.paginate(query, options);
        return articles;
    } catch (ex) {
        throw Error('Error while paginating articles. ' + ex.message);
    }
};

exports.getArticleById = async function (id) {
    try {
        let foundArticle = await Article.findById(id);
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

exports.createInitialEntries = async function () {
    try {

        // Article 1
        this.createArticle(new Article({
            _id:                "5a9dbe131a63712088173dcd",
            name:               "Motorrad 1",
            description:        "Yamaha 1000ccm",
            pictureOverview:    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Yamaha_img_2227.jpg/1200px-Yamaha_img_2227.jpg",
            pictures:           [
                "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Yamaha_img_2227.jpg/1200px-Yamaha_img_2227.jpg",
                "http://www.motorcyclespecs.co.za/Gallery%20%20A/Yamaha%20XS650B%2075%20%201.jpg",
                "http://nippon-classic.de/wp-content/uploads/2015/07/Yamaha_XS650_1970-1978_0018_YME1-1024x812.jpg",
                "http://nippon-classic.de/wp-content/uploads/2015/07/Yamaha_XS650_1970-1978_0019_YME.jpg",
                "https://i.ytimg.com/vi/51h-ESZqIKg/maxresdefault.jpg"
                                ],
            videos:             [],
            handover:           "Abholung durch den Kunden.",
            donationDate:       null,
            searchwords:        ["Motorrad", "Yamaha", "Yamaha 650"],
            //userIdPublisher:    '',
            //userIdDonee:        '',
            articleCategoryId:  "mobility",
            articleStatusId:    "available"
        }));

        // Article 2
        this.createArticle(new Article({
            _id:                "5a9dbe131a63712088173dce",
            name:               "Motorrad 2",
            description:        "Yamaha 2000ccm",
            pictureOverview:    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Yamaha_img_2227.jpg/1200px-Yamaha_img_2227.jpg",
            pictures:           [
                "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Yamaha_img_2227.jpg/1200px-Yamaha_img_2227.jpg",
                "http://www.motorcyclespecs.co.za/Gallery%20%20A/Yamaha%20XS650B%2075%20%201.jpg",
                "http://nippon-classic.de/wp-content/uploads/2015/07/Yamaha_XS650_1970-1978_0018_YME1-1024x812.jpg",
                "http://nippon-classic.de/wp-content/uploads/2015/07/Yamaha_XS650_1970-1978_0019_YME.jpg",
                "https://i.ytimg.com/vi/51h-ESZqIKg/maxresdefault.jpg"
            ],
            videos:             [],
            handover:           "Abholung durch den Kunden.",
            donationDate:       null,
            searchwords:        ["Motorrad", "Yamaha", "Yamaha 650"],
            //userIdPublisher:    '',
            //userIdDonee:        '',
            articleCategoryId:  "mobility",
            articleStatusId:    "available"
        }));

        // Article 3
        this.createArticle(new Article({
            _id:                "5a9dbe131a63712088173dcf",
            name:               "Motorrad 3",
            description:        "Yamaha 3000ccm",
            pictureOverview:    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Yamaha_img_2227.jpg/1200px-Yamaha_img_2227.jpg",
            pictures:           [
                "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Yamaha_img_2227.jpg/1200px-Yamaha_img_2227.jpg",
                "http://www.motorcyclespecs.co.za/Gallery%20%20A/Yamaha%20XS650B%2075%20%201.jpg",
                "http://nippon-classic.de/wp-content/uploads/2015/07/Yamaha_XS650_1970-1978_0018_YME1-1024x812.jpg",
                "http://nippon-classic.de/wp-content/uploads/2015/07/Yamaha_XS650_1970-1978_0019_YME.jpg",
                "https://i.ytimg.com/vi/51h-ESZqIKg/maxresdefault.jpg"
            ],
            videos:             [],
            handover:           "Abholung durch den Kunden.",
            donationDate:       null,
            searchwords:        ["Motorrad", "Yamaha", "Yamaha 650"],
            //userIdPublisher:    '',
            //userIdDonee:        '',
            articleCategoryId:  "mobility",
            articleStatusId:    "available"
        }));

        // Article 4
        this.createArticle(new Article({
            _id:                "5a9dbe131a63712088173dd0",
            name:               "Motorrad 4",
            description:        "Yamaha 4000ccm",
            pictureOverview:    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Yamaha_img_2227.jpg/1200px-Yamaha_img_2227.jpg",
            pictures:           [
                "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Yamaha_img_2227.jpg/1200px-Yamaha_img_2227.jpg",
                "http://www.motorcyclespecs.co.za/Gallery%20%20A/Yamaha%20XS650B%2075%20%201.jpg",
                "http://nippon-classic.de/wp-content/uploads/2015/07/Yamaha_XS650_1970-1978_0018_YME1-1024x812.jpg",
                "http://nippon-classic.de/wp-content/uploads/2015/07/Yamaha_XS650_1970-1978_0019_YME.jpg",
                "https://i.ytimg.com/vi/51h-ESZqIKg/maxresdefault.jpg"
            ],
            videos:             [],
            handover:           "Abholung durch den Kunden.",
            donationDate:       null,
            searchwords:        ["Motorrad", "Yamaha", "Yamaha 650"],
            //userIdPublisher:    '',
            //userIdDonee:        '',
            articleCategoryId:  "mobility",
            articleStatusId:    "available"
        }));

        // Article 5
        this.createArticle(new Article({
            _id:                "5a9dbe131a63712088173dd1",
            name:               "Motorrad 5",
            description:        "Yamaha 5000ccm",
            pictureOverview:    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Yamaha_img_2227.jpg/1200px-Yamaha_img_2227.jpg",
            pictures:           [
                "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Yamaha_img_2227.jpg/1200px-Yamaha_img_2227.jpg",
                "http://www.motorcyclespecs.co.za/Gallery%20%20A/Yamaha%20XS650B%2075%20%201.jpg",
                "http://nippon-classic.de/wp-content/uploads/2015/07/Yamaha_XS650_1970-1978_0018_YME1-1024x812.jpg",
                "http://nippon-classic.de/wp-content/uploads/2015/07/Yamaha_XS650_1970-1978_0019_YME.jpg",
                "https://i.ytimg.com/vi/51h-ESZqIKg/maxresdefault.jpg"
            ],
            videos:             [],
            handover:           "Abholung durch den Kunden.",
            donationDate:       null,
            searchwords:        ["Motorrad", "Yamaha", "Yamaha 650"],
            //userIdPublisher:    '',
            //userIdDonee:        '',
            articleCategoryId:  "mobility",
            articleStatusId:    "available"
        }));

        console.log("Article entries created successfully.");
    } catch(ex) {
        throw Error("Error while creating initial values for article. " + ex.message);
    }
};