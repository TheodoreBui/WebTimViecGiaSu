const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

mongoose.plugin(slug);

const User = new Schema({
    sdt: {type: Number},
    password: {type: String},
    ten: {type: String},
    diachi: {type: String},
    tuoi: {type: Number},
},{
    timestamps: true,
});

User.plugin(mongooseDelete,{
    overrideMethods: 'all',
    deletedAt: true,
})
module.exports = mongoose.model('User',User);
