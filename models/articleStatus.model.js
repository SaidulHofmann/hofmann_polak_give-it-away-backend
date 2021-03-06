// Article Status model.

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const ObjectId = mongoose.Schema.ObjectId;

const articleStatusSchema = mongoose.Schema(
    {
        _id:        { type: String },
        name:       { type: String, required: true, unique: true }
    },
    { collection: 'articleStatus', timestamps: true, collation: { locale: 'de', strength: 1 } }
);



articleStatusSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('ArticleStatus', articleStatusSchema);