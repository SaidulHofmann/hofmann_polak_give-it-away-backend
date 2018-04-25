const jwt = require('jsonwebtoken');


exports.getUserId = function(req) {
    if(!req || !req.header('authorization')) {
        console.error('Cannot get user id. Request parameter invalid.');
        return '';
    }
    let token = req.header('authorization').substr(7);
    let decodedToken = jwt.decode(token);
    return decodedToken._id;
};

exports.getUserEmail = function(req) {
    if(!req || !req.header('authorization')) {
        console.error('Cannot get email. Request parameter invalid.');
        return '';
    }
    let token = req.header('authorization').substr(7);
    let decodedToken = jwt.decode(token);
    return decodedToken.email;
};

exports.getUser = function(req) {
    if(!req || !req.header('authorization')) {
        console.error('Cannot get user info. Request parameter invalid.');
        return '';
    }
    let token = req.header('authorization').substr(7);
    let decodedToken = jwt.decode(token);
    return decodedToken;
};