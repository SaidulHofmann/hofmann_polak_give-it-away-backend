// Article service. Contains CRUD operations and business logic functions.

const mongoose = require('mongoose');
const Article = new require('../models/article.model');

// Save the context of this module.
_this = this;


exports.getArticles = async function (jsonParams) {
    const unfiltered = new RegExp('.*');
    try {
        let query = {
            name:       jsonParams.name ? jsonParams.name : unfiltered,
            category:   jsonParams.category ?   jsonParams.category !== 'undefined' ? jsonParams.category : unfiltered    : unfiltered,
            status:     jsonParams.status ?   jsonParams.status !== 'undefined' ? jsonParams.status : unfiltered    : unfiltered,
            tags:       jsonParams.tags ? new RegExp(jsonParams.tags, 'i') : unfiltered
        };
        let options = {
            page:       jsonParams.page ? +jsonParams.page : 1,
            limit:      jsonParams.limit ? +jsonParams.limit : 10,
            sort:       jsonParams.sort ?    jsonParams.sort !== 'undefined' ? jsonParams.sort : {}    : {},
            populate:   Article.populateAllOptions
        };
        let articles = await Article.paginate(query, options);
        return articles;
    } catch (ex) {
        throw Error('Error while paginating articles. ' + ex.message);
    }
};

exports.getArticleById = async function (id) {
    try {
        let foundArticle = await Article.findById(id).populateAll();
        if (!foundArticle) { return false; }
        return foundArticle;
    } catch (ex) {
        throw Error("Error occured while retrieving the article. " + ex.message);
    }
};

/**
 * Creates an article entry in the database.
 * @param jsonArticle: Article object, partial or complete, in json format.
 * @returns {Promise<*>}
 */
exports.createArticle = async function (jsonArticle) {
    try {
        let newArticle = new Article(jsonArticle);
        if(!newArticle._id) { newArticle._id = mongoose.Types.ObjectId(); }
        let savedArticle = await newArticle.save();
        return Article.findById(savedArticle._id).populateAll();
    } catch (ex) {
        throw Error("Error while creating article. " + ex.message);
    }
};

/**
 * Uodates an existing article.
 * @param jsonArticle : Article object, partial or complete, in json format.
 * @returns {Promise<*>}
 */
exports.updateArticle = async function (jsonArticle) {
    let oldArticle = null;
    try {
        oldArticle = await Article.findById(jsonArticle._id).populateAll();
        if (!oldArticle) { throw Error("Article could not be found."); }
    } catch (ex) {
        throw Error("Error occured while retrieving the article. " + ex.message);
    }
    try {
        Object.assign(oldArticle, jsonArticle);
        let savedArticle = await oldArticle.save();
        return savedArticle;
    } catch (ex) {
        throw Error("An error occured while updating the article. " + ex.message);
    }
};

exports.deleteArticle = async function (id) {
    let article = null;
    try {
        article = await Article.findById(id).populateAll();
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

exports.createInitialDbEntries = async function () {
    try {
        // Article 1
        await this.createArticle(new Article({
            _id:                "5a9e4e65bdd7751e5033123f",
            name:               "Motorrad 1",
            description:        "Yamaha 1000ccm",
            handover:           "Abholung durch den Kunden.",
            pictureOverview:    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Yamaha_img_2227.jpg/1200px-Yamaha_img_2227.jpg",
            pictures:           [
                "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Yamaha_img_2227.jpg/1200px-Yamaha_img_2227.jpg",
                "http://www.motorcyclespecs.co.za/Gallery%20%20A/Yamaha%20XS650B%2075%20%201.jpg",
                "http://nippon-classic.de/wp-content/uploads/2015/07/Yamaha_XS650_1970-1978_0018_YME1-1024x812.jpg",
                "http://nippon-classic.de/wp-content/uploads/2015/07/Yamaha_XS650_1970-1978_0019_YME.jpg",
                "https://i.ytimg.com/vi/51h-ESZqIKg/maxresdefault.jpg"
                                ],
            videos:             [],
            tags:               "Motorrad, Yamaha, Yamaha 1000ccm",
            donationDate:       null,

            publisher:          '5abc0267d608821850991037',
            donee:              null,
            category:           "mobility",
            status:             "available"
        }));

        // Article 2
        await this.createArticle(new Article({
            _id:                "5a9e4e65bdd7751e50331240",
            name:               "Motorrad 2",
            description:        "Yamaha 2000ccm",
            handover:           "Abholung durch den Kunden.",
            pictureOverview:    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Yamaha_img_2227.jpg/1200px-Yamaha_img_2227.jpg",
            pictures:           [
                "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Yamaha_img_2227.jpg/1200px-Yamaha_img_2227.jpg",
                "http://www.motorcyclespecs.co.za/Gallery%20%20A/Yamaha%20XS650B%2075%20%201.jpg",
                "http://nippon-classic.de/wp-content/uploads/2015/07/Yamaha_XS650_1970-1978_0018_YME1-1024x812.jpg",
                "http://nippon-classic.de/wp-content/uploads/2015/07/Yamaha_XS650_1970-1978_0019_YME.jpg",
                "https://i.ytimg.com/vi/51h-ESZqIKg/maxresdefault.jpg"
            ],
            videos:             [],
            tags:               "Motorrad, Yamaha, Yamaha 2000ccm",
            donationDate:       null,

            publisher:          '5abc0267d608821850991037',
            donee:              '',
            category:           "mobility",
            status:             "available"
        }));

        // Article 3
        await this.createArticle(new Article({
            _id:                "5a9e4e65bdd7751e50331241",
            name:               "Motorrad 3",
            description:        "Yamaha 3000ccm",
            handover:           "Abholung durch den Kunden.",
            pictureOverview:    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Yamaha_img_2227.jpg/1200px-Yamaha_img_2227.jpg",
            pictures:           [
                "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Yamaha_img_2227.jpg/1200px-Yamaha_img_2227.jpg",
                "http://www.motorcyclespecs.co.za/Gallery%20%20A/Yamaha%20XS650B%2075%20%201.jpg",
                "http://nippon-classic.de/wp-content/uploads/2015/07/Yamaha_XS650_1970-1978_0018_YME1-1024x812.jpg",
                "http://nippon-classic.de/wp-content/uploads/2015/07/Yamaha_XS650_1970-1978_0019_YME.jpg",
                "https://i.ytimg.com/vi/51h-ESZqIKg/maxresdefault.jpg"
            ],
            videos:             [],
            tags:               "Motorrad, Yamaha, Yamaha 3000",
            donationDate:       null,

            publisher:          '5abc0267d608821850991037',
            donee:              '',
            category:           "mobility",
            status:             "available"
        }));

        // Article 4
        await this.createArticle(new Article({
            _id:                "5a9e4e65bdd7751e50331242",
            name:               "Motorrad 4",
            description:        "Yamaha 4000ccm",
            handover:           "Abholung durch den Kunden.",
            pictureOverview:    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Yamaha_img_2227.jpg/1200px-Yamaha_img_2227.jpg",
            pictures:           [
                "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Yamaha_img_2227.jpg/1200px-Yamaha_img_2227.jpg",
                "http://www.motorcyclespecs.co.za/Gallery%20%20A/Yamaha%20XS650B%2075%20%201.jpg",
                "http://nippon-classic.de/wp-content/uploads/2015/07/Yamaha_XS650_1970-1978_0018_YME1-1024x812.jpg",
                "http://nippon-classic.de/wp-content/uploads/2015/07/Yamaha_XS650_1970-1978_0019_YME.jpg",
                "https://i.ytimg.com/vi/51h-ESZqIKg/maxresdefault.jpg"
            ],
            videos:             [],
            tags:               "Motorrad, Yamaha, Yamaha 4000ccm",
            donationDate:       null,

            publisher:          '5abc0267d608821850991038',
            donee:              '',
            category:           "mobility",
            status:             "available"
        }));

        // Article 5
        await this.createArticle(new Article({
            _id:                "5a9e4e65bdd7751e50331243",
            name:               "Motorrad 5",
            description:        "Yamaha 5000ccm",
            handover:           "Abholung durch den Kunden.",
            pictureOverview:    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Yamaha_img_2227.jpg/1200px-Yamaha_img_2227.jpg",
            pictures:           [
                "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Yamaha_img_2227.jpg/1200px-Yamaha_img_2227.jpg",
                "http://www.motorcyclespecs.co.za/Gallery%20%20A/Yamaha%20XS650B%2075%20%201.jpg",
                "http://nippon-classic.de/wp-content/uploads/2015/07/Yamaha_XS650_1970-1978_0018_YME1-1024x812.jpg",
                "http://nippon-classic.de/wp-content/uploads/2015/07/Yamaha_XS650_1970-1978_0019_YME.jpg",
                "https://i.ytimg.com/vi/51h-ESZqIKg/maxresdefault.jpg"
            ],
            videos:             [],
            tags:               "Motorrad, Yamaha, Yamaha 5000ccm",
            donationDate:       null,

            publisher:          '5abc0267d608821850991038',
            donee:              '',
            category:           "mobility",
            status:             "available"
        }));

        console.log("Article entries created successfully.");
    } catch(ex) {
        throw Error("Error while creating initial entries for article collection. " + ex.message);
    }
};