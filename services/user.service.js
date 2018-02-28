/* User service. Contains CRUD operations and business logic functions. */

const crypto = require('crypto');
const cryptoUtil = require('../util/cryptoUtil');

const User = require('../models/user.model');





function publicRegisterUser(userParam, callback) {

    let user = new User(userParam);
    user.save ( function (err, newDoc) {
        if (callback) {
            callback(err, newDoc);
        }
    });
}

/*
function publicAuthentication(email, passwort, callback) {
    if (!(email && passwort)) {
        callback(false);
    }


    db.findOne({email: email}, function (err, doc) {
        if (doc == null && !err) {
            publicRegisterUser(email, passwort, callback);
        }
        else {
            callback(err, doc && doc.passwortHash == cryptoUtil.hashPwd(passwort));
        }
    });
}

function User(email, passwort) {
    this.email = email;
    this.passwortHash = cryptoUtil.hashPwd(passwort);
}

module.exports = {add: publicRegisterUser, authenticate: publicAuthentication};
*/
module.exports = {add: publicRegisterUser};