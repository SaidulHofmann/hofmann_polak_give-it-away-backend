// Api routes. Includes all routes for /api requests.

const express = require('express');
const router = express.Router();


router.use('/articles', require('./api/article.route'));
router.use('/articleCategories', require('./api/articleCategory.route'));
router.use('/articleStatus', require('./api/articleStatus.route'));
router.use('/reservations', require('./api/reservation.route'));




module.exports = router;