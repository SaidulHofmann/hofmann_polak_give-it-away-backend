// User service. Contains CRUD operations and business logic functions.

const crypto = require('crypto');
const cryptoUtil = require('../util/cryptoUtil');
const mongoose = require('mongoose');
const User = new require('../models/user.model');
const customErrors = require('../core/errors.core.js');


function publicAuthenticate(email, passwort, callback) {
    if (!(email && passwort)) {
        callback(false);
    }
    User.findOne({email: email}, function (err, user) {
        callback(err, user, user && user.password === cryptoUtil.hashPwd(passwort));
    });
}

async function publicGetUsers (query, page, limit, sort) {
    let options = {page: page, limit: limit, sort: sort };
    return User.paginate(query, options);
}

async function publicGetUserById (id) {
    let foundUser = await User.findById(id);
    if (!foundUser) { return false; }
    return foundUser;
}

async function publicRegisterUser(jsonUser) {
    let newUser = new User(jsonUser);
    newUser.password = cryptoUtil.hashPwd(jsonUser.password);
    return newUser.save();
}

async function publicUpdateUser(jsonUser) {
    let oldUser = await User.findById(jsonUser._id);
    if (!oldUser) { throw customErrors.ArgumentError(`Der Benutzer mit der Id '${jsonUser._id}' wurde nicht gefunden.`); }

    // Check if email changed and duplicate exists.
    let userWithSameEmail = await User.findOne({email: jsonUser.email});
    if(userWithSameEmail && ! userWithSameEmail._id.equals(jsonUser._id)) {
        throw new customErrors.DuplicateKeyError(`Die E-Mail Adresse '${jsonUser.email}' wird bereits verwendet. Wählen Sie bitte eine andere E-Mail Adresse.`);
    }

    let oldPasswordHash = oldUser.password;
    Object.assign(oldUser, jsonUser);
    if(oldPasswordHash !== jsonUser.password) {
        oldUser.password = cryptoUtil.hashPwd(jsonUser.password);
    }
    return oldUser.save();
}

async function publicDeleteUser(id) {
    let user = await User.findById(id);
    if (!user) { throw ArgumentError(`Der Benutzer mit der Id '${id}' wurde nicht gefunden.`); }
    return user.remove();
}

function publicCreateInitialDbEntries() {
    try {
        this.createUser({
            _id: '5abc0267d608821850991037',
            email: 'testuser1@testuser.com',
            password: 'Hans',
            firstname: 'Hans',
            lastname: 'Muster'
        });
        this.createUser({
            _id: '5abc0267d608821850991038',
            email: 'testuser2@testuser.com',
            password: 'Felix',
            firstname: 'Felix',
            lastname: 'Meier'
        });

        console.log('Die initialen Datenbank-Einträge für die Collection User wurden erfolgreich erstellt.');
    } catch(ex) {
        throw Error('Fehler bei der Erstellung der initialen Datenbank-Einträge für die Collection User: ' + ex.message);
    }
}

module.exports = {
    authenticate: publicAuthenticate,
    getUsers: publicGetUsers,
    getUserById: publicGetUserById,
    createUser: publicRegisterUser,
    updateUser: publicUpdateUser,
    deleteUser : publicDeleteUser,
    createInitialDbEntries: publicCreateInitialDbEntries
};