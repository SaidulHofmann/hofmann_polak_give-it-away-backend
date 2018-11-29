// Article service. Contains CRUD operations and business logic functions.

const mongoose = require('mongoose');
const Article = new require('../models/article.model');
const Reservation = new require('../models/reservation.model');
const userInfo = require('../utils/helper');
const customErrors = require('../core/errors.core.js');
const ArgumentError = customErrors.ArgumentError;
const FileService = require('../services/file.service');

// Save the context of this module.
_this = this;


exports.getArticles = async function (userId, jsonParams) {
    let includeUsersReservation = jsonParams.includeUsersReservation ? JSON.parse(jsonParams.includeUsersReservation): false;
    let selectReservedArticles = jsonParams.selectReservedArticles ? JSON.parse(jsonParams.selectReservedArticles): false;
    let selectPublishedArticles = jsonParams.selectPublishedArticles ? JSON.parse(jsonParams.selectPublishedArticles): false;

    let query = {};
    if (jsonParams.name) { query.name = jsonParams.name };
    if (jsonParams.category && jsonParams.category !== 'undefined') { query.category = jsonParams.category };
    if (jsonParams.status && jsonParams.status !== 'undefined') { query.status = jsonParams.status };
    if (jsonParams.tags) { query.$text = { $search: jsonParams.tags} };
    if (selectPublishedArticles) { query.publisher = userId };

    let options = {};
    options.page = jsonParams.page ? +jsonParams.page: 1;
    options.limit = jsonParams.limit ? +jsonParams.limit: 10;
    if (jsonParams.sort && jsonParams.sort !== 'undefined') { options.sort = jsonParams.sort };
    options.populate = Article.populateAllOptions;

    if (selectReservedArticles) {
        let reservedArticlesIds = await Reservation.find({user: userId}).distinct('article');
        query._id = { $in: reservedArticlesIds };
    }
    let articlesResponse = await Article.paginate(query, options);
    if (includeUsersReservation) {
        await this.includeReservationsToArray(userId, articlesResponse.docs);
    }
    return articlesResponse;
};

exports.getArticleById = async function (userId, articleId, includeUsersReservation) {
    let foundArticle = await Article.findById(articleId).populateAll();
    if (!foundArticle) { return false; }
    if(includeUsersReservation) {
        await this.includeReservation(userId, foundArticle);
    }
    return foundArticle;
};

/**
 * Adds reservation to articles. Needed client side when displaying articles.
 */
exports.includeReservationsToArray = async function (userId, articleArray) {
    try{
        for( let article of articleArray) {
            await this.includeReservation(userId, article);
        }
    } catch (ex) {
        throw Error('Fehler bei der Zuweisung von Reservationen zu Artikeln. ' + ex.message);
    }
};

exports.includeReservation = async function (userId, article) {
    let reservation = await Reservation.findByUserIdAndArticleId(userId, article._id);
    if(reservation) {
        article.usersReservation = reservation;
        article.userHasReservation = true;
    } else {
        article.usersReservation = null;
        article.userHasReservation = false;
    }
};

exports.createArticle = async function (jsonArticle) {
    let newArticle = new Article(jsonArticle);
    if(!newArticle._id) { newArticle._id = mongoose.Types.ObjectId(); }
    let savedArticle = await newArticle.save();
    return Article.findById(savedArticle._id).populateAll();
};

exports.updateArticle = async function (jsonArticle) {
    let oldArticle = await Article.findById(jsonArticle._id).populateAll();
    if (!oldArticle) { throw ArgumentError(`Der Artikel mit der Id '${jsonArticle._id}' wurde nicht gefunden.`); }

    Object.assign(oldArticle, jsonArticle);
    return oldArticle.save();
};

exports.deleteArticle = async function (articleId) {
    let article = await Article.findById(articleId).populateAll();
    if (!article) { throw ArgumentError(`Der Artikel mit der Id '${articleId}' wurde nicht gefunden.`); }
    let deletedArticle = await article.remove();
    await FileService.deleteArticleImageFolder(articleId);
    return deletedArticle;
};

exports.createInitialDbEntries = async function () {
    try {
        // Article 1
        await this.createArticle(new Article({
            _id:                "5a9e4e65bdd7751e5033123f",
            name:               "Motorrad 1",
            description:        "Yamaha 1000ccm",
            handover:           "Abholung durch den Kunden.",
            overviewImage:    "Yamaha_img_2227.jpg",
            additionalImages:           [
                "Yamaha_img_2227.jpg",
                "Yamaha_XS650B_75_1.jpg",
                "Yamaha_XS650_1970-1978_0018_YME1-1024x812.jpg",
                "Yamaha_XS650_1970-1978_0019_YME.jpg",
                "Yamaha-XS650.jpg"
                                ],
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
            overviewImage:    "Yamaha_img_2227.jpg",
            additionalImages:           [
                "Yamaha_img_2227.jpg",
                "Yamaha_XS650B_75_1.jpg",
                "Yamaha_XS650_1970-1978_0018_YME1-1024x812.jpg",
                "Yamaha_XS650_1970-1978_0019_YME.jpg",
                "Yamaha-XS650.jpg"
            ],
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
            overviewImage:    "Yamaha_img_2227.jpg",
            additionalImages:           [
                "Yamaha_img_2227.jpg",
                "Yamaha_XS650B_75_1.jpg",
                "Yamaha_XS650_1970-1978_0018_YME1-1024x812.jpg",
                "Yamaha_XS650_1970-1978_0019_YME.jpg",
                "Yamaha-XS650.jpg"
            ],
            tags:               "Motorrad, Yamaha, Yamaha 3000",
            donationDate:       null,

            publisher:          '5abc0267d608821850991038',
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
            overviewImage:    "Yamaha_img_2227.jpg",
            additionalImages:           [
                "Yamaha_img_2227.jpg",
                "Yamaha_XS650B_75_1.jpg",
                "Yamaha_XS650_1970-1978_0018_YME1-1024x812.jpg",
                "Yamaha_XS650_1970-1978_0019_YME.jpg",
                "Yamaha-XS650.jpg"
            ],
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
            overviewImage:    "Yamaha_img_2227.jpg",
            additionalImages:           [
                "Yamaha_img_2227.jpg",
                "Yamaha_XS650B_75_1.jpg",
                "Yamaha_XS650_1970-1978_0018_YME1-1024x812.jpg",
                "Yamaha_XS650_1970-1978_0019_YME.jpg",
                "Yamaha-XS650.jpg"
            ],
            tags:               "Motorrad, Yamaha, Yamaha 5000ccm",
            donationDate:       null,

            publisher:          '5abc0267d608821850991038',
            donee:              '',
            category:           "mobility",
            status:             "available"
        }));

        console.log('Die initialen Datenbank-Einträge für die Collection Article wurden erfolgreich erstellt.');
    } catch(ex) {
        throw Error('Fehler bei der Erstellung der initialen Datenbank-Einträge für die Collection Article:\n' + ex.stack);
    }
};