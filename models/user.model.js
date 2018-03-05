// User model with definition of collection, document schema and functions.

const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        email:      { type: String, reqiured: true, unique: true, index: true },
        password:   { type: String, required: true },
        firstname:  { type: String, required: true },
        lastname:   { type: String, required: true }

    },
    { collection: 'users'},
    { timestamps: true }
);


module.exports = mongoose.model('User', userSchema);