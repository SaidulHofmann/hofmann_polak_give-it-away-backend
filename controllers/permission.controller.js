/* Permission controller. Handles permission api requests. */

const PermissionService = require('../services/permission.service');
const Permission = require('../models/permission.model');
const customErrors = require('../core/errors.core.js');
const ArgumentError = customErrors.ArgumentError;

// Save the context of this module.
_this = this;


exports.getPermissions = async function (req, res, next) {
    try {

        let page = req.query.page ? +req.query.page : 1;
        let limit = req.query.limit ? +req.query.limit : 10;
        let sort = req.query.sort ? req.query.sort : {};
        let filter = req.query.filter ? req.query.filter : '';

        let query = {};
        if(filter) {
            let filterExp = new RegExp(filter, "i");
            query = { $or:
                    [ { name: filterExp }, { isPredefined: filterExp }, { _id: ObjectId.isValid(filter) ? ObjectId(filter) : undefined } ]
            };
        }

        let permissions = await PermissionService.getPermissions(query, page, limit, sort);
        return res.status(200).json({status: 200, data: permissions, message: 'Die Berechtigungs-Einträge wurden erfolgreich geladen.'});
    } catch (ex) {
        return res.status(ex.status || 400).json({status: ex.status || 400, name: ex.name, message: 'Die Berechtigungs-Einträge konnten nicht geladen werden. ' + ex.message});
    }
};

exports.getPermissionById = async function (req, res, next) {
    try {
        let id = req.params.id;
        if (!id) {
            throw new ArgumentError('Beim Laden des Berechtigungs-Eintrags muss die Id angegeben werden.');
        }
        let foundPermission = await PermissionService.getPermissionById(id);
        if (!foundPermission) {
            throw new ArgumentError(`Der Berechtigungs-Eintrag mit der Id '${id}' wurde nicht gefunden.`, 404);
        }
        return res.status(200).json({status: 200, data: foundPermission, message: 'Der Berechtigungs-Eintrag wurde erfolgreich geladen.'});
    } catch (ex) {
        return res.status(ex.status || 400).json({status: ex.status || 400, name: ex.name, message: 'Der Berechtigungs-Eintrag konnte nicht geladen werden. ' + ex.message});
    }
};

exports.createPermission = async function (req, res, next) {
    try {
        let createdPermission = await PermissionService.createPermission(req.body);
        return res.status(201).json({status: 201, data: createdPermission, message: 'Der Berechtigungs-Eintrag wurde erfolgreich erstellt.'});
    } catch (ex) {
        return res.status(ex.status || 400).json({status: ex.status || 400, name: ex.name, message: 'Der Berechtigungs-Eintrag konnte nicht erstellt werden. ' +ex.message});
    }
};

exports.updatePermission = async function (req, res, next) {
    try {
        if (!req.body._id) {
            throw new ArgumentError('Bei der Aktualisierung eines Berechtigungs-Eintrags muss die Id angegeben werden.');
        }
        let updatedPermission = await PermissionService.updatePermission(req.body);
        return res.status(200).json({status: 200, data: updatedPermission, message: 'Der Berechtigungs-Eintrag wurde erfolgreich aktualisiert.'});
    } catch (ex) {
        return res.status(ex.status || 400).json({status: ex.status || 400, name: ex.name, message: 'Der Berechtigungs-Eintrag konnte nicht aktualisiert werden. ' + ex.message});
    }
};

exports.deletePermission = async function (req, res, next) {
    try {
        let id = req.params.id;
        if (!id) {
            throw new ArgumentError('Beim Entfernen eines Berechtigungs-Eintrags muss die Id angegeben werden.');
        }
        let deletedPermission = await PermissionService.deletePermission(id);
        return res.status(200).json({status: 204, data: deletedPermission, message: `Der Berechtigungs-Eintrag mit der Id '${id}' wurde erfolgreich entfernt.`});
    } catch (ex) {
        return res.status(ex.status || 400).json({status: ex.status || 400, name: ex.name, message: 'Beim Entfernen des Berechtigungs-Eintrags ist ein Fehler aufgetreten: ' + ex.message});
    }
};
