/* Reservation controller. Handles reservation api requests. */

const ReservationService = require('../services/reservation.service');
const Reservation = require('../models/reservation.model');

// Save the context of this module.
_this = this;


exports.getReservations = async function (req, res, next) {
    try {
        let reservations = null;
        // Check the existence of the query parameters. If they don't exist, assign a default value.
        let page = req.query.page ? req.query.page : 1;
        let limit = req.query.limit ? req.query.limit : 10;
        let userId = req.query.userId;
        let articleId = req.query.articleId;

        // Search by articleId and userId.
        if (userId && articleId) {
            reservations = await ReservationService.getReservationByUserIdAndArticleId(userId, articleId);
            if (!reservations) {
                return res.status(404).json({status: 404, message: "Reservation could not be found."});
            }
        }
        // Return reservations unfiltered.
        else {
            reservations = await ReservationService.getReservations({}, page, limit);
        }
        return res.status(200).json({status: 200, data: reservations, message: "Reservations received successfully."});
    } catch (ex) {
        return res.status(400).json({status: 400, message: ex.message});
    }
};

exports.getReservationById = async function (req, res, next) {
    try {
        let id = req.params.id;
        if (!id) {
            return res.status(400).json({status: 400, message: "Id must be present."});
        }
        let foundReservation = await ReservationService.getReservationById(id);
        if (!foundReservation) {
            return res.status(404).json({status: 404, message: "Reservation could not be found."});
        }
        return res.status(200).json({status: 200, data: foundReservation, message: "Reservation received successfully."});
    } catch (ex) {
        return res.status(400).json({status: 400, message: ex.message});
    }
};

exports.createReservation = async function (req, res, next) {
    try {
        // Req.Body contains the form submit values.
        let createdReservation = await ReservationService.createReservation(req.body);
        return res.status(201).json({status: 201, data: createdReservation, message: "Reservation created successfully."});
    } catch (ex) {
        return res.status(400).json({status: 400, message: "Reservation could not be created. " +ex.message});
    }
};

exports.updateReservation = async function (req, res, next) {
    try {
        if (!req.body._id) {
            return res.status(400).json({status: 400, message: "Id must be present."});
        }
        let updatedReservation = await ReservationService.updateReservation(req.body);
        return res.status(200).json({status: 200, data: updatedReservation, message: "Reservation updated successfully."});
    } catch (ex) {
        return res.status(400).json({status: 400, message: ex.message});
    }
};

exports.deleteReservation = async function (req, res, next) {
    try {
        let id = req.params.id;
        if (!id) {
            return res.status(400).json({status: 400, message: "Id must be present."});
        }
        let deletedReservation = await ReservationService.deleteReservation(id);
        return res.status(200).json({status: 204, data: deletedReservation, message: "Reservation deleted successfully."});
    } catch (ex) {
        return res.status(400).json({status: 400, message: ex.message});
    }
};
