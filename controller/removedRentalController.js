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
    const pickAddress = req.body.pickAddress;
    const addPrice = Number(req.body.addPrice);
    const advPayment = Number(req.body.advPayment);
    const finalPrice = Number(req.body.finalPrice);
    const customerName = req.body.customerName;
    const customerNIC = req.body.customerNIC;
    const customerAdd = req.body.customerAdd;
    const contactNo = Number(req.body.contactNo);
    const NICcopy = req.body.NICcopy;



    const newRemovedRentalRec = new RemovedRental({
        id,
        from,
        to,
        status,
        payment,
        vehicleType,
        model,
        pickAddress,
        addPrice,
        advPayment,
        finalPrice,
        customerName,
        customerNIC,
        customerAdd,
        contactNo,
        NICcopy

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
router.route("/displayRentals").get((req, res) => {

    Rental.find().then((rental) => {
        res.json(rental)

    }).catch((err) => {
        console.log(err);
    })
})