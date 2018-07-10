// Reservation routes. Contains route definitions relative to api/reservations.

const express = require('express');
const router = express.Router();
const reservationController = require('../../controllers/reservation.controller');


router.get('/', reservationController.getReservations);
router.get('/:id', reservationController.getReservationById);
router.post('/', reservationController.createReservation);
router.put('/', reservationController.updateReservation) ;
router.delete('/:id', reservationController.deleteReservation);



module.exports = router;