const jwt = require('jsonwebtoken');
const userService = require('../services/user.service.js');

function publicIsLoggedIn(req) {
    return req.user != null;
}

function authenticated(req, res, next) {
    if (publicIsLoggedIn(req)) {
        next();
    }
    else {
        res.status(401).send(false);
    }
}

function currentUser(req) {
    return req.user.email;
}


function createSessionToken(user, secret, options, callback) {
    if (!user) {
        return "";
    }
    jwt.sign({email: user.email, _id: user._id}, secret, options, (err, token) => callback(token));
}

function handleLogin(req, res) {
    if (publicIsLoggedIn(req)) {
        res.send(true);
    }
    else {
        userService.authenticate(req.body.email, req.body.pwd, function (err, user, valid) {
            if (valid) {
                createSessionToken(user, req.app.get("jwt-secret"), req.app.get("jwt-sign"), (token) => {
                    user.authToken = token;
                    res.status(201).json({status: 201, data: user, message: "Der Anmeldevorgang wurde erfolgreich abgeschlossen."});
                });
            }
            else if (err) {
                res.status(401).json({status: 401, name: err.name,  message: 'Bei der Anmeldung ist ein Fehler aufgetreten. ' +err.message});
            }
            else {
                res.status(401).json({status: 401, name: 'Error', message: 'E-Mail oder Passwort ungültig.'});
            }
        });
    }
}

module.exports = {
    isLoggedIn: publicIsLoggedIn,
    handleAuthenticate: authenticated,
    current: currentUser,
    createToken: createSessionToken,
    handleLogin: handleLogin
};