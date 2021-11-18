const controller = require("express").Router();
let Reservation = require("../model/reservationModel");
const { v4: uuidv4 } = require("uuid");
const { Router } = require("express");
const isMoment = require("moment");


//insert data for reservation
controller.route("/addReservation").post((req, res) => {
    const reservationid = uuidv4();
    const customername = req.body.customername;
    const contactnumber = Number(req.body.contactnumber);
    const nic = req.body.nic;
    const customernic = req.body.customernic;
    const customeraddress = req.body.customeraddress;
    const packagename = req.body.packagename;
    const eventtype = req.body.eventtype;
    const from = isMoment(req.body.from).format('YYYY-MMMM-DD');
    const to = isMoment(req.body.to).format('YYYY-MMMM-DD');
    const discount = Number(req.body.discount);
    const advancedpayment = Number(req.body.advancedpayment);
    const totalreservation = Number(req.body.totalreservation);
    const status = req.body.status;

    const newReservation = new Reservation({
        reservationid,
        customername,
        contactnumber,
        nic,
        customernic,
        customeraddress,
        packagename,
        eventtype,
        from,
        to,
        discount,
        advancedpayment,
        totalreservation,
        status

    })

    newReservation.save().then(() => {
        res.status(200).send({ message: "Reservation insert successfully" })
    }).catch((err) => {
        res.status(300).send({ status: "Error Reservation insertion", error: err.message });
    })
})

//retrieve all reservation details
controller.route("/displayReservation").get((req, res) => {
    Reservation.find().then((reservation) => {
        res.json(reservation)
    }).catch((err) => {
        console.log(err);
    })
})


//To retrieve the reservation details of a specific reservation id 
controller.route("/getReservation/:RID").get(async (req, res) => {

    let RID = req.params.RID;

    const reservation = await Reservation.findOne({ reservationid: RID })
        .then((reservation) => {
            if (reservation != null) {
                res.status(200).send({ status: "Reservation fetched", reservation: reservation })

            } else {
                res.status(500).send({ status: "Error with get Reservation", error: err.message });

            }
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with get Reservation", error: err.message });
        })

})

//to delete a specific reservation from database
controller.route("/deleteReservation").post(async (req, res) => {
    let RID = req.body.reservationid; //Reservation ID taken from frontend

    await Reservation.findOneAndDelete({ reservationid: RID })
        .then(() => {
            res.status(200).send({ status: "Reservation Record deleted" });
        }).catch(() => {
            console.log(err);
            res.status(500).send({ status: "Error with deleting reservation record", error: err.message });
        })
})

//to update the reservation details
controller.route("/updateReservation/:RID").put(async (req, res) => {

    let RID = req.params.RID;

    //we have to fetch the new updating details coming from the front end here-new feature called d structure

    const {
        reservationid,
        customername,
        contactnumber,
        nic,
        customernic,
        customeraddress,
        packagename,
        eventtype,
        from,
        to,
        discount,
        advancedpayment,
        totalreservation,
        status,
        penaltyDay,
        penaltyCharge,
        returnDay

    } = req.body;//we call this as dStructure

    const updateReservation = {
        //reservationid,
        RID,
        customername,
        contactnumber,
        nic,
        customernic,
        customeraddress,
        packagename,
        eventtype,
        from,
        to,
        discount,
        advancedpayment,
        totalreservation,
        status,
        penaltyDay,
        penaltyCharge,
        returnDay
    }//create a object containing the data that needs to be updated

    //we have to pass the primary key and then value to be passed
    const updateReserve = await Reservation.findOneAndUpdate({ reservationid: RID }, updateReservation)
        .then(() => {
            res.status(200).send({ status: "Reservation Record updated" })//sending details of the updated data back to front end
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Server error Error with updating data", error: err.message });
        })
})

//this route is used to find the latest three reservation to display on dashboard
controller.route("/getLatestReservationOnly").get(async (req, res) => {

    const reservation = await Reservation.find().sort({ _id: -1 }).limit(3)
        .then((reservation) => {
            res.json(reservation);
        }).catch(() => {
            console.log(err.message);
            res.status(500).send({ status: "Server error with retrieving Reservation Record", error: err.message });
        })

})

//To get the count of the pending reservation records
controller.route("/pendingReservationCount").get((req, res) => {

    Reservation.find({ status: /pending/ }).count().then((result) => {
        res.json(result);

    }).catch((err) => {
        console.log(err);
    })

})

//search by customer nic given on search box
controller.route("/searchReservationRecs/:customernic").get((req, res) => {

    let val = req.params.customernic.trim();

    Reservation.find({ customernic: { $regex: "^" + val + ".*", $options: 'i' } }).then((reservation) => {
        res.json(reservation);

    })
        .catch((err) => {
            console.log(err);

        })
})

//to search for an reservation record based on package name
controller.route("/searchReservationRecordsX/:rVal").get((req, res) => {

    let val = req.params.rVal.trim();

    Reservation.find({ packagename: { $regex: ".*" + val + ".*", $options: 'i' } }).then((reservation) => {
        res.json(reservation)

    }).catch((err) => {
        console.log(err);
    })

})


//seach completed rental records to delete from lest
controller.route("/searchCompletedReservationRecords").get((req, res) => {

    let val = "completed";

    Reservation.find({ status: { $regex: ".*" + val + ".*", $options: 'i' } }).then((reservation) => {
        res.json(reservation)

    }).catch((err) => {
        console.log(err);
    })

})

//to search for the list of reservation records on the current
controller.route("/VehiclesReservationToday").get((req, res) => {

    let val = isMoment().format('YYYY-MMMM-DD');

    let status = "Pending"

    Reservation.count({ $and: [{ from: { $regex: "^" + val + ".*" }, status: { $regex: "^" + status + ".*" } }] }).then((reservation) => {
        res.json(reservation);

    })
        .catch((err) => {
            console.log(err);
        })
})

/******functions to be used within the report handling*******/
controller.route("/generateReport/:rFrom/:rTo/:rPackageType/:rEventType").get((req, res) => {

    let rFrom = isMoment(req.params.rFrom.trim()).format('YYYY-MMMM-DD');
    let rTo = isMoment(req.params.rTo.trim()).format('YYYY-MMMM-DD');
    let rPackageType = req.params.rPackageType;
    let rEventType = req.params.rEventType;
    let status = "Pending";

    console.log("resuest", req.params);
    console.log("dates", rFrom)

    if (rPackageType == "null" && rEventType == "null") {
        Reservation.find({
            $and: [{
                from: { $gte: rFrom },
                to: { $lte: rTo },
                status: { $regex: "^" + status + ".*" },
            }]
        })
            .then((reservation) => {
                res.json(reservation);
            })
            .catch((err) => {
                console.log(err);
            })
    } else if (rPackageType == "null") {
        Reservation.find({
            $and: [{
                from: { $gte: rFrom },
                to: { $lte: rTo },
                eventtype: { $regex: ".*" + rEventType + ".*" },
                status: { $regex: "^" + status + ".*" },
            }]
        })
            .then((reservation) => {
                res.json(reservation);
            })
            .catch((err) => {
                console.log(err);
            })

    } else if (rEventType == "null") {
        Reservation.find({
            $and: [{
                from: { $gte: rFrom },
                to: { $lte: rTo },
                packagename: { $regex: "^" + rPackageType + ".*" },
                status: { $regex: "^" + status + ".*" },
            }]
        })
            .then((reservation) => {
                res.json(reservation);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    else {

        Reservation.find({
            $and: [{
                from: { $gte: rFrom },
                to: { $lte: rTo },
                packagename: { $regex: "^" + rPackageType + ".*" },
                eventtype: { $regex: ".*" + rEventType + ".*" },
                status: { $regex: "^" + status + ".*" },
            }]
        })
            .then((reservation) => {
                res.json(reservation);
            })
            .catch((err) => {
                console.log(err);
            })
    }
})


module.exports = controller;
