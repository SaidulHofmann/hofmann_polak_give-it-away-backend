// User model with definition of collection, document schema and functions.

const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        username: {
            type: String, reqiured: true
        },
        password: {
            type: String, required: true
        },
        firstname: {
            type: String, required: true
        },
        lastname: {
            type: String, required: true
        }

    },
    { collection: 'users'}
);

// Functions for the collection



module.exports = mongoose.model('User', userSchema);