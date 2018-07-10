const mongoose = require('mongoose');
const customErrors = require('../core/errors.core.js');
const UserService = require('../services/user.service');
const util = require("../utils/security");

exports.registerUser = async function (req, res) {
    try {
        let createdUser = await UserService.registerUser(req.body);
        return res.status(201).json({status: 201, data: createdUser, message: 'Das Benutzerkonto wurde erfolgreich erstellt.'});
    } catch (ex) {
        return res.status(ex.status || 400).json({ status: ex.status || 400, name: ex.name, message: 'Das Benutzerkonto konnte nicht erstellt werden. ' + ex.message });
    }
};

exports.login = async function (req, res) {
    try {
        util.handleLogin(req, res);
    } catch (ex) {
        return res.status(ex.status || 400).json({ status: ex.status || 400, name: ex.name, message: 'Die Anmeldung konnte nicht erfolgreich durchgeführt werden. ' + ex.message });
    }
};