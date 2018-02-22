// Article model with definition of collection, document schema and functions.

const mongoose = require('mongoose');

const articleSchema = mongoose.Schema(
    {
        catgoryId: {
            type: Number
        },
        name: {
            type: String, required: true
        },
        description: {
            type: String
        },
        condition: {
            type: String
        },
        picture: {
            type: String
        },
        videos: {
            type: String
        },
        handover: {
            type: String
        },
        creationDate: {
            type: Date, default: Date.now
        },
        DonationDate: {
            type: Date
        },
        searchwords: {
            type: String
        },
        statusId: {
            type: Number
        },
        DonationUserid: {
            type: Number
        }
    },
    { collection: 'articles'}
);

// Functions for the collection



module.exports = mongoose.model('Article', articleSchema);