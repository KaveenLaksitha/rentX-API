"use strict";

var controller = require("express").Router();

var Reservation = require("../model/reservationModel");

var _require = require("uuid"),
    uuidv4 = _require.v4;

var _require2 = require("express"),
    Router = _require2.Router;

var isMoment = require("moment"); //insert data


controller.route("/addReservation").post(function (req, res) {
  var reservationid = uuidv4();
  var customername = req.body.customername;
  var contactnumber = Number(req.body.contactnumber);
  var nic = req.body.nic;
  var customernic = req.body.customernic;
  var customeraddress = req.body.customeraddress;
  var packagename = req.body.packagename;
  var eventtype = req.body.eventtype;
  var from = isMoment(req.body.from).format('YYYY-MMMM-DD');
  var to = isMoment(req.body.to).format('YYYY-MMMM-DD');
  var discount = Number(req.body.discount);
  var advancedpayment = Number(req.body.advancedpayment);
  var totalreservation = Number(req.body.totalreservation);
  var status = req.body.status; //const penaltyDay = Number(req.body.penaltyDay);
  //const penaltyCharge = Number(req.body.penaltyCharge);
  //const returnDay = isMoment(req.body.from).format('MM-DD-YYYY');

  var newReservation = new Reservation({
    reservationid: reservationid,
    customername: customername,
    contactnumber: contactnumber,
    nic: nic,
    customernic: customernic,
    customeraddress: customeraddress,
    packagename: packagename,
    eventtype: eventtype,
    from: from,
    to: to,
    discount: discount,
    advancedpayment: advancedpayment,
    totalreservation: totalreservation,
    status: status //penaltyDay,
    //penaltyCharge,
    //returnDay

  });
  newReservation.save().then(function () {
    res.status(200).send({
      message: "Reservation insert successfully"
    });
  })["catch"](function (err) {
    res.status(300).send({
      status: "Error Reservation insertion",
      error: err.message
    });
  });
}); //retrieve all order details

controller.route("/displayReservation").get(function (req, res) {
  Reservation.find().then(function (reservation) {
    res.json(reservation);
  })["catch"](function (err) {
    console.log(err);
  });
}); //To retrieve the reservation details of a specific order 

controller.route("/getReservation/:RID").get(function _callee(req, res) {
  var RID, reservation;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          RID = req.params.RID;
          _context.next = 3;
          return regeneratorRuntime.awrap(Reservation.findOne({
            reservationid: RID
          }).then(function (reservation) {
            if (reservation != null) {
              res.status(200).send({
                status: "Reservation fetched",
                reservation: reservation
              }); //res.status(500).send({status : "Error with get Reservation", error:err.message});
            } else {
              res.status(500).send({
                status: "Error with get Reservation",
                error: err.message
              }); //res.status(200).send({status :"Reservation fetched", reservation:reservation})
            }
          })["catch"](function (err) {
            console.log(err.message);
            res.status(500).send({
              status: "Error with get Reservation",
              error: err.message
            });
          }));

        case 3:
          reservation = _context.sent;

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}); //to delete a specific reservation from database

controller.route("/deleteReservation").post(function _callee2(req, res) {
  var RID;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          RID = req.body.reservationid; //Reservation ID taken from frontend

          console.log("reservation id", RID);
          _context2.next = 4;
          return regeneratorRuntime.awrap(Reservation.findOneAndDelete({
            reservationid: RID
          }).then(function () {
            res.status(200).send({
              status: "Reservation Record deleted"
            });
          })["catch"](function () {
            console.log(err);
            res.status(500).send({
              status: "Error with deleting reservation record",
              error: err.message
            });
          }));

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}); //to update the reservation details

controller.route("/updateReservation/:RID").put(function _callee3(req, res) {
  var RID, _req$body, reservationid, customername, contactnumber, nic, customernic, customeraddress, packagename, eventtype, from, to, discount, advancedpayment, totalreservation, status, penaltyDay, penaltyCharge, returnDay, updateReservation, updateReserve;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          RID = req.params.RID; //we have to fetch the new updating details coming from the front end here-new feature called d structure

          _req$body = req.body, reservationid = _req$body.reservationid, customername = _req$body.customername, contactnumber = _req$body.contactnumber, nic = _req$body.nic, customernic = _req$body.customernic, customeraddress = _req$body.customeraddress, packagename = _req$body.packagename, eventtype = _req$body.eventtype, from = _req$body.from, to = _req$body.to, discount = _req$body.discount, advancedpayment = _req$body.advancedpayment, totalreservation = _req$body.totalreservation, status = _req$body.status, penaltyDay = _req$body.penaltyDay, penaltyCharge = _req$body.penaltyCharge, returnDay = _req$body.returnDay; //we call this as dStructure

          updateReservation = {
            //reservationid,
            RID: RID,
            customername: customername,
            contactnumber: contactnumber,
            nic: nic,
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
          }; //create a object containing the data that needs to be updated
          //we have to pass the primary key and then value to be passed

          _context3.next = 5;
          return regeneratorRuntime.awrap(Reservation.findOneAndUpdate({
            reservationid: RID
          }, updateReservation).then(function () {
            res.status(200).send({
              status: "Reservation Record updated"
            }); //sending details of the updated data back to front end
          })["catch"](function (err) {
            console.log(err);
            res.status(500).send({
              status: "Server error Error with updating data",
              error: err.message
            });
          }));

        case 5:
          updateReserve = _context3.sent;

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
}); //To get the count of the pending records

controller.route("/pendingReservationCount").get(function (req, res) {
  Reservation.find({
    status: /pending/
  }).count().then(function (result) {
    res.json(result);
  })["catch"](function (err) {
    console.log(err);
  });
}); //this will serach for the list of orders by a particular customer nic given at searchbox

controller.route("/searchReservationRecs/:customernic").get(function (req, res) {
  var val = req.params.customernic.trim(); //{$regex: "^" + val + ".*"}this will get to the value starting at the begining of list 

  Reservation.find({
    customernic: {
      $regex: "^" + val + ".*",
      $options: 'i'
    }
  }).then(function (reservation) {
    res.json(reservation);
  })["catch"](function (err) {
    console.log(err);
  });
}); //to search for an rental record based on status

controller.route("/searchReservationRecordsX/:rVal").get(function (req, res) {
  var val = req.params.rVal.trim(); //{$regex: ".*" + val + ".*"}this will get to the value anywhere in the list not just begining

  Reservation.find({
    status: {
      $regex: ".*" + val + ".*",
      $options: 'i'
    }
  }).then(function (reservation) {
    res.json(reservation);
  })["catch"](function (err) {
    console.log(err);
  });
}); //to search only pending rental record 

controller.route("/searchPendingReservationRecords").get(function (req, res) {
  var val = "completed"; //{$regex: ".*" + val + ".*"}this will get to the value anywhere in the list not just begining

  Reservation.find({
    status: {
      $regex: ".*" + val + ".*",
      $options: 'i'
    }
  }).then(function (reservation) {
    res.json(reservation);
  })["catch"](function (err) {
    console.log(err);
  });
});
module.exports = controller;
//# sourceMappingURL=reservationController.dev.js.map
