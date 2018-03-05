// Article Status model.

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const ObjectId = mongoose.Schema.ObjectId;

const articleStatusSchema = mongoose.Schema(
    {
        _id:        { type: String },
        name:       { type: String, reqiured: true, unique: true }
    },
    { collection: 'articleStatus'},
    { timestamps: true }
);



articleStatusSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('ArticleStatus', articleStatusSchema);