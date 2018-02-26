// User controller that handles article api requests.


const _ = require('underscore');
const store = require('../services/userStore');
// const util = require("../util/security");




exports.createUser = function (req, res) {

    let register = store.add(req.body, function (err,register) {
        res.json(register)
    });


}





