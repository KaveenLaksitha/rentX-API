const router = require("express").Router();
const moment = require('moment');
let RemovedRental = require("../model/RemovedRentalModel");


//To add the deatils for an unique rental record
router.route("/addRemovedRentalRec").post((req, res) => {

    const id = req.body.id;
    const from = moment(req.body.from).format('YYYY-MMMM-DD');
    const to = moment(req.body.to).format('YYYY-MMMM-DD');
    const status = req.body.status;
    const payment = req.body.payment;
    const vehicleType = req.body.vehicleType;
    const model = req.body.model;
    const advPayment = Number(req.body.advPayment);
    const finalPrice = Number(req.body.finalPrice);
    const customerName = req.body.customerName;
    const customerNIC = req.body.customerNIC;
    const contactNo = Number(req.body.contactNo);
    const penaltyDays = Number(req.body.penaltyDays)
    const penaltyCharges = Number(req.body.penaltyCharges)
    const returnDate = moment(req.body.returnDate).format('YYYY-MMMM-DD')


    const newRemovedRentalRec = new RemovedRental({
        id,
        from,
        to,
        status,
        payment,
        vehicleType,
        model,
        advPayment,
        finalPrice,
        customerName,
        customerNIC,
        contactNo,
        penaltyDays,
        penaltyCharges,
        returnDate
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
router.route("/displayRemovedRentalsList").get((req, res) => {

    RemovedRental.find().then((removedRental) => {
        res.json(rental)

    }).catch((err) => {
        console.log(err);
    })
})

module.exports = router;