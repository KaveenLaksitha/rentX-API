"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var reservationSchema = new Schema({
  reservationid: {
    type: String,
    required: true,
    unique: true
  },
  customername: {
    type: String,
    required: true,
    maxlength: 100
  },
  contactnumber: {
    type: Number,
    required: true,
    maxlength: 10,
    minlength: 10
  },
  nic: {
    type: String
  },
  customernic: {
    type: String,
    required: true
  },
  customeraddress: {
    type: String,
    maxlength: 200
  },
  packagename: {
    type: String,
    required: true
  },
  eventtype: {
    type: String,
    require: true
  },
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  discount: {
    type: Number,
    required: true
  },
  advancedpayment: {
    type: Number,
    required: true
  },
  totalreservation: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    "enum": ['Pending', 'Completed'],
    required: true
  },
  penaltyDay: {
    type: Number
  },
  penaltyCharge: {
    type: Number
  },
  returnDay: {
    type: String
  }
});
var reservation = mongoose.model("reservations", reservationSchema);
module.exports = reservation;
//# sourceMappingURL=reservationModel.dev.js.map
