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
const mongoose = require('mongoose');
const mongooseConfig = require('./data/mongodb');
//const jwt = require('express-jwt');
//const jwtSecret = 'aklsdjfklöasjdcma8sd90mcklasdföasdf$ädasöfü pi340qkrlöam,dflöäasf';


// Aplication settings
//-----------------------------------------------------------------------------
//app.set("jwt-secret", jwtSecret); //secret should be in a config file - or better be a private key!
//app.set("jwt-sign", {expiresIn: "1d", audience: "self", issuer: "myself"});
//app.set("jwt-validate", {secret: jwtSecret, audience: "self", issuer: "myself"});

// Database settings
//-----------------------------------------------------------------------------

mongoose.Promise = global.Promise;
mongoose.connect(mongooseConfig.DB).then(
    () => { console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err) }
);


// Middleware configuration
//-----------------------------------------------------------------------------
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/../give-it-away-frontend/dist')));


// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


// app.get("/", function (req, res) {
//     res.sendFile("index.html", {root: __dirname + '/../give-it-away-frontend/dist/'});
// });

app.use("/", require('./routes/userRoutes.js'));
//app.use(jwt(app.get("jwt-validate"))); //after this middleware a token is required!
app.use("/api/articles", require('./routes/articleRoutes.js'));

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('No token / Invalid token provided');
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


