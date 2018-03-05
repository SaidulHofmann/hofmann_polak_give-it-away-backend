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
 * @param reservation: new mongoose reservation object.
 * @returns {Promise<*>}
 */
exports.createReservation = async function (reservation) {
    try {
        let savedReservation = await reservation.save();
        return savedReservation;
    } catch (ex) {
        throw Error("Error while creating reservation. " + ex.message);
    }
};

/**
 * Uodates an existing reservation.
 * @param id : the id of the object to update.
 * @param params : http request body or json object.
 * @returns {Promise<*>}
 * @remark : A reservation object cannot be used as input parameter
 * to update the old reservation object because of save conflict in mongoose.
 */
exports.updateReservation = async function (id, params) {
    let oldReservation = null;
    try {
        oldReservation = await Reservation.findById(id);
        if (!oldReservation) { throw Error("Reservation could not be found."); }
    } catch (ex) {
        throw Error("Error occured while retrieving the reservation. " + ex.message);
    }
    try {
        Object.assign(oldReservation, params);
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

