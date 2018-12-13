/* Reservation service. Contains CRUD operations and business logic functions. */

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Reservation = new require('../models/reservation.model');
const customErrors = require('../core/errors.core.js');
const ArgumentError = customErrors.ArgumentError;

// Save the context of this module.
_this = this;


exports.getReservations = async function (jsonParams) {
    let query = {};
    if(jsonParams.userId) { query.user = jsonParams.userId }
    if(jsonParams.articleId) { query.article = jsonParams.articleId }

    let options = {
        page:       jsonParams.page ? +jsonParams.page : 1,
        limit:      jsonParams.limit ? +jsonParams.limit : 10,
        sort:       jsonParams.sort ?    jsonParams.sort : {},
        populate:   Reservation.populateAllOptions
    };
    return Reservation.paginate(query, options);
};

exports.getReservationById = async function (id) {
    let foundReservation = await Reservation.findById(id).populateAll();
    if (!foundReservation) { return false; }
    return foundReservation;
};

exports.createReservation = async function (jsonReservation) {
    let newReservation = new Reservation(jsonReservation);
    let savedReservation = await newReservation.save();
    return Reservation.findById(savedReservation._id).populateAll();
};

exports.updateReservation = async function (jsonReservation) {
    let oldReservation = await Reservation.findById(jsonReservation._id).populateAll();
    if (!oldReservation) { throw ArgumentError(`Die Reservation mit der Id '${jsonReservation._id}' wurde nicht gefunden.`); }

    Object.assign(oldReservation, jsonReservation);
    return oldReservation.save();
};

exports.deleteReservation = async function (id) {
    let reservation = await Reservation.findById(id).populateAll();
    if (!reservation) { throw ArgumentError(`Die Reservation mit der Id '${id}' wurde nicht gefunden.`); }
    return reservation.remove();
};

exports.createInitialDbEntries = async function () {
    try {
        // Reservation 1
        await this.createReservation({
            "_id" : ObjectId("5c12c0db962ca914fcbbb871"),
            "article" : ObjectId("5c11832c029f1e1b6895d566"),
            "user" : ObjectId("5abc0267d608821850991038"),
            "commentPublisher" : "",
            "commentApplicant" : ""
        });

        // Reservation 2
        await this.createReservation({
            "_id" : ObjectId("5c12c14a962ca914fcbbb872"),
            "article" : ObjectId("5c1170a2029f1e1b6895d563"),
            "user" : ObjectId("5abc0267d608821850991037"),
            "commentPublisher" : "",
            "commentApplicant" : "Ich sollte mich als Büromensch mehr bewegen und so  mithelfen, zukünftig die Krankenkassengebühren tief zu halten. "
        });

        // Reservation 3
        await this.createReservation({
            "_id" : ObjectId("5c12c2f3962ca914fcbbb873"),
            "article" : ObjectId("5c11625d029f1e1b6895d560"),
            "user" : ObjectId("5abc0267d608821850991037"),
            "commentPublisher" : "Ok, Sie können diesen Rasenmäher bei mir abholen.\nKontaktieren Sie mich vorher für die Terminvereinbarung.",
            "commentApplicant" : "Das ist genau das, was mir noch fehlt. Ich habe bald einen Urwald im Garten, wenn ich mir keinen Rasenmäher zulege."
        });

        // Reservation 4
        await this.createReservation({
            "_id" : ObjectId("5c12c7bc962ca914fcbbb874"),
            "article" : ObjectId("5c117523029f1e1b6895d564"),
            "user" : ObjectId("5abc0267d608821850991037"),
            "commentPublisher" : "",
            "commentApplicant" : "Mein Tennisschläger ist defekt und als passionierter Tennisspieler wäre ein Profi-Modell, das für Roger Federer gut genug ist, für mich genau das Richtige !"
        });

        console.log('Die initialen Datenbank-Einträge für die Collection Reservation wurden erfolgreich erstellt.');
    } catch(ex) {
        throw Error('Fehler bei der Erstellung der initialen Datenbank-Einträge für die Collection Reservation:\n' + ex.stack);
    }
};

