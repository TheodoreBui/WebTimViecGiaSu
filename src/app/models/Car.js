const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const { mongooseViewPrice } = require('../../util/mongoose')

mongoose.plugin(slug);

const Car = new Schema({
    tenxe: { type: String },
    giaban: { type: Number },
    bienso: { type: String },
    namsx: { type: String },
    loaixe: { type: String },
    lanbanh: { type: Number },
    videoId: { type: String },
    status: { type: String },
}, {
    timestamps: true,
});


Car.pre('save', function (next) {
    this.status = 'still';
    next();
});


Car.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
})
module.exports = mongoose.model('Car', Car);
