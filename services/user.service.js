// User service. Contains CRUD operations and business logic functions.

const crypto = require('crypto');
const cryptoUtil = require('../util/cryptoUtil');

const User = require('../models/user.model');



async function publicRegisterUser(jsonUser) {
    try {
        let newUser = new User(jsonUser);
        let savedUser = await newUser.save();
        return savedUser;
    } catch (ex) {
        throw Error("Error occured while creating the user. " + ex.message);
    }
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

async function getUsers (query, page, limit) {
    try {
        // Options setup for the mongoose paginate.
        let options = {page: page, limit: limit };
        let users = await User.paginate(query, options);
        return users;
    } catch (ex) {
        throw Error('Error while paginating users. ' + ex.message);
    }
};

async function getUserById (id) {
    try {
        let foundUser = await User.findById(id);
        if (!foundUser) { return false; }
        return foundUser;
    } catch (ex) {
        throw Error("Error occured while retrieving the user. " + ex.message);
    }
};

function createInitialDbEntries() {
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

        console.log("User entries created successfully.");
    } catch(ex) {
        throw Error("Error while creating initial entries for user. " + ex.message);
    }
};

module.exports = {
    createUser: publicRegisterUser,
    getUsers: getUsers,
    getUserById: getUserById,
    createInitialDbEntries: createInitialDbEntries
};