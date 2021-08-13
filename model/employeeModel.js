const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const empSchema = new Schema({

    empId: { type: String },
    fName: { type: String },
    lName: { type: String },
    gender: { type: String },
    DOB: { type: String },
    email: { type: String },
    maritalStat: { type: String },
    nic: { type: String, unique: true },
    designation: { type: String },
    currAdd: { type: String },
    permAdd: { type: String },
    mobileNo: { type: Number },
    emgContact: { type: Number },
    empPic: { type: String },
    cv: { type: String }

});

const Employee = mongoose.model('Employee', empSchema)
module.exports = Employee;