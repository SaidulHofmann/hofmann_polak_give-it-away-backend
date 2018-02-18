let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// Define collection and schema for Items
let Article = new Schema({
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