// Article Category model.

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const ObjectId = mongoose.Schema.ObjectId;

const articleCategorySchema = mongoose.Schema(
    {
        _id:        { type: String },
        name:       { type: String, required: true, unique: true }
    },
    { collection: 'articleCategories', timestamps: true, collation: { locale: 'de', strength: 1 } }
);

articleCategorySchema.plugin(mongoosePaginate);
module.exports = mongoose.model('ArticleCategory', articleCategorySchema);