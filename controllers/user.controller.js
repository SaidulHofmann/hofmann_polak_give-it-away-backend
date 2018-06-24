// User controller. Handles user api requests.

const UserService = require('../services/user.service');
const util = require("../util/security");
const helper = require('../util/helper');
const customErrors = require('../core/errors.core.js');
const ArgumentError = customErrors.ArgumentError;
const ObjectId = require('mongoose').Types.ObjectId;


exports.getUsers = async function (req, res) {
    try {
        let page = req.query.page ? +req.query.page : 1;
        let limit = req.query.limit ? +req.query.limit : 10;
        let sort = req.query.sort ? req.query.sort : {};
        let filter = req.query.filter ? req.query.filter : '';

        let query = {};
        if(filter) {
            let filterExp = new RegExp(filter, "i");
            query = { $or:
                    [ { firstname: filterExp }, { lastname: filterExp }, { email: filterExp }, { _id: ObjectId.isValid(filter) ? ObjectId(filter) : undefined } ]
            };
        }
        let users = await UserService.getUsers(query, page, limit, sort);
        return res.status(200).json({status: 200, data: users, message: 'Die Benutzer wurden erfolgreich geladen.'});
    } catch (ex) {
        return res.status(ex.status || 400).json({ status: ex.status || 400, name: ex.name, message: 'Die Benutzer konnten nicht geladen werden. ' + ex.message});
    }
};

exports.getUserById = async function (req, res) {
    try {
        if (!req.params.id) {
            throw new ArgumentError('Beim Laden des Benutzers muss die Benutzer Id angegeben werden.');
        }
        let foundUser = await UserService.getUserById(req.params.id);
        if (!foundUser) {
            throw new ArgumentError(`Der Benutzer mit der Id '${req.params.id}' wurde nicht gefunden.`, 404);
        }
        return res.status(200).json({status: 200, data: foundUser, message: 'Der Benutzer wurde erfolgreich geladen.'});
    } catch (ex) {
        return res.status(ex.status || 400).json({ status: ex.status || 400, name: ex.name, message: 'Der Benutzer konnte nicht geladen werden. ' + ex.message});
    }
};

exports.createUser = async function (req, res) {
    try {
        let createdUser = await UserService.createUser(req.body);
        return res.status(201).json({status: 201, data: createdUser, message: 'Das Benutzerkonto wurde erfolgreich erstellt.'});
    } catch (ex) {
        return res.status(ex.status || 400).json({ status: ex.status || 400, name: ex.name, message: 'Das Benutzerkonto konnte nicht erstellt werden. ' + ex.message });
    }
};

exports.updateUser = async function (req, res) {
    try {
        if (!req.body._id) {
            throw new ArgumentError('Bei der Aktualisierung eines Benutzers muss die Benutzer Id angegeben werden.');
        }
        let updatedUser = await UserService.updateUser(req.body);
        return res.status(200).json({status: 200, data: updatedUser, message: 'Der Benutzer wurde erfolgreich aktualisiert.'});
    } catch (ex) {
        return res.status(ex.status || 400).json({ status: ex.status || 400, name: ex.name, message: 'Der Benutzer konnte nicht aktualisiert werden. ' + ex.message });
    }
};

exports.deleteUser = async function (req, res) {
    try {
        let id = req.params.id;
        if (!id) {
            throw new ArgumentError('Beim Entfernen eines Benutzers muss die Benutzer Id angegeben werden.');
        }
        let deletedUser = await UserService.deleteUser(id);
        return res.status(200).json({status: 200, data: deletedUser, message: `Der Benutzer mit der Id '${id}' wurde erfolgreich entfernt.`});
    } catch (ex) {
        return res.status(ex.status || 400).json({status: ex.status || 400, name: ex.name, message: 'Beim Entfernen des Benutzers ist ein Fehler aufgetreten: ' + ex.message});
    }
};

exports.login = async function (req, res) {
    try {
        util.handleLogin(req, res);
    } catch (ex) {
        return res.status(ex.status || 400).json({ status: ex.status || 400, name: ex.name, message: 'Die Anmeldung konnte nicht erfolgreich durchgeführt werden. ' + ex.message });
    }
};
