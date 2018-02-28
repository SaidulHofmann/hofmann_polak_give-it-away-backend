/* Api routes. Includes all routes for /api requests. */

const express = require('express');
const router = express.Router();


router.use('/articles', require('./api/article.route'));




module.exports = router;