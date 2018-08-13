// Article model with definition of collection, document schema and functions.

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const ObjectId = mongoose.Schema.ObjectId;

const articleSchema = mongoose.Schema(
    {
        name:                   { type: String, required: true, index: true, trim: true },
        description:            { type: String, required: true, trim: true },
        handover:               { type: String, required: true, trim: true },
        pictureOverview:        { type: String, trim: true}, // required
        pictures:               { type: [String] },
        videos:                 { type: [String] },
        tags:                   { type: String, trim: true },
        donationDate:           { type: Date },

        publisher:              { type: ObjectId, ref: 'User', required: true },
        donee:                  { type: ObjectId, ref: 'User' },
        category:               { type: String, ref: 'ArticleCategory', required: true },
        status:                 { type: String, ref: 'ArticleStatus', required: true }
    },
    { collection: 'articles', timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true }, collation: { locale: 'de', strength: 1 } }
);

articleSchema.statics.populateAllOptions = [
    { path: 'publisher', select: 'firstname lastname fullname' },
    { path: 'donee', select: 'firstname lastname fullname' },
    { path: 'category', select: 'name' },
    { path: 'status', select: 'name' },
];

articleSchema.virtual('userHasReservation').
    get(function() { return this._hasReservation; }).
    set(function(hasReservation) { this._hasReservation = hasReservation;
    });

articleSchema.virtual('usersReservation').
    get(function() { return this._reservation; }).
    set(function(newReservation) { this._reservation = newReservation;
    });

articleSchema.query.populateAll = function() {
    return this.populate(this.model.populateAllOptions);
};


articleSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Article', articleSchema);