/* Reservation service. Contains CRUD operations and business logic functions. */

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
            _id: '5aa04b1ac63b9823b81e4780',
            article: '5a9e4e65bdd7751e5033123f',
            user: '5abc0267d608821850991038',
            commentPublisher: '',
            commentApplicant: 'Ich brauche das Motorrad für den Arbeitsweg.'
        });

        // Reservation 2
        await this.createReservation({
            _id: '5aa04b1bc63b9823b81e4781',
            article: '5a9e4e65bdd7751e50331240',
            user: '5abc0267d608821850991038',
            commentPublisher: '',
            commentApplicant: 'Ich bin ein Fan von Yamaha Motorräder.'
        });

        // Reservation 3
        await this.createReservation({
            _id: '5aa04b1bc63b9823b81e4782',
            article: '5a9e4e65bdd7751e50331241',
            user: '5abc0267d608821850991037',
            commentPublisher: 'Motorrad fahren ist nicht wirklich anstrengend. Es gibt bessere Aktivitäten um körperlich fit zu bleiben.',
            commentApplicant: 'Ich brauche Ausgleich zu meinem Büro Job.'
        });

        console.log('Die initialen Datenbank-Einträge für die Collection Reservation wurden erfolgreich erstellt.');
    } catch(ex) {
        throw Error('Fehler bei der Erstellung der initialen Datenbank-Einträge für die Collection Reservation:\n' + ex.stack);
    }
};

