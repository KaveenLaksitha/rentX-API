const router = require("express").Router();
const moment = require('moment');
const { v4: uuidv4 } = require("uuid");
let Rental = require("../model/RentalModel");


//To add the deatils for an unique rental record
router.route("/addRentalRec").post((req, res) => {

    const id = uuidv4();
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



    const newRentalRec = new Rental({
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

    newRentalRec.save().then(() => {//pass the object to database if successful
        //res.json("Rental Record is Added")//from jason format a response sent to front end
        res.status(200).send({ message: "Rental Record is Added" })
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


//To retrieve the rental record details of a specific rental 
router.route("/getRentalByID/:rID").get(async (req, res) => {

    let rID = req.params.rID;//rental id taken from front end

    const rental = await Rental.findOne({ id: rID })
        .then((rental) => {
            if (rental == null) {
                res.status(200).send({ status: "No Rental Record Retrieved" })
            }
            else {
                res.status(200).send({ status: "Rental Record Retrieved", rental: rental })
            }
        }).catch(() => {
            console.log(err.message);
            res.status(500).send({ status: "Server error", error: err.message });
        })

})


//to get all the rental records of a particular customer
router.route("/getRentalRecordByCustomer/:nic").get(async (req, res) => {

    let NIC = req.params.nic;//nic taken from frontend

    const rental = await Rental.findOne({ customerNIC: NIC })
        .then((rental) => {
            if (rental == null) {
                res.status(200).send({ status: "No Rental Record Retrieved" })
            }
            else {
                res.status(200).send({ status: "Rental Record Retrieved", rental: rental })
            }
        }).catch(() => {
            console.log(err.message);
            res.status(500).send({ status: "Server error", error: err.message });
        })

})


//To delete a specific rental record from database
router.route("/deleteRental").post(async (req, res) => {

    let rID = req.body.data.id;//rental id taken from frontend
    await Rental.findOneAndDelete({ id: rID })
        .then(() => {
            res.status(200).send({ status: "Rental Record deleted" });
        }).catch(() => {
            console.log(err);
            res.status(500).send({ status: "Error with deleting rental record", error: err.message });
        })


})

//To update the rental record deails
router.route("/updateRental/:rID").put(async (req, res) => {
    console.log(req.body);
    let rID = req.params.rID;//rentalId taken from the frontend

    const penaltyDays = req.body.penDay;
    const lastPaid = req.body.rem;

    const { id, from, to, status, payment, vehicleType, model, pickAddress, addPrice, advPayment, finalPrice, customerName, customerNIC, customerAdd, contactNo, NICcopy,
        penaltyCharges,
        returnDate } = req.body;//we call this as dStructure

    const updateRental = {
        rID, from, to, status, payment, vehicleType, model, pickAddress, addPrice, advPayment, finalPrice, customerName, customerNIC, customerAdd, contactNo, NICcopy, penaltyDays, penaltyCharges, returnDate, lastPaid
    }

    const update = await Rental.findOneAndUpdate({ id: rID }, updateRental)
        .then(() => {
            res.status(200).send({ status: "Rental Record updated" })//sending details of the updated data back to front end
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Server error Error with updating data", error: err.message });
        })

})

//this route is used to find the last added order details
router.route("/getLatestRental").get(async (req, res) => {

    const rental = await Rental.find().sort({ _id: -1 }).limit(5)
        .then((rental) => {
            res.status(200).send({ status: "Rental fetched", rental: rental })
        }).catch(() => {
            console.log(err.message);
            res.status(500).send({ status: "Server error with retrieving Rental Record", error: err.message });
        })

})

//To get the count of the pending records
router.route("/pendingRentalCount").get((req, res) => {

    Rental.find({ status: /pending/ }).count().then((result) => {
        res.json(result);

    }).catch((err) => {
        console.log(err);
    })

})

/*/**** List of search methods are below*/

//this will serach for the list of orders by a particular customer nic given at searchbox
router.route("/searchRentalRecs/:nic").get((req, res) => {

    let val = req.params.nic.trim();
    Rental.find({ customerNIC: { $regex: "^" + val + ".*", $options: 'i' } }).then((rentals) => {
        res.json(rentals);
    })
        .catch((err) => {
            console.log(err);
        })
})


//to search for an rental record based on status either pending or completed at search box
router.route("/searchRentalRecordsX/:rVal").get((req, res) => {

    let val = req.params.rVal.trim();

    Rental.find({ status: { $regex: ".*" + val + ".*", $options: 'i' } }).then((rentals) => {
        res.json(rentals)

    }).catch((err) => {
        console.log(err);
    })

})

//to search for an rental record based on from or to dates at search box
router.route("/searchByFromDate/:rDate").get((req, res) => {

    let val = req.params.rDate.trim();

    Rental.find({ from: { $regex: "^" + val + ".*", $options: 'i' } }).then((rentals) => {
        res.json(rentals)

    }).catch((err) => {
        console.log(err);
    })

})

router.route("/searchByToDate/:rDate").get((req, res) => {

    let val = req.params.rDate.trim();

    Rental.find({ to: { $regex: ".*" + val + ".*", $options: 'i' } }).then((rentals) => {
        res.json(rentals)

    }).catch((err) => {
        console.log(err);
    })

})

//to search only pending rental record 
router.route("/searchPendingRentalRecords").get((req, res) => {

    let val = "pending";

    Rental.find({ status: { $regex: ".*" + val + ".*", $options: 'i' } }).then((rentals) => {
        res.json(rentals)

    }).catch((err) => {
        console.log(err);
    })

})

router.route("/searchPendingCustomer/:nic").get((req, res) => {

    let val1 = "pending";
    let val = req.params.nic.trim();

    Rental.find({ status: { $regex: ".*" + val1 + ".*", $options: 'i' } }).then((rentals) => {

        if (rentals != null) {
            Rental.find({ customerNIC: { $regex: "^" + val + ".*", $options: 'i' } }).then((rentals) => {
                res.json(rentals);
            })
                .catch((err) => {
                    console.log(err);
                })
        }

    }).catch((err) => {
        console.log(err);
    })
})


module.exports = router;