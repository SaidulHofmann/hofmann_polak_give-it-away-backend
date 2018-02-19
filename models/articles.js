let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// Define collection and schema for Items
let Article = new Schema({
    id: {
        type: number
    },
    catgoryId: {
        type: number
    },
    name: {
        type: String
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
        type: Date
    },
    DonationDate: {
        type: Date
    },
    searchwords: {
        type: String
    },
    statusId: {
        type: number
    },
    DonationUserid: {
        type: number
    }






},{
    collection: 'articles'
});

module.exports = mongoose.model('Article', Article);