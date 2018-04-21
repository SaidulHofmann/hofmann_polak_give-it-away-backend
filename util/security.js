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


function createSessionToken(email, secret, options, callback) {
    if (!email) {
        return "";
    }
    jwt.sign({email}, secret, options, (err, token) => callback(token));
}

function handleLogin(req, res) {
    if (publicIsLoggedIn(req)) {
        res.send(true);
    }
    else {
        userService.authenticate(req.body.email, req.body.pwd, function (err, user, valid) {
            if (valid) {
                createSessionToken(req.body.email,
                    req.app.get("jwt-secret"),
                    req.app.get("jwt-sign"),
                    (token) => {
                    user.authToken = token;
                    res.status(201).json({status: 201, data: user, message: "User authenticated successfully."});
                });
            }
            else if (err) {
                res.status("401").json({status: 401, message: "An error occurred while authenticating. " +err.message});
            }
            else {
                res.status("401").json({status: 401, message: "Authentication failed."});
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