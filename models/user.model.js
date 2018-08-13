// User model with definition of collection, document schema and functions.

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const ObjectId = mongoose.Schema.ObjectId;

const userSchema = mongoose.Schema(
    {
        email:      { type: String, required: true, unique: true, index: true },
        password:   { type: String, required: true },
        firstname:  { type: String, required: true },
        lastname:   { type: String, required: true },
        authToken:  { type: String, default: '' },
        permission: { type: ObjectId, ref: 'Permission', required: true }

    },
    { collection: 'users', timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true }, collation: { locale: 'de', strength: 1 } }
);

userSchema.virtual('fullname').
   get(function() {
       return this.firstname + ' ' + this.lastname;
   });

userSchema.statics.populateAllOptions = [
    { path: 'permission' }
];

userSchema.query.populateAll = function() {
    return this.populate(this.model.populateAllOptions);
};

userSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('User', userSchema);