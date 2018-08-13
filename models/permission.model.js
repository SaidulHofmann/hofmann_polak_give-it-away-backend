// Permission model.

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const permissionSchema = mongoose.Schema(
    {
        name:                   { type: String, required: true, unique: true, index: true, trim: true },
        isPredefined:           { type: Boolean, required: true, default: false },

        articleOwnCreate:       { type: Boolean, required: true, default: true },
        articleOwnUpdate:       { type: Boolean, required: true, default: true },
        articleOwnDelete:       { type: Boolean, required: true, default: true },
        articleOwnDonate:       { type: Boolean, required: true, default: true },

        articleOtherUpdate:     { type: Boolean, required: true, default: false },
        articleOtherDelete:     { type: Boolean, required: true, default: false },
        articleOtherDonate:     { type: Boolean, required: true, default: false },

        userCreate:             { type: Boolean, required: true, default: false },
        userRead:               { type: Boolean, required: true, default: false },
        userUpdate:             { type: Boolean, required: true, default: false },
        userDelete:             { type: Boolean, required: true, default: false },

        permissionCreate:       { type: Boolean, required: true, default: false },
        permissionRead:         { type: Boolean, required: true, default: false },
        permissionUpdate:       { type: Boolean, required: true, default: false },
        permissionDelete:       { type: Boolean, required: true, default: false },
    },
    { collection: 'permissions', timestamps: true, collation: { locale: 'de', strength: 1 } }
);

permissionSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Permission', permissionSchema);