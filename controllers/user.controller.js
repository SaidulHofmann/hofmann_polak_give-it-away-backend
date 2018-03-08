// User controller. Handles user api requests.


const UserService = require('../services/user.service');
// const util = require("../util/security");


exports.getUsers = async function (req, res, next) {
    try {
        // Check the existence of the query parameters. If they don't exist, assign a default value.
        let page = req.query.page ? req.query.page : 1;
        let limit = req.query.limit ? req.query.limit : 10;

        let users = await UserService.getUsers({}, page, limit);
        return res.status(200).json({status: 200, data: users, message: "Users received successfully."});
    } catch (ex) {
        return res.status(400).json({status: 400, message: ex.message});
    }
};

exports.getUserById = async function (req, res, next) {
    try {
        if (!req.params.id) {
            return res.status(400).json({status: 400, message: "Id must be present."});
        }
        let foundUser = await UserService.getUserById(req.params.id);
        if (!foundUser) {
            return res.status(404).json({status: 404, message: "User could not be found."});
        }
        return res.status(200).json({status: 200, data: foundUser, message: "User received successfully."});
    } catch (ex) {
        return res.status(400).json({status: 400, message: ex.message});
    }
};

exports.createUser = function (req, res) {
    let register = UserService.createUser(req.body, function (err,register) {
        res.json(register)
    });
};







