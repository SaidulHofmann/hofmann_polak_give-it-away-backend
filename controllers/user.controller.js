// User controller. Handles user api requests.


const UserService = require('../services/user.service');
const util = require("../util/security");


exports.getUsers = async function (req, res) {
    console.log('@user.controller.getUsers()');
    try {
        let page = req.query.page ? +req.query.page : 1;
        let limit = req.query.limit ? +req.query.limit : 10;
        let sort = req.query.sort ? req.query.sort : {};
        let filter = req.query.filter ? req.query.filter : '';

        let query = {};
        if(filter) {
            let filterExp = new RegExp(filter, "i");
            let ObjectId = require('mongoose').Types.ObjectId;
            query = { $or:
                        [ { firstname: filterExp }, { lastname: filterExp }, { email: filterExp }, { _id: new ObjectId(filter) } ]
                    }
        }
        let users = await UserService.getUsers(query, page, limit, sort);
        return res.status(200).json({status: 200, data: users, message: "Users received successfully."});
    } catch (ex) {
        return res.status(400).json({status: 400, message: ex.message});
    }
};

exports.getUserById = async function (req, res) {
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

exports.createUser = async function (req, res) {
    try {
        let createdUser = await UserService.createUser(req.body);
        return res.status(201).json({status: 201, data: createdUser, message: "User created successfully."});
    } catch (ex) {
        return res.status(400).json({status: 400, message: "User could not be created. " +ex.message});
    }
};

exports.login = async function (req, res) {
    try {
        util.handleLogin(req, res);
    } catch (ex) {
        return res.status(400).json({status: 400, message: "Error processing login."});
    }

};
