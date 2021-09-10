const router = require("express").Router();
const moment = require('moment');
let RemovedRental = require("../model/RemovedRentalModel");


//To add the deatils for an unique rental record
router.route("/addRemovedRentalRec").post((req, res) => {
    console.log("Remove record dataaaaaaaaa", req.body);
    const id = req.body.data.id;
    const from = moment(req.body.data.from).format('YYYY-MMMM-DD');
    const to = moment(req.body.data.to).format('YYYY-MMMM-DD');
    const returnDate = moment(req.body.data.returnDate).format('YYYY-MMMM-DD');
    const status = req.body.data.status;
    const vehicleType = req.body.data.vehicleType;
    const model = req.body.data.model;
    const finalPrice = Number(req.body.data.finalPrice);
    const customerName = req.body.data.customerName;
    const customerNIC = req.body.data.customerNIC;
    const contactNo = Number(req.body.data.contactNo);
    const penaltyCharges = Number(req.body.data.penaltyCharges);
    const penaltyDay = Number(req.body.data.penDay);
    const lastPaid = Number(req.body.data.lastPaid);

    const newRemovedRentalRec = new RemovedRental({
        id,
        from,
        to,
        returnDate,
        status,
        vehicleType,
        model,
        finalPrice,
        customerName,
        customerNIC,
        contactNo,
        penaltyCharges,
        penaltyDay,
        lastPaid


    })

    newRemovedRentalRec.save().then(() => {//pass the object to database if successful
        //res.json("Rental Record is Added")//from jason format a response sent to front end
        res.status(200).send({ message: "Removed Rental Record is Added" })
    }).catch((err) => {//error or exception handling
        //console.log(err);
        res.status(300).send({ status: "Error in Rental Record Insertion", error: err.message });
    })

})

//To retrieve all the rental record details in database
router.route("/displayRemovedRentals").get((req, res) => {

    RemovedRental.find().then((removedRental) => {
        res.json(removedRental)

    }).catch((err) => {
        console.log(err);
    })
})

//to search for the list of returned renting records on the current date
router.route("/VehiclesReturnedToday").get((req, res) => {

    let val = moment().format('YYYY-MMMM-DD');

    RemovedRental.count({ returnDate: { $regex: "^" + val + ".*" } }).then((rentals) => {
        res.json(rentals);

    })
        .catch((err) => {
            console.log(err);

        })

})


/******functions to be used within the report handling*******/
router.route("/generateReport/:rFrom/:rTo/:rvehicleType/:rCustomerName").get((req, res) => {

    let rFrom = moment(req.params.rFrom.trim()).format('YYYY-MMMM-DD');
    let rTo = moment(req.params.rTo.trim()).format('YYYY-MMMM-DD');
    let rvehicleType = req.params.rvehicleType;
    let rCustomerName = req.params.rCustomerName;
    let status = "Completed";

    console.log("request", req.params);

    if (rCustomerName == "null" && rvehicleType == "null") {//incase if the vehicle type and customer name is not available
        RemovedRental.find({
            $and: [{
                from: { $regex: "^" + rFrom + ".*" },
                to: { $regex: "^" + rTo + ".*" },
                status: { $regex: "^" + status + ".*" },
            }]
        })
            .then((rentals) => {
                res.json(rentals);
            })
            .catch((err) => {
                console.log(err);
            })
    } else if (rvehicleType == "null") {//incase if the vehicle type is not available
        RemovedRental.find({
            $and: [{
                from: { $regex: "^" + rFrom + ".*" },
                to: { $regex: "^" + rTo + ".*" },
                customerName: { $regex: ".*" + rCustomerName + ".*" },
                status: { $regex: "^" + status + ".*" },
            }]
        })
            .then((rentals) => {
                res.json(rentals);
            })
            .catch((err) => {
                console.log(err);
            })

    } else if (rCustomerName == "null") {//incase if the  customer name is not available
        RemovedRental.find({
            $and: [{
                from: { $regex: "^" + rFrom + ".*" },
                to: { $regex: "^" + rTo + ".*" },
                vehicleType: { $regex: "^" + rvehicleType + ".*" },
                status: { $regex: "^" + status + ".*" },
            }]
        })
            .then((rentals) => {
                res.json(rentals);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    else {

        RemovedRental.find({
            $and: [{
                from: { $regex: "^" + rFrom + ".*" },
                to: { $regex: "^" + rTo + ".*" },
                vehicleType: { $regex: "^" + rvehicleType + ".*" },
                customerName: { $regex: ".*" + rCustomerName + ".*" },
                status: { $regex: "^" + status + ".*" },
            }]
        })
            .then((rentals) => {
                res.json(rentals);
            })
            .catch((err) => {
                console.log(err);
            })
    }
})






module.exports = router;
