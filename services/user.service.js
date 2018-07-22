// User service. Contains CRUD operations and business logic functions.

const crypto = require('crypto');
const cryptoUtil = require('../utils/cryptoUtil');
const mongoose = require('mongoose');
const User = new require('../models/user.model');
const customErrors = require('../core/errors.core.js');
const Permission = new require('../models/permission.model');


function publicAuthenticate(email, passwort, callback) {
    if (!(email && passwort)) {
        callback(false);
    }
    User.findOne({email: email}, function (err, user) {
        callback(err, user, user && user.password === cryptoUtil.hashPwd(passwort));
    }).populateAll();
}

async function publicGetUsers (query, page, limit, sort) {
    let options = { page: page, limit: limit, sort: sort, populate: User.populateAllOptions };
    return User.paginate(query, options);
}

async function publicGetUserById (id) {
    let foundUser = await User.findById(id).populateAll();
    if (!foundUser) { return false; }
    return foundUser;
}

async function publicRegisterUser(jsonUser) {
    let permission = await Permission.findOne({name: 'Standardbenutzer'});
    if(!permission) { throw customErrors.InvalidOperationError('Der Berechtigungs-Eintrag für Standardbenutzer konnte nicht geladen werden.')}
    jsonUser.permission = permission;
    return publicCreateUser(jsonUser);
}

async function publicCreateUser(jsonUser) {
    await checkDuplicateUser(jsonUser);
    let newUser = new User(jsonUser);
    newUser.password = cryptoUtil.hashPwd(jsonUser.password);
    let savedUser = await newUser.save();
    return User.findById(savedUser._id).populateAll();
}

async function publicUpdateUser(jsonUser) {
    let oldUser = await User.findById(jsonUser._id).populateAll();
    if (!oldUser) { throw customErrors.ArgumentError(`Der Benutzer mit der Id '${jsonUser._id}' wurde nicht gefunden.`); }
    await checkDuplicateUser(jsonUser);

    let oldPasswordHash = oldUser.password;
    Object.assign(oldUser, jsonUser);
    if(oldPasswordHash !== jsonUser.password) {
        oldUser.password = cryptoUtil.hashPwd(jsonUser.password);
    }
    return oldUser.save();
}

async function checkDuplicateUser(jsonUser) {
    let userWithSameEmail = await User.findOne({email: jsonUser.email});
    if(userWithSameEmail && ! userWithSameEmail._id.equals(jsonUser._id)) {
        throw new customErrors.DuplicateKeyError(`Die E-Mail Adresse '${jsonUser.email}' wird bereits verwendet. Wählen Sie bitte eine andere E-Mail Adresse.`);
    }
}

async function publicDeleteUser(id) {
    let user = await User.findById(id).populateAll();
    if (!user) { throw ArgumentError(`Der Benutzer mit der Id '${id}' wurde nicht gefunden.`); }
    return user.remove();
}

async function publicCreateInitialDbEntries() {
    try {
        await this.createUser({
            _id: '5abc0267d608821850991037',
            email: 'hm@hm.com',
            password: 'hans',
            firstname: 'Hans',
            lastname: 'Muster',
            permission: '5b35430567dfb9160c2532bf'
        });
        await this.createUser({
            _id: '5abc0267d608821850991038',
            email: 'fm@fm.com',
            password: 'felix',
            firstname: 'Felix',
            lastname: 'Meier',
            permission: '5b35430867dfb9160c2532c0'
        });
        await this.createUser({
            _id: '5abc0267d608821850991039',
            email: 'admin@admin.com',
            password: 'admin',
            firstname: 'admin',
            lastname: 'admin',
            permission: '5b35430a67dfb9160c2532c1'
        });
        await this.createUser({
            _id: '5abc0267d608821850991040',
            email: 'sh@sh.com',
            password: 'saidul',
            firstname: 'Saidul',
            lastname: 'Hofmann',
            permission: '5b35430a67dfb9160c2532c1'
        });

        console.log('Die initialen Datenbank-Einträge für die Collection User wurden erfolgreich erstellt.');
    } catch(ex) {
        throw Error('Fehler bei der Erstellung der initialen Datenbank-Einträge für die Collection User:\n' + ex.stack);
    }
}

module.exports = {
    authenticate: publicAuthenticate,
    getUsers: publicGetUsers,
    getUserById: publicGetUserById,
    registerUser: publicRegisterUser,
    createUser: publicCreateUser,
    updateUser: publicUpdateUser,
    deleteUser : publicDeleteUser,
    createInitialDbEntries: publicCreateInitialDbEntries
};