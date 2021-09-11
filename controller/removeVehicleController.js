const router = require("express").Router();
let RemoveVehicle = require("../model/removeVehicleModel");


//add Removed vehicle

router.route("/addRemoveVehicle").post((req, res) => {

    console.log("incoming dataaaaaa", req.body)

    const VehicleID = req.body.data.VehicleID;
    const OwnerName = req.body.data.OwnerName;
    const OwnerNIC = req.body.data.OwnerNIC;
    const TeleNo = req.body.data.TeleNo;
    const Address = req.body.data.Address;
    const  Email = req.body.data.Email;
    const  Date = req.body.data.Date;
    const VehicleRegNo = req.body.data.VehicleRegNo;
    const VehicleModel = req.body.data.VehicleModel;
    const VehicleType = req.body.data.VehicleType;
    const VehicleBrand = req.body.data.VehicleBrand;
    const Mileage = req.body.data.Mileage;
    const InsType = req.body.data.InsType;
    const InsComName = req.body.data.InsComName;
    const RatePDay = req.body.data.RatePDay;
    const YearsRent = req.body.data.YearsRent;
 

    const newRemoveVehicle = new RemoveVehicle({

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
        RatePDay,
        YearsRent

    })

    

    newRemoveVehicle.save().then(()=>{
        console.log(req);
        res.json("Vehicle added");

    }).catch((err) => {
        console.log(err);
    })

})

//view data vehicle
router.route("/viewRemove").get((req, res) => {
    console.log("view all Remove");
    RemoveVehicle.find().then((Vehicles) => {
        //send data as json object
        res.json(Vehicles)
    }).catch((err) => {
        console.log(err)
    })
})


module.exports = router;
