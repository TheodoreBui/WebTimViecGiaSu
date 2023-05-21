const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

mongoose.plugin(slug);

const Contract = new Schema({
    maKh: {type: String},
    tenKh: {type: String},
    tenXe: {type: String},
    bienso: {type: String},
    giaban: {type: String},
    namsx: {type: String},
    videoId: {type: String}
},{
    timestamps: true,
});

Contract.plugin(mongooseDelete,{
    overrideMethods: 'all',
    deletedAt: true,
})

module.exports = mongoose.model('Contract',Contract);
