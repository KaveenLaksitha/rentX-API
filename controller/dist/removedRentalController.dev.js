"use strict";

var router = require("express").Router();

var moment = require('moment');

var RemovedRental = require("../model/RemovedRentalModel"); //To add the deatils for an unique rental record


router.route("/addRemovedRentalRec").post(function (req, res) {
  var id = req.body.id;
  var from = moment(req.body.from).format('YYYY-MMMM-DD');
  var to = moment(req.body.to).format('YYYY-MMMM-DD');
  var status = req.body.status;
  var payment = req.body.payment;
  var vehicleType = req.body.vehicleType;
  var model = req.body.model;
  var advPayment = Number(req.body.advPayment);
  var finalPrice = Number(req.body.finalPrice);
  var customerName = req.body.customerName;
  var customerNIC = req.body.customerNIC;
  var contactNo = Number(req.body.contactNo);
  var penaltyDays = Number(req.body.penaltyDays);
  var penaltyCharges = Number(req.body.penaltyCharges);
  var returnDate = moment(req.body.returnDate).format('YYYY-MMMM-DD');
  var newRemovedRentalRec = new RemovedRental({
    id: id,
    from: from,
    to: to,
    status: status,
    payment: payment,
    vehicleType: vehicleType,
    model: model,
    advPayment: advPayment,
    finalPrice: finalPrice,
    customerName: customerName,
    customerNIC: customerNIC,
    contactNo: contactNo,
    penaltyDays: penaltyDays,
    penaltyCharges: penaltyCharges,
    returnDate: returnDate
  });
  newRemovedRentalRec.save().then(function () {
    //pass the object to database if successful
    //res.json("Rental Record is Added")//from jason format a response sent to front end
    res.status(200).send({
      message: "Removed Rental Record is Added"
    });
  })["catch"](function (err) {
    //error or exception handling
    //console.log(err);
    res.status(300).send({
      status: "Error in Rental Record Insertion",
      error: err.message
    });
  });
}); //To retrieve all the rental record details in database

router.route("/displayRemovedRentalsList").get(function (req, res) {
  RemovedRental.find().then(function (removedRental) {
    res.json(rental);
  })["catch"](function (err) {
    console.log(err);
  });
});
module.exports = router;
//# sourceMappingURL=removedRentalController.dev.js.map
