// User controller.


const _ = require('underscore');
const userService = require('../services/user.service');
// const util = require("../util/security");




exports.createUser = function (req, res) {

    let register = userService.createUser(req.body, function (err,register) {
        res.json(register)
    });


}





