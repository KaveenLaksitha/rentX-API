const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resSchema = new Schema({

    empId: { type: String },
    fName: { type: String },
    lName: { type: String },
    gender: { type: String },
    DOB: { type: String },
    email: { type: String },
    nic: { type: String, unique: true },
    designation: { type: String },
    mobileNo: { type: Number },
    resReason: { type: String }

});

const Resignation = mongoose.model('Resignation', resSchema)
module.exports = Resignation;