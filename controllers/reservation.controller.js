/* Reservation controller. Handles reservation api requests. */

const ReservationService = require('../services/reservation.service');
const Reservation = require('../models/reservation.model');
const customErrors = require('../core/errors.core.js');
const ArgumentError = customErrors.ArgumentError;

// Save the context of this module.
_this = this;


exports.getReservations = async function (req, res, next) {
    try {
        let reservations = await ReservationService.getReservations(req.query);
        if(!reservations) {
            let userId = req.query.userId;
            let articleId = req.query.articleId;

            if(userId && articleId) {
                throw new ArgumentError(`Die Reservation für die Artikel Id '${articleId}' und User Id '${userId}' wurde nicht gefunden.`, 404);
            }
            if(userId && !articleId) {
                throw new ArgumentError(`Es wurden keine Reservationen gefunden für die User Id '${userId}'.`, 404);
            }
            if(!userId && articleId) {
                throw new ArgumentError(`Es wurden keine Reservationen gefunden für die Artikel Id '${articleId}'.`, 404);
            }
        }
        return res.status(200).json({status: 200, data: reservations, message: 'Die Reservationen wurden erfolgreich geladen.'});
    } catch (ex) {
        return res.status(ex.status || 400).json({status: ex.status || 400, name: ex.name, message: 'Die Reservationen konnten nicht geladen werden. ' + ex.message});
    }
};

exports.getReservationById = async function (req, res, next) {
    try {
        let id = req.params.id;
        if (!id) {
            throw new ArgumentError('Beim Laden der Reservation muss die Reservation Id angegeben werden.');
        }
        let foundReservation = await ReservationService.getReservationById(id);
        if (!foundReservation) {
            throw new ArgumentError(`Die Reservation mit der Id '${id}' wurde nicht gefunden.`, 404);
        }
        return res.status(200).json({status: 200, data: foundReservation, message: 'Die Reservation wurde erfolgreich geladen.'});
    } catch (ex) {
        return res.status(ex.status || 400).json({status: ex.status || 400, name: ex.name, message: 'Die Reservation konnte nicht geladen werden. ' + ex.message});
    }
};

exports.createReservation = async function (req, res, next) {
    try {
        let createdReservation = await ReservationService.createReservation(req.body);
        return res.status(201).json({status: 201, data: createdReservation,message: 'Die Reservation wurde erfolgreich erfasst.'});
    } catch (ex) {
        return res.status(ex.status || 400).json({status: ex.status || 400, name: ex.name, message: 'Der Reservations-Eintrag konnte nicht erstellt werden. ' +ex.message});
    }
};

exports.updateReservation = async function (req, res, next) {
    try {
        if (!req.body._id) {
            throw new ArgumentError('Bei der Aktualisierung einer Reservation muss die Reservations Id angegeben werden.');
        }
        let updatedReservation = await ReservationService.updateReservation(req.body);
        return res.status(200).json({status: 200, data: updatedReservation, message: 'Die Reservation wurde erfolgreich aktualisiert.'});
    } catch (ex) {
        return res.status(ex.status || 400).json({status: ex.status || 400, name: ex.name, message: 'Die Reservation konnte nicht aktualisiert werden. ' + ex.message});
    }
};

exports.deleteReservation = async function (req, res, next) {
    try {
        let id = req.params.id;
        if (!id) {
            throw new ArgumentError('Beim Entfernen einer Reservation muss die Reservations Id angegeben werden.');
        }
        let deletedReservation = await ReservationService.deleteReservation(id);
        return res.status(200).json({status: 204, data: deletedReservation, message: `Die Reservation mit der Id '${id}' wurde erfolgreich entfernt.`});
    } catch (ex) {
        return res.status(ex.status || 400).json({status: ex.status || 400, name: ex.name, message: 'Beim Entfernen der Reservation ist ein Fehler aufgetreten: ' + ex.message});
    }
};
