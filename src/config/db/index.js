const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/thuc_tap_co_so',{
            
        });
        console.log("ket noi mongoDB thanh cong");
    } catch (error) {
        console.log(error);
    }
}

module.exports = { connect }
