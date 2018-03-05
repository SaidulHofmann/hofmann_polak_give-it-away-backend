// Reservation model.

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const ObjectId = mongoose.Schema.ObjectId;

const reservationSchema = mongoose.Schema(
    {
        articleId:              { type: ObjectId },
        userId:                 { type: ObjectId },
        commentPublisher:       { type: [String] },
        commentApplicant:       { type: [String] }
    },
    { collection: 'reservations'},
    { timestamps: true }
);

schema.statics.findByUserIdAndArticleId = function (userId, articleId, cb) {
    this.findOne({userId: userId, articleId: articleId}, function(err,reservation) {
        if (err) { return cb(err); }
        if (!reservation) { return cb(); }
        return cb(err, reservation);
    });
};

// schema.statics.findByUserIdAndArticleId = async function (userId, articleId) {
//     try {
//         let reservation = await this.findOne({userId: userId, articleId: articleId});
//         if (!reservation) { return false; }
//         return reservation;
//     } catch (ex) {
//         throw Error("Error occured while retrieving the reservation. " + ex.message);
//     }
// };



reservationSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Reservation', reservationSchema);