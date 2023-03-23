const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

mongoose.plugin(slug);

const Car = new Schema({
    ten: {type: String},
    bienso: {type: String},
    sokm: {type: Number},
    nam: {type: String},
    videoId: {type: String},
    hang: {type: String},
    gia: {type: Number},
    slug: {type: String,slug:'name'}
},{
    timestamps: true,
});

Car.plugin(mongooseDelete,{
    overrideMethods: 'all',
    deletedAt: true,
})
module.exports = mongoose.model('Car',Car);
