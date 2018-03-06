/* Reservation service. Contains CRUD operations and business logic functions. */

const Reservation = require('../models/reservation.model');

// Save the context of this module.
_this = this;


exports.getReservations = async function (query, page, limit) {
    try {
        // Options setup for the mongoose paginate.
        let options = {page, limit};
        let reservations = await Reservation.paginate(query, options);
        return reservations;
    } catch (ex) {
        throw Error('Error while paginating reservations. ' + ex.message);
    }
};

exports.getReservationById = async function (id) {
    try {
        let foundReservation = await Reservation.findById(id);
        if (!foundReservation) { return false; }
        return foundReservation;
    } catch (ex) {
        throw Error("Error occured while retrieving the reservation. " + ex.message);
    }
};

exports.getReservationByUserIdAndArticleId = async function (userId, articleId) {
    try {
        let foundReservation = await Reservation.findByUserIdAndArticleId(userId, articleId);
        if (!foundReservation) { return false; }
        return foundReservation;
    } catch (ex) {
        throw Error("Error occured while retrieving the reservation. " + ex.message);
    }
};

/**
 * Creates a reservation entry in the database.
 * @param jsonReservation: Reservation object, partial or complete, in json format.
 * @returns {Promise<*>}
 */
exports.createReservation = async function (jsonReservation) {
    try {
        let newReservation = new Reservation(jsonReservation);
        let savedReservation = await newReservation.save();
        return savedReservation;
    } catch (ex) {
        throw Error("Error while creating reservation. " + ex.message);
    }
};

/**
 * Uodates an existing reservation.
 * @param jsonReservation : Reservation object, partial or complete, in json format.
 * @returns {Promise<*>}
 */
exports.updateReservation = async function (jsonReservation) {
    let oldReservation = null;
    try {
        oldReservation = await Reservation.findById(jsonReservation._id);
        if (!oldReservation) { throw Error("Reservation could not be found."); }
    } catch (ex) {
        throw Error("Error occured while retrieving the reservation. " + ex.message);
    }
    try {
        Object.assign(oldReservation, jsonReservation);
        let savedReservation = await oldReservation.save();
        return savedReservation;
    } catch (ex) {
        throw Error("An error occured while updating the reservation. " + ex.message);
    }
};

exports.deleteReservation = async function (id) {
    let reservation = null;
    try {
        reservation = await Reservation.findById(id);
        if (!reservation) { throw Error("Reservation could not be found."); }
    } catch (ex) {
        throw Error("Error occured while retrieving the reservation. " + ex.message);
    }
    try {
        let deletedReservation = await reservation.remove();
        return deletedReservation;
    } catch (ex) {
        throw Error("Error occured while deleting the reservation. " + ex.message);
    }
};

exports.createInitialEntries = async function () {
    try {
        await this.createReservation({
            _id: '5a9e918a16b36024845a319b',
            articleId: '5a9e4e65bdd7751e5033123f',
            userId: '5a97bc25bba7ce18c0812d0a',
            commentPublisher: '',
            commentApplicant: 'Ich brauche das Motorrad für den Arbeitsweg.'
        });

        await this.createReservation({
            _id: '5a9e918a16b36024845a319d',
            articleId: '5a9e4e65bdd7751e50331240',
            userId: '5a97bc25bba7ce18c0812d0a',
            commentPublisher: '',
            commentApplicant: 'Ich bin ein Fan von Yamaha Motorräder.'
        });

        await this.createReservation({
            _id: '5a9e918a16b36024845a319c',
            articleId: '5a9e4e65bdd7751e50331241',
            userId: '5a97c0bcbba7ce18c0812d0b',
            commentPublisher: 'Motorrad fahren ist nicht wirklich anstrengend. Es gibt bessere Aktivitäten um körperlich fit zu bleiben.',
            commentApplicant: 'Ich brauche Ausgleich zu meinem Büro Job.'
        });

        console.log("Reservation entries created successfully.");
    } catch(ex) {
        throw Error("Error while creating initial values for reservations. " + ex.message);
    }
};

