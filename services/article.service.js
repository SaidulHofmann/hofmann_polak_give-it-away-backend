// Article service. Contains CRUD operations and business logic functions.

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
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
            "_id" : ObjectId("5a9e4e65bdd7751e5033123f"),
            "name" : "Motorrad  Yamaha 1000ccm",
            "description" : "Motorrad Yamaha 1000ccm zu verschenken.\nEs ist bereits 10 Jahre alt, unfallfrei und hat 60'000 km auf dem Zähler. \n\nNennen Sie mir einen guten Grund, weshalb ich als grosszügiger Mensch Ihnen dieses Motorrad verschenken soll.",
            "handover" : "Abholung durch den Kunden.",
            "overviewImage" : "Yamaha_img_2227.jpg",
            "additionalImages" : [
                "Yamaha_img_2227.jpg",
                "Yamaha_XS650B_75_1.jpg",
                "Yamaha_XS650_1970-1978_0018_YME1-1024x812.jpg",
                "Yamaha_XS650_1970-1978_0019_YME.jpg",
                "Yamaha-XS650.jpg"
            ],
            "tags" : "Motorrad, Yamaha, Yamaha 1000ccm",
            "donationDate" : null,
            "publisher" : ObjectId("5abc0267d608821850991037"),
            "donee" : null,
            "category" : "mobility",
            "status" : "available"
        }));

        // Article 2
        await this.createArticle(new Article({
            "_id" : ObjectId("5c11625d029f1e1b6895d560"),
            "name" : "Rasenmäher mit Elektromotor",
            "description" : "Moderner Elektro-Rasenmäher zu verkaufen. Mit vollgeladenem Akku kann für die Dauer von 2h gemäht werden. Mähqualität entspricht englischem Rasen.\nZu verschenken wegen Umstellung des Gartens auf Biotop.",
            "handover" : "Kann bei Interesse abgeholt werden.\nKontakt: fm@fm.com (Felix Muster).",
            "overviewImage" : "rasenmaeher-01.jpg",
            "additionalImages" : [
                "rasenmaeher-02.jpg",
                "rasenmaeher-03.jpg",
                "rasenmaeher-04.jpg"
            ],
            "tags" : "Rasenmäher Elektro rot",
            "donationDate" : null,
            "publisher" : ObjectId("5abc0267d608821850991038"),
            "donee" : ObjectId("5abc0267d608821850991037"),
            "category" : "garden",
            "status" : "handoverPending"
        }));

        // Article 3
        await this.createArticle(new Article({
            "_id" : ObjectId("5c1166bb029f1e1b6895d561"),
            "name" : "Handy Samsung S7 Edge",
            "description" : "Samsung S7 Edge Handy zu verschenken wegen Wechsel auf neueres Modell.\nBedingung: Nennen Sie mir einen überzeugenden Grund, weshalb ich das Handy Ihnen schenken soll.",
            "handover" : "Kann nach Termin-Vereinbarung bei mir abgeholt werden.\nKontakt: fm@fm.com.(Felix Meier).",
            "overviewImage" : "Samsung-S7-Edge-03.jpg",
            "additionalImages" : [
                "Samsung-S7-Edge-01.jpg",
                "Samsung-S7-Edge-02.jpg",
                "Samsung-S7-Edge-04.jpg"
            ],
            "tags" : "Handy Telefon Samsung S7 Edge",
            "donationDate" : null,
            "publisher" : ObjectId("5abc0267d608821850991038"),
            "donee" : null,
            "category" : "electronics",
            "status" : "available"
        }));

        // Article 4
        await this.createArticle(new Article({
            "_id" : ObjectId("5c116c8d029f1e1b6895d562"),
            "name" : "Expander für Fitness-Übungen",
            "description" : "Expander für Fitness-Übungen und zur Kräftigung der Arme zu verschenken. Machen Sie sich Fit für die Herausforderungen des Alltags !",
            "handover" : "Kann bei mir abgeholt werden.\nKontakt: fm@fm.com (Felix Meier).",
            "overviewImage" : "Fitness-Expander-01.jpg",
            "additionalImages" : [],
            "tags" : "Expander Fitness Training",
            "donationDate" : null,
            "publisher" : ObjectId("5abc0267d608821850991038"),
            "donee" : null,
            "category" : "health",
            "status" : "available"
        }));

        // Article 5
        await this.createArticle(new Article({
            "_id" : ObjectId("5c1170a2029f1e1b6895d563"),
            "name" : "Mountain Bike",
            "description" : "Mountain Bike zu verschenken. Es ist 5 Jahre alt, aber in gutem Zustand.Man kommt von jedem Berg runter damit.",
            "handover" : "Kann bei mir abgeholt werden.\nKontakt: fm@fm.com (Felix Muster).",
            "overviewImage" : "Bike01.jpg",
            "additionalImages" : [
                "Bike02.jpg",
                "Bike03.jpg"
            ],
            "tags" : "Mountain Bike Freizeit Sport",
            "donationDate" : null,
            "publisher" : ObjectId("5abc0267d608821850991038"),
            "donee" : null,
            "category" : "mobility",
            "status" : "available"
        }));

        // Article 6
        await this.createArticle(new Article({
            "_id" : ObjectId("5c117523029f1e1b6895d564"),
            "name" : "Tennisschläger",
            "description" : "Profi-Tennisschläger zu verschenken. Habe diesen von Roger Federer geschenkt erhalten.",
            "handover" : "Kann bei mir abgeholt werden.\nKontakt: fm@fm.com (Felix Muster).",
            "overviewImage" : "Tennisschlaeger01.jpg",
            "additionalImages" : [],
            "tags" : "Tennisschläger Sport",
            "donationDate" : null,
            "publisher" : ObjectId("5abc0267d608821850991038"),
            "donee" : ObjectId("5abc0267d608821850991037"),
            "category" : "leisure",
            "status" : "donated"
        }));

        // Article 7
        await this.createArticle(new Article({
            "_id" : ObjectId("5c117d1a029f1e1b6895d565"),
            "name" : "Garten Grill",
            "description" : "Garten Grill zu verschenken wegen Umzug.\nKann für 5 bis 10 Personen eingesetzt werden.\nIst 3 Jahre alt und im guten Zustand.",
            "handover" : "Bei Interesse bei mir abholen.\nKontakt: hm@hm.com (Hans Muster).",
            "overviewImage" : "Grill-01.jpg",
            "additionalImages" : [
                "Grill-02.jpg",
                "Grill-03.jpg"
            ],
            "tags" : "Garten Grill Party Fleisch Ernährung",
            "donationDate" : null,
            "publisher" : ObjectId("5abc0267d608821850991037"),
            "donee" : null,
            "category" : "nutrition",
            "status" : "available"
        }));

        // Article 8
        await this.createArticle(new Article({
            "_id" : ObjectId("5c11832c029f1e1b6895d566"),
            "name" : "2er Sofa Ikea",
            "description" : "Ikea 2er Sofa, stylish und modern zu verschenken wegen Umzug.\nEs ist sehr bequem, erst 1 Jahr alt und in sehr gutem Zustand.",
            "handover" : "Das Sofa kann bei mir abgeholt werden. Den Transport bitte selber organisieren.\nKontakt: hm@hm.com (Hans Muster).",
            "overviewImage" : "Sofa-01.jpg",
            "additionalImages" : [
                "Sofa-02.jpg",
                "Sofa-03.jpg"
            ],
            "tags" : "2er Sofa Ikea bequem",
            "donationDate" : null,
            "publisher" : ObjectId("5abc0267d608821850991037"),
            "donee" : null,
            "category" : "household",
            "status" : "available"
        }));

        // Article 9
        await this.createArticle(new Article({
            "_id" : ObjectId("5c127507962ca914fcbbb86f"),
            "name" : "Staubsauger",
            "description" : "Staubsauger zu verschenken.\nMit diesem Teil macht das Staubsaugen echt Spass !\n\nEs ist 2 Jahre alt und in einem guten Zustand.\nWir brauchen einen grösseren Staubsauger für die neue Wohnung.",
            "handover" : "Der Staubsauger kann nach vorheriger Terminvereinbarung abgeholt werden.\nKontakt: hm@hm.com (Hans Muster).",
            "overviewImage" : "Staubsauger01.jpg",
            "additionalImages" : [
                "Staubsauger02.jpg"
            ],
            "tags" : "Staubsauger reinigen Spass",
            "donationDate" : null,
            "publisher" : ObjectId("5abc0267d608821850991037"),
            "donee" : null,
            "category" : "household",
            "status" : "available"
        }));

        // Article 10
        await this.createArticle(new Article({
            "_id" : ObjectId("5c129e55962ca914fcbbb870"),
            "name" : "Skateboard",
            "description" : "Cooles Skateboard zu verschenken. Wer will kann es haben, ich brauche es nicht mehr.",
            "handover" : "Kann bei mir abgeholt werden.\nKontakt: hm@hm.com (Hans Meier):",
            "overviewImage" : "Skateboard01.jpg",
            "additionalImages" : [],
            "tags" : "Skateboard Freizeit Sport",
            "donationDate" : null,
            "publisher" : ObjectId("5abc0267d608821850991037"),
            "donee" : null,
            "category" : "leisure",
            "status" : "available"
        }));

        console.log('Die initialen Datenbank-Einträge für die Collection Article wurden erfolgreich erstellt.');
    } catch(ex) {
        throw Error('Fehler bei der Erstellung der initialen Datenbank-Einträge für die Collection Article:\n' + ex.stack);
    }
};