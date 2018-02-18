var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Items
var Article = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    }
},{
    collection: 'articles'
});

module.exports = mongoose.model('Article', Article);