// User model with definition of collection, document schema and functions.

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const userSchema = mongoose.Schema(
    {
        email:      { type: String, reqiured: true, unique: true, index: true },
        password:   { type: String, required: true },
        firstname:  { type: String, required: true },
        lastname:   { type: String, required: true },
        authToken:  { type: String, default: '' }

    },
    { collection: 'users', timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true }  }
);

userSchema.virtual('fullname').
   get(function() {
       return this.firstname + ' ' + this.lastname;
   });

userSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('User', userSchema);