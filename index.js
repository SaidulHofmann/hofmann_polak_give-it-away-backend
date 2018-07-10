/**
 * Project: HSR CAS FEE 2017, Project 02 - give-it-away application.
 * Content: Node Express Webserver for the give-it-away application.
 * Created on: 12.12.2017
 * Author: Saidul Hofmann
 */

// Declarations
//-----------------------------------------------------------------------------
const express = require('express');
const app = express();
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const jwtSecret = 'aklsdjfklöasjdcma8sd90mcklasdföasdf$ädasöfü pi340qkrlöam,dflöäasf';


// Application settings
//-----------------------------------------------------------------------------
app.set("jwt-secret", jwtSecret); //secret should be in a config file - or better be a private key!
app.set("jwt-sign", {expiresIn: "1d", audience: "self", issuer: "myself"});
app.set("jwt-validate", {secret: jwtSecret, audience: "self", issuer: "myself"});


// Database Connection
//-----------------------------------------------------------------------------
//const databaseConnectionUrl = 'mongodb://admin:admin@ds141068.mlab.com:41068/giveitaway';
const databaseConnectionUrl = 'mongodb://localhost/giveitaway';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(databaseConnectionUrl);
require('./models/index.model.js');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Database connection error:'));
db.once('open', function() {
    console.log(`Connected to Database ${db.name} at ${db.host}:${db.port}.`);
});

// Middleware configuration
//-----------------------------------------------------------------------------
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/../hofmann_polak_give-it-away-frontend/dist-prod')));


// Routing
//-----------------------------------------------------------------------------

// CORS configuration - add headers.
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'authorization, Content-Type, Accept, Origin, X-Requested-With');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// User and general routes.
//-------------------------
app.get("/", function (req, res) {
    res.sendFile("index.html", {root: __dirname + '/../hofmann_polak_give-it-away-frontend/dist-prod/'});
});
app.use("/", require('./routes/unprotected.route'));
app.use(jwt(app.get("jwt-validate"))); //after this middleware a token is required!


// API routes for all routes matching /api.
//-------------------------------------------
app.use('/api', require('./routes/api.route'));


app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({status: 401, name: err.name,
            message: 'Zugriff verweigert weil nicht angemeldet oder Anmeldung abgelaufen.'});
    }
    else {
        next(err);
    }
});


// Start Webserver
//-----------------------------------------------------------------------------
const hostname = '127.0.0.1';
const port = 3003;
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


