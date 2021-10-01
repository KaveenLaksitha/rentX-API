const controller = require("express").Router();
const isMoment = require('moment');
let RemovedReservation = require("../model/RemovedReservationModel");


//insert data ro completed reservation record
controller.route("/addRemovedReservation").post((req,res)=>{
    const reservationid =  req.body.data.reservationid;
    const customername = req.body.data.customername;
    const contactnumber = Number(req.body.data.contactnumber);
    const customernic = req.body.data.customernic;
    const customeraddress = req.body.data.customeraddress;
    const packagename = req.body.data.packagename;
    const eventtype = req.body.data.eventtype;
    const from = isMoment(req.body.data.from).format('YYYY-MMMM-DD');
    const to = isMoment(req.body.data.to).format('YYYY-MMMM-DD');
    const discount = Number(req.body.data.discount);
    const advancedpayment = Number(req.body.data.advancedpayment);
    const totalreservation = Number(req.body.data.totalreservation);
    const status = req.body.data.status;
    const penaltyDay = Number(req.body.data.penaltyDay);
    const penaltyCharge = Number(req.body.data.penaltyCharge);
    const returnDay = isMoment(req.body.data.returnDay).format('YYYY-MMMM-DD');

    const newRemovedReservationRecords = new RemovedReservation({
        reservationid,
        customername,
        contactnumber,
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

    })


    newRemovedReservationRecords.save().then(()=>{
        console.log("data saved")
        res.status(200).send({message:"Reservation insert successfully"})
        
    }).catch((err)=>{
        console.log("data not saved", err)
        res.status(300).send({status:"Error Reservation insertion",error: err.message});
    })
})

//retrieve all reservation details
controller.route("/displayRemovedReservation").get((req,res) =>{
    RemovedReservation.find().then((removedReservation) => {
        res.json(removedReservation)
    }).catch((err)=>{
        console.log(err);
    })
})

//find today completed reservation based on past record list
controller.route("/VehiclesReservationToday").get((req, res) => {

    let val = isMoment().format('YYYY-MMMM-DD');

    RemovedReservation.count({ returnDay: { $regex: "^" + val + ".*" } }).then((removedReservation) => {
        res.json(removedReservation);

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
    let status = "Completed";

    console.log("resuest", req.params);
    console.log("dates", rFrom)

    if (rPackageType == "null" && rEventType == "null") {
        RemovedReservation.find({
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
        RemovedReservation.find({
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
        RemovedReservation.find({
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

        RemovedReservation.find({
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

