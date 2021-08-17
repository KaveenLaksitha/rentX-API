const controller = require("express").Router();
let Reservation = require("../model/reservationModel");
const {v4:uuidv4} = require("uuid");
const { Router } = require("express");
const isMoment  = require("moment");


//insert data
controller.route("/addReservation").post((req,res)=>{
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
    //const penaltyDay = Number(req.body.penaltyDay);
    //const penaltyCharge = Number(req.body.penaltyCharge);
    //const returnDay = isMoment(req.body.from).format('MM-DD-YYYY');

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
        //penaltyDay,
        //penaltyCharge,
        //returnDay

    })

    newReservation.save().then(()=>{
        res.status(200).send({message:"Reservation insert successfully"})
    }).catch((err)=>{
        res.status(300).send({status:"Error Reservation insertion",error: err.message});
    })
})

//retrieve all order details
controller.route("/displayReservation").get((req,res) =>{
    Reservation.find().then((reservation) => {
        res.json(reservation)
    }).catch((err)=>{
        console.log(err);
    })
})


//To retrieve the reservation details of a specific order 
controller.route("/getReservation/:RID").get(async(req,res) => {

    let RID = req.params.RID;

    const reservation = await Reservation.findOne({reservationid : RID})
    .then((reservation) =>{
        if(reservation != null){
            res.status(200).send({status :"Reservation fetched", reservation:reservation})
            //res.status(500).send({status : "Error with get Reservation", error:err.message});
        }else{
            res.status(500).send({status : "Error with get Reservation", error:err.message});
            //res.status(200).send({status :"Reservation fetched", reservation:reservation})
        }       
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status : "Error with get Reservation", error:err.message});
    })

})

//to delete a specific reservation from database
controller.route("/deleteReservation").post(async(req,res)=>{
    let RID = req.body.reservationid; //Reservation ID taken from frontend

    console.log("reservation id", RID)

    await Reservation.findOneAndDelete({reservationid : RID})
    .then(()=> {
            res.status(200).send({ status: "Reservation Record deleted" });
        }).catch(() => {
            console.log(err);
            res.status(500).send({ status: "Error with deleting reservation record", error: err.message });
        })
})

//to update the reservation details
controller.route("/updateReservation/:RID").put(async(req,res) => {
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

    const updateReservation ={
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
    const updateReserve = await Reservation.findOneAndUpdate({reservationid:RID},updateReservation)
    .then(() => {
        res.status(200).send({ status: "Reservation Record updated" })//sending details of the updated data back to front end
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Server error Error with updating data", error: err.message });
    })
})


//To get the count of the pending records
controller.route("/pendingReservationCount").get((req, res) => {

    Reservation.find({ status: /pending/ }).count().then((result) => {
        res.json(result);

    }).catch((err) => {
        console.log(err);
    })

})

//this will serach for the list of orders by a particular customer nic given at searchbox
controller.route("/searchReservationRecs/:customernic").get((req, res) => {

    let val = req.params.customernic.trim();

    //{$regex: "^" + val + ".*"}this will get to the value starting at the begining of list 
    Reservation.find({ customernic: { $regex: "^" + val + ".*", $options: 'i' } }).then((reservation) => {
        res.json(reservation);

    })
        .catch((err) => {
            console.log(err);

        })

})

//to search for an rental record based on status
controller.route("/searchReservationRecordsX/:rVal").get((req, res) => {

    let val = req.params.rVal.trim();

    //{$regex: ".*" + val + ".*"}this will get to the value anywhere in the list not just begining
    Reservation.find({ status: { $regex: ".*" + val + ".*", $options: 'i' } }).then((reservation) => {
        res.json(reservation)

    }).catch((err) => {
        console.log(err);
    })

})


//to search only pending rental record 
controller.route("/searchPendingReservationRecords").get((req, res) => {

    let val = "completed";

    //{$regex: ".*" + val + ".*"}this will get to the value anywhere in the list not just begining
    Reservation.find({ status: { $regex: ".*" + val + ".*", $options: 'i' } }).then((reservation) => {
        res.json(reservation)

    }).catch((err) => {
        console.log(err);
    })

})


module.exports = controller;