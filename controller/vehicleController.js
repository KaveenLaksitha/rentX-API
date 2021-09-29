const router = require("express").Router();
let Vehicle = require("../model/vehicleModel");
const { v4: uuidv4 } = require("uuid");
const moment = require('moment');





//add vehicle

router.route("/addVehicle").post((req, res) => {

    const VehicleID = uuidv4();
    const OwnerName = req.body.OwnerName;
    const OwnerNIC = req.body.OwnerNIC;
    const TeleNo = req.body.TeleNo;
    const Address = req.body.Address;
    const Email = req.body.Email;
    const Date = moment(req.body.Date).format('YYYY-MM-DD');
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
        return res.status(400).send({ status: "Vehicle already exist!" });
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


//update vehicle
router.route("/updateV/:id").put(async(req,res)=>{


    let userId = req.params.id;
    console.log(userId);
    console.log("upt data", req.body);
    const {  VehicleID, 
        VehicleRegNo,
        VehicleModel,
        VehicleType,
        VehicleBrand,
        InsType,
        InsComName,
        Transmission,
        AirC,
        NoOfSeats,
        RatePDay,
        YearsRent} =req.body;

    //const data = req.body;
    //D structure
    const updateVehicle ={
         VehicleID, 
         VehicleRegNo,
         VehicleModel,
         VehicleType,
         VehicleBrand,
         InsType,
         InsComName,
         Transmission,
         AirC,
         NoOfSeats,
         RatePDay,
         YearsRent
    }

    const update = await Vehicle.findOneAndUpdate({VehicleID:userId},updateVehicle).then(()=>{

        res.status(200).send({status: "Vehicle Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status : "Errror with updating data"})
    })

    
})





//to search for the list of renting records on the current
router.route("/VehiclesAvailable").get((req, res) => {

    //let val = isMoment().format('YYYY-MMMM-DD');

    let car = "Car"
    let van = "Van"
    let bus = "Bus"

    Vehicle.count({ VehicleType: { $regex: "^" + car + ".*" } } + { VehicleType: { $regex: "^" + van + ".*" } } + { VehicleType: { $regex: "^" + bus + ".*" } }).then((vehicle) => {
        res.json(vehicle);

    })
        .catch((err) => {
            console.log(err);

        })

})
//To get the count of the pending records


//searh records
router.route("/searchV/:search").get(async(req,res)=>{
    let val = req.params.search.trim();
    let search = req.params.search;

    if(!isNaN(search)){
        if(search <11){

            try{
                const response = await Vehicle.find({YearsRent: { $regex:  val + '$', $options: 'i'}});
                console.log("search results" ,response);
                return res.status(200).send({status: "Success", data:response});
            }catch (error) {
    
                console.log("something went wrong!!");
                return{ok : flase};
    
            }
    

        }
        try{
            const response = await Vehicle.find({VehicleRegNo: { $regex: '.*' + val + '.*', $options: 'i'}});
            console.log("search results" ,response);
            return res.status(200).send({status: "Success", data:response});
        }catch (error) {

            console.log("something went wrong!!");
            return{ok : flase};

        }

    }else if(isNaN(search)){
        try{
            const response = await Vehicle.find({VehicleRegNo: { $regex: '.*' + val + '.*', $options: 'i'}});

            if(response.length>0){
                console.log("search results" ,response);
                 return res.status(200).send({status: "Success", data:response});
        }
            
        }catch (error) {

            console.log("something went wrong!!");
            return{ok : flase};

        }
        
    }

    try{
        const response = await Vehicle.find({VehicleType: { $regex: '.*' + val + '.*', $options: 'i'}});
        if(response.length > 0){
            return res.status(200).send({status: "Success", data:response});
        }
        else{
            try{
                const response = await Vehicle.find({VehicleModel: { $regex: '.*' + val + '.*', $options: 'i'}});
                if(response.length > 0){
                    return res.status(200).send({status: "Success", data:response});
                }else{
                    try{
                        const response = await Vehicle.find({VehicleBrand: { $regex: '.*' + val + '.*', $options: 'i'}});
                        return res.status(200).send({status: "Success", data:response});

                    }catch(err){
                        console.log("something went wrong!!");
                        return{ok : flase};


                    }
                }

            }catch(err){
                console.log("something went wrong!!");
                return{ok : flase};


            }
        }
        
    }catch (error) {

        console.log("something went wrong!!");
        return{ok : flase};

    }


    

})


//vehile report router

router.route("/reportV/:dateFrom/:dateTo/:Type/:Brand/:years").get(async(req,res)=>{

    const dateFrom = moment(req.params.dateFrom.trim()).format('YYYY-MM-DD');
    const dateTo = moment(req.params.dateTo.trim()).format('YYYY-MM-DD');
    const Type = req.params.Type;
    const Brand = req.params.Brand;
    const years = req.params.years;

    console.log("report function",dateFrom,dateTo,Type,Brand,years);

    

        Vehicle.find({
        $and :[{

            Date: { $gte: dateFrom , $lte: dateTo },
            VehicleType: { $regex: '^' + Type + '.*', $options: 'i'},
            VehicleBrand :{ $regex: '^' + Brand + '.*', $options: 'i'},
            YearsRent: { $regex: '^' + years + '.*', $options: 'i'},


        }]

    }).then((vehicles)=>{
            res.json(vehicles);
    }).catch((err)=>{
        console.log(err);
    })


    
})



module.exports = router;