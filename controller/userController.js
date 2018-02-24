// User controller that handles article api requests.

const mongoose = require('mongoose');
const User = require('../models/User');
const _ = require('underscore');
// const util = require("../util/security");




exports.createUser = function (req, res) {
    let user = new User(req.body);
    user.save()
        .then(user => {
        res.json(user);
})
.catch(err => {
        res.status(400).send("Unable to save the user.");
});
}





