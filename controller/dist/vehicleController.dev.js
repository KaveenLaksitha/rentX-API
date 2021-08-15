"use strict";

var router = require("express").Router();

var Vehicle = require("../model/vehicleModel");

var _require = require("uuid"),
    uuidv4 = _require.v4; //add vehicle


router.route("/addVehicle").post(function (req, res) {
  var VehicleID = uuidv4();
  var OwnerName = req.body.OwnerName;
  var OwnerNIC = req.body.OwnerNIC;
  var TeleNo = req.body.TeleNo;
  var Address = req.body.Address;
  var Email = req.body.Email;
  var VehicleRegNo = req.body.VehicleRegNo;
  var VehicleModel = req.body.VehicleModel;
  var VehicleType = req.body.VehicleType;
  var VehicleBrand = req.body.VehicleBrand;
  var Mileage = req.body.Mileage;
  var InsType = req.body.InsType;
  var InsComName = req.body.InsComName;
  var Transmission = req.body.Transmission;
  var AirC = req.body.AirC;
  var NoOfSeats = req.body.NoOfSeats;
  var RatePDay = req.body.RatePDay;
  var YearsRent = req.body.YearsRent;
  var vehPic = req.body.vehPic;
  var vehDoc = req.body.vehDoc;
  var newVehicle = new Vehicle({
    VehicleID: VehicleID,
    OwnerName: OwnerName,
    OwnerNIC: OwnerNIC,
    TeleNo: TeleNo,
    Address: Address,
    Email: Email,
    VehicleRegNo: VehicleRegNo,
    VehicleModel: VehicleModel,
    VehicleType: VehicleType,
    VehicleBrand: VehicleBrand,
    Mileage: Mileage,
    InsType: InsType,
    InsComName: InsComName,
    Transmission: Transmission,
    AirC: AirC,
    NoOfSeats: NoOfSeats,
    RatePDay: RatePDay,
    YearsRent: YearsRent,
    vehPic: vehPic,
    vehDoc: vehDoc
  });
  newVehicle.save().then(function () {
    res.json("Vehicle added");
  })["catch"](function (err) {
    console.log(err);
  });
}); //view data vehicle

router.route("/view").get(function (req, res) {
  console.log("view all");
  Vehicle.find().then(function (Vehicles) {
    res.json(Vehicles);
  })["catch"](function (err) {
    console.log(err);
  });
});
router.route("/searchPerDayRentalPrice/:vehicle/:model").get(function (req, res) {
  var val = req.params.vehicle.trim();
  var val1 = req.params.model.trim(); //{$regex: "^" + val + ".*"}this will get to the value starting at the begining of list 

  Vehicle.find({
    VehicleType: {
      $regex: ".*" + val + ".*",
      $options: 'i'
    }
  }).then(function (vehicles) {
    //res.json(rentals)
    if (vehicles != null) {
      Vehicle.findOne({
        VehicleModel: {
          $regex: "^" + val1 + ".*",
          $options: 'i'
        }
      }).then(function (vehicles) {
        res.json(vehicles.RatePDay);
      })["catch"](function (err) {
        console.log(err);
      });
    }
  })["catch"](function (err) {
    console.log(err);
  });
});
router.route("/searchVehicleModels/:vehicle").get(function (req, res) {
  var val = req.params.vehicle.trim(); //{$regex: ".*" + val + ".*"}this will get to the value anywhere in the list not just begining

  Vehicle.find({
    VehicleType: {
      $regex: ".*" + val + ".*",
      $options: 'i'
    }
  }).then(function (vehicle) {
    var length = vehicle.length;
    var values = "";

    for (var a = 0; a < vehicle.length; a++) {
      values += vehicle[a].VehicleModel + ",";
    }

    values = Array.from(new Set(values.split(','))).toString();
    res.json(values);
  })["catch"](function (err) {
    console.log(err);
  });
});
module.exports = router;
//# sourceMappingURL=vehicleController.dev.js.map
