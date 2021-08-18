const controller = require("express").Router();
const isMoment = require('moment');
let RemovedReservation = require("../model/RemovedReservationModel");


//insert data
controller.route("/addRemovedReservation").post((req,res)=>{
    console.log("hi",req.body.data);
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
    const returnDay = isMoment(req.body.data.from).format('YYYY-MMMM-DD');

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

    console.log("dataaaaaaaaa",newRemovedReservationRecords)

    newRemovedReservationRecords.save().then(()=>{
        console.log("data saved")
        res.status(200).send({message:"Reservation insert successfully"})
        
    }).catch((err)=>{
        console.log("data not saved", err)
        res.status(300).send({status:"Error Reservation insertion",error: err.message});
    })
})

//retrieve all order details
controller.route("/displayRemovedReservation").get((req,res) =>{
    RemovedReservation.find().then((removedReservation) => {
        res.json(reservations)
    }).catch((err)=>{
        console.log(err);
    })
})

module.exports = controller;

