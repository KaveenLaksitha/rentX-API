const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const vehicleSchema = new Schema({


    OwnerName: {
        type: String,

    },

    OwnerNIC: {
        type: String,

    },

    TeleNo: {
        type: Number,

    },

    Address: {
        type: String,

    },



    Email: {
        type: String,

    },



    Date: {
        type: String,

    },



    VehicleID: {
        type: String,

    },

    VehicleRegNo: {
        type: String,

        unique: true
    },



    VehicleModel: {
        type: String,

    },

    VehicleType: {
        type: String,

    },

    VehicleBrand: {
        type: String,

    },

    Mileage: {
        type: Number,

    },


    InsType: {
        type: String,

    },

    InsComName: {
        type: String,

    },

    Transmission: {
        type: String,

    },



    AirC: {
        type: String,

    },

    NoOfSeats: {
        type: String,

    },

    RatePDay: {
        type: Number,

    },

    YearsRent: {
        type: String,

    },

    vehPic: {

        type: String,

    },

    vehDoc: {
        type: String,

    },




})


// // Getter
// vehicleSchema.path('RatePDay').get(function(num) {
//     return (num / 100).toFixed(2);
//   });

//   // Setter
//   vehicleSchema.path('RatePDay').set(function(num) {
//     return ((num * 100)/100).toFixed(2);
//   });

const vehicle = mongoose.model("vehicle", vehicleSchema);

module.exports = vehicle;
