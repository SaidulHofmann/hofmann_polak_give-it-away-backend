// Article model with definition of collection, document schema and functions.

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const ObjectId = mongoose.Schema.ObjectId;

const articleSchema = mongoose.Schema(
    {
        name:                   { type: String, required: true, index: true, trim: true },
        description:            { type: String },
        handover:               { type: String },
        pictureOverview:        { type: String }, // required
        pictures:               { type: [String] },
        videos:                 { type: [String] },
        tags:                   { type: String },
        donationDate:           { type: Date },

        publisher:              { type: ObjectId, ref: 'User' }, // required
        donee:                  { type: ObjectId, ref: 'User' },
        category:               { type: String, ref: 'ArticleCategory' }, // required
        status:                 { type: String, ref: 'ArticleStatus' } // required
    },
    { collection: 'articles', timestamps: true }
);

articleSchema.statics.populateAllOptions = [
    { path: 'publisher', select: 'firstname lastname' },
    { path: 'donee', select: 'firstname lastname' },
    { path: 'category', select: 'name' },
    { path: 'status', select: 'name' },
];

articleSchema.query.populateAll = function() {
    return this.populate(this.model.populateAllOptions);
};


articleSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Article', articleSchema);