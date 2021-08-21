const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const removeVehicleSchema = new Schema({


    OwnerName : {
        type : String,
        
    },

    OwnerNIC : {
        type : String,
        
    },

    TeleNo : {
        type : Number,
        
    },

    Address : {
        type : String,
        
    },

    

    Email : {
        type : String,
        
    },

    

    Date :{
        type : String,
       
    },



    VehicleID : {
        type : String,
        
    },

    VehicleRegNo : {
        type : String,
        
        
    },



    VehicleModel :{
        type : String,
        
    },

    VehicleType :{
        type : String,
        
    },

    VehicleBrand :{
        type : String,
        
    },

    Mileage : {
        type : Number,
        
    },

    
    InsType :{
        type : String,
        
    },

    InsComName :{
        type : String,
        
    },

    Transmission :{
        type : String,
        
    },

    

    AirC :{
        type : String,
        
    },

    NoOfSeats :{
        type : String,
        
    },

    RatePDay :{
        type : Number,
        
    },

    YearsRent :{
        type : String,
        
    },

    vehPic :{
        type : String,
        
    },

   vehDoc :{
        type : String,
        
    },




})

const RemovedVehicle = mongoose.model("RemoveVehicle",removeVehicleSchema);

module.exports = RemovedVehicle;
