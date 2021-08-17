"use strict";

var controller = require("express").Router();

var isMoment = require('moment');

var RemovedReservation = require("../model/RemovedReservationModel"); //insert data


controller.route("/addRemovedReservation").post(function (req, res) {
  console.log("hi", req.body.data);
  var reservationid = req.body.data.reservationid;
  var customername = req.body.data.customername;
  var contactnumber = Number(req.body.data.contactnumber);
  var customernic = req.body.data.customernic;
  var customeraddress = req.body.data.customeraddress;
  var packagename = req.body.data.packagename;
  var eventtype = req.body.data.eventtype;
  var from = isMoment(req.body.data.from).format('YYYY-MMMM-DD');
  var to = isMoment(req.body.data.to).format('YYYY-MMMM-DD');
  var discount = Number(req.body.data.discount);
  var advancedpayment = Number(req.body.data.advancedpayment);
  var totalreservation = Number(req.body.data.totalreservation);
  var status = req.body.data.status;
  var penaltyDay = Number(req.body.data.penaltyDay);
  var penaltyCharge = Number(req.body.data.penaltyCharge);
  var returnDay = isMoment(req.body.data.from).format('YYYY-MMMM-DD');
  var newRemovedReservationRecords = new RemovedReservation({
    reservationid: reservationid,
    customername: customername,
    contactnumber: contactnumber,
    customernic: customernic,
    customeraddress: customeraddress,
    packagename: packagename,
    eventtype: eventtype,
    from: from,
    to: to,
    discount: discount,
    advancedpayment: advancedpayment,
    totalreservation: totalreservation,
    status: status,
    penaltyDay: penaltyDay,
    penaltyCharge: penaltyCharge,
    returnDay: returnDay
  });
  console.log("dataaaaaaaaa", newRemovedReservationRecords);
  newRemovedReservationRecords.save().then(function () {
    console.log("data saved");
    res.status(200).send({
      message: "Reservation insert successfully"
    });
  })["catch"](function (err) {
    console.log("data not saved", err);
    res.status(300).send({
      status: "Error Reservation insertion",
      error: err.message
    });
  });
}); //retrieve all order details

controller.route("/displayRemovedReservation").get(function (req, res) {
  RemovedReservation.find().then(function (removedReservation) {
    res.json(reservations);
  })["catch"](function (err) {
    console.log(err);
  });
});
module.exports = controller;
//# sourceMappingURL=removedReservationController.dev.js.map
