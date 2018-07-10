/* Permission service. Contains CRUD operations and business logic functions. */

const Permission = new require('../models/permission.model');
const customErrors = require('../core/errors.core.js');
const ArgumentError = customErrors.ArgumentError;

// Save the context of this module.
_this = this;


exports.getPermissions = async function (query, page, limit, sort) {
    let options = { page: page, limit: limit, sort: sort };
    return Permission.paginate(query, options);
};

exports.getPermissionById = async function (id) {
    let foundPermission = await Permission.findById(id);
    if (!foundPermission) { return false; }
    return foundPermission;
};

exports.createPermission = async function (jsonPermission) {
    let newPermission = new Permission(jsonPermission);
    return newPermission.save();
};

exports.updatePermission = async function (jsonPermission) {
    let oldPermission = await Permission.findById(jsonPermission._id);
    if (!oldPermission) { throw ArgumentError(`Der Berechtigungs-Eintrag mit der Id '${jsonPermission._id}' wurde nicht gefunden.`); }

    Object.assign(oldPermission, jsonPermission);
    return oldPermission.save();
};

exports.deletePermission = async function (id) {
    let permission = await Permission.findById(id);
    if (!permission) { throw ArgumentError(`Der Berechtigungs-Eintrag mit der Id '${id}' wurde nicht gefunden.`); }
    return permission.remove();
};

exports.createInitialDbEntries = async function () {
    try {
        await this.createPermission({
            _id: '5b35430567dfb9160c2532bf',
            name:                   'Standardbenutzer',
            isPredefined:           true,

            articleOwnCreate:       true,
            articleOwnUpdate:       true,
            articleOwnDelete:       true,
            articleOwnDonate:       true,

            articleOtherUpdate:     false,
            articleOtherDelete:     false,
            articleOtherDonate:     false,

            userCreate:             false,
            userRead:               false,
            userUpdate:             false,
            userDelete:             false,
        });

        await this.createPermission({
            _id: '5b35430867dfb9160c2532c0',
            name:                   'Hauptbenutzer',
            isPredefined:           true,

            articleOwnCreate:       true,
            articleOwnUpdate:       true,
            articleOwnDelete:       true,
            articleOwnDonate:       true,

            articleOtherUpdate:     false,
            articleOtherDelete:     false,
            articleOtherDonate:     false,

            userCreate:             false,
            userRead:               true,
            userUpdate:             false,
            userDelete:             false,
        });

        await this.createPermission({
            _id: '5b35430a67dfb9160c2532c1',
            name:                   'Administrator',
            isPredefined:           true,

            articleOwnCreate:       true,
            articleOwnUpdate:       true,
            articleOwnDelete:       true,
            articleOwnDonate:       true,

            articleOtherUpdate:     true,
            articleOtherDelete:     true,
            articleOtherDonate:     true,

            userCreate:             true,
            userRead:               true,
            userUpdate:             true,
            userDelete:             true,
        });

        console.log('Die initialen Datenbank-Einträge für die Collection Permission wurden erfolgreich erstellt.');
    } catch(ex) {
        throw Error('Fehler bei der Erstellung der initialen Datenbank-Einträge für die Collection Permission:\n' + ex.stack);
    }
};

