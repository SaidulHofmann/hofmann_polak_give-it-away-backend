// Reservation model.

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const ObjectId = mongoose.Schema.ObjectId;

const reservationSchema = mongoose.Schema(
    {
        article:                { type: ObjectId, ref: 'Article' },
        user:                   { type: ObjectId, ref: 'User' },
        commentPublisher:       { type: String },
        commentApplicant:       { type: String }
    },
    { collection: 'reservations', timestamps: true, collation: { locale: 'de', strength: 1 } }
);

reservationSchema.index({ article: 1, user: 1 }, { unique: true });

reservationSchema.statics.populateAllOptions = [
    { path: 'article', select: 'name' },
    { path: 'user', select: 'firstname lastname fullname' },
];

reservationSchema.query.populateAll = function() {
    return this.populate(this.model.populateAllOptions);
};

reservationSchema.statics.findByUserIdAndArticleId = async function (userId, articleId) {
    try {
        let reservation = await this.findOne({user: userId, article: articleId}).populateAll();
        if (!reservation) { return false; }
        return reservation;
    } catch (ex) {
        throw ex;
    }
};



reservationSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Reservation', reservationSchema);