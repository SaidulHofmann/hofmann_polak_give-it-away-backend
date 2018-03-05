// Article model with definition of collection, document schema and functions.

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const ObjectId = mongoose.Schema.ObjectId;

const articleSchema = mongoose.Schema(
    {
        name:                   { type: String, required: true, index: true, trim: true },
        description:            { type: String },
        pictureOverview:        { type: String }, // required
        pictures:               { type: [String] },
        videos:                 { type: [String] },
        handover:               { type: String },
        donationDate:           { type: Date },
        searchwords:            { type: [String] },

        userIdPublisher:        { type: ObjectId }, // required
        userIdDonee:            { type: ObjectId },
        articleCategoryId:      { type: String }, // required
        articleStatusId:        { type: String }
    },
    { collection: 'articles'},
    { timestamps: true }
);

articleSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Article', articleSchema);