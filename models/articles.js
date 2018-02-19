let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// Define collection and schema for Items
let Article = new Schema({
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
    CreationDate: {
        type: Date
    },
    DonationDate: {
        type: Date
    }





},{
    collection: 'articles'
});

module.exports = mongoose.model('Article', Article);