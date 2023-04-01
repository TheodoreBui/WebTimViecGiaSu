const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

mongoose.plugin(slug);

const Car = new Schema({
    tenxe: {type: String},
    bienso: {type: String},
    namsx: {type: String},
    videoId: {type: String},
    giaban: {type: Number},
    sdt: {type: String},
    diachi: {type: String},
    slogan: {type: String},
    nguoiban: {type: String},
    viewPrice: {type: String},
},{
    timestamps: true,
});

Car.plugin(mongooseDelete,{
    overrideMethods: 'all',
    deletedAt: true,
})
module.exports = mongoose.model('Car',Car);
