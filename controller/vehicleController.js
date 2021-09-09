const router = require("express").Router();
let Vehicle = require("../model/vehicleModel");
const { v4: uuidv4 } = require("uuid");





//add vehicle

router.route("/addVehicle").post((req, res) => {

    const VehicleID = uuidv4();
    const OwnerName = req.body.OwnerName;
    const OwnerNIC = req.body.OwnerNIC;
    const TeleNo = req.body.TeleNo;
    const Address = req.body.Address;
    const Email = req.body.Email;
    const Date = req.body.Date;
    const VehicleRegNo = req.body.VehicleRegNo;
    const VehicleModel = req.body.VehicleModel;
    const VehicleType = req.body.VehicleType;
    const VehicleBrand = req.body.VehicleBrand;
    const Mileage = req.body.Mileage;
    const InsType = req.body.InsType;
    const InsComName = req.body.InsComName;
    const Transmission = req.body.Transmission;
    const AirC = req.body.AirC;
    const NoOfSeats = req.body.NoOfSeats;
    const RatePDay = req.body.RatePDay;
    const YearsRent = req.body.YearsRent;
    const vehPic = req.body.vehPic;
    const vehDoc = req.body.vehDoc;

    const newVehicle = new Vehicle({

        VehicleID,
        OwnerName,
        OwnerNIC,
        TeleNo,
        Address,
        Email,
        Date,
        VehicleRegNo,
        VehicleModel,
        VehicleType,
        VehicleBrand,
        Mileage,
        InsType,
        InsComName,
        Transmission,
        AirC,
        NoOfSeats,
        RatePDay,
        YearsRent,
        vehPic,
        vehDoc
    })


    newVehicle.save().then(() => {
        console.log(req);
        res.json("Vehicle added");

    }).catch((err) => {
        console.log(err);
    })

})

//view data vehicle
router.route("/view").get((req, res) => {
    console.log("view all");
    Vehicle.find().then((Vehicles) => {
        res.json(Vehicles)
    }).catch((err) => {
        console.log(err)
    })
})


router.route("/searchPerDayRentalPrice/:vehicle/:model").get((req, res) => {

    let val = req.params.vehicle.trim();
    let val1 = req.params.model.trim();


    //{$regex: "^" + val + ".*"}this will get to the value starting at the begining of list 
    Vehicle.find({ VehicleType: { $regex: ".*" + val + ".*", $options: 'i' } }).then((vehicles) => {
        //res.json(rentals)
        if (vehicles != null) {
            Vehicle.findOne({ VehicleModel: { $regex: "^" + val1 + ".*", $options: 'i' } }).then((vehicles) => {
                res.json(vehicles.RatePDay);

            })
                .catch((err) => {
                    console.log(err);

                })
        }

    }).catch((err) => {
        console.log(err);
    })


})

router.route("/searchVehicleModels/:vehicle").get((req, res) => {

    let val = req.params.vehicle.trim();

    //{$regex: ".*" + val + ".*"}this will get to the value anywhere in the list not just begining
    Vehicle.find({ VehicleType: { $regex: ".*" + val + ".*", $options: 'i' } }).then((vehicle) => {
        var length = vehicle.length;
        let values = "";
        for (var a = 0; a < vehicle.length; a++) {
            values += vehicle[a].VehicleModel + ",";
        }
        values = Array.from(new Set(values.split(','))).toString();
        res.json(values);

    }).catch((err) => {
        console.log(err);
    })

})



//router for delete an Vehicle record
router.post("/deleteV", async (req, res) => {
    const VehID = req.body.VehicleID;

    console.log(VehID, "<<<<<<<<<<<<<<<<deleteeeeeeee");

    if (VehID) {
        const response = await Vehicle.findOneAndDelete({ VehicleID: VehID }).then(() => {
            return res.status(200).send({ status: "Success" });
        }).catch((err) => {
            console.log(err);
            return res.status(500).send({ status: "Internal Server Error" });
        })
    }
    return res.status(400).send({ status: "Invalid Request" });

});






module.exports = router;