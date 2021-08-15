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
    const from = isMoment(req.body.from).format('MM-DD-YYYY');
    const to = isMoment(req.body.to).format('MM-DD-YYYY');
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
controller.route("/deleteReservation/:RID").delete(async(req,res)=>{
    let RID = req.params.RID; //Reservation ID taken from frontend

    const reservation = await Reservation.findOneAndDelete({reservationid : RID})
    .then((reservation)=> {
        if(reservation != null){
            res.status(200).send({status :"Reservation deleted"})
        }else{
            res.status(500).send({status : "Error with delete Reservation", error:err.message});
        }   
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status : "Error with delete Reservation", error:err.message});
    })
})

//to update the reservation details
controller.route("/updateReservation/:RID").put(async(req,res) => {
    let RID = req.params.RID;

    //we have to fetch the new updating details coming from the front end here-new feature called d structure

    const {
        //reservationid,
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
    } = req.body;//we call this as dStructure

    const updateReservation ={
        //reservationid,
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
    }//create a object containing the data that needs to be updated

       //we have to pass the primary key and then value to be passed
    const updateReserve = await Reservation.findOneAndUpdate({reservationid:RID},updateReservation)
    .then((updateReserve)=> {
        if(updateReserve != null){
            res.status(200).send({status :"Reservation updated"})//sending details of the updated data back to front end
        }else{
            res.status(500).send({status : "Error with updating Reservation", error:err.message});
        }   
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status : "Error with delete Reservation", error:err.message});
    })
})

/*controller.route("/search").post((req,res)=> {
    let userpattern = new RegExp("^"+req.body.query)
    Reservation.find({contactnumber:{$regex:userpattern}})
    .then(reservation => {
        res.json({reservation})
    }).catch(err => {
        console.log(err)
    })
})*/

module.exports = controller;