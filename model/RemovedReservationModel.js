const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const removedrentalSchema = new Schema({

    reservationid : {
        type : String
    },
    
    customername : {
        type : String
    },

    contactnumber : {
        type : Number
    },


    customernic : {
        type : String
    },

    customeraddress : {
        type : String
    },

    packagename : {
        type : String
    },

    eventtype :{
        type : String
    },
    
    from : {
        type : String
    },

    to : {
        type : String
    },

    discount : {
        type : Number
    },
    advancedpayment : {
        type : Number
    },

    totalreservation : {
        type : Number
    },

    status : {
        type : String
    },

    penaltyDay: {
        type: Number

    },

    penaltyCharge: {
        type: Number
    },

    returnDay: {
        type: String
    }

})

const RemovedReservation = mongoose.model("RemovedReservation", removedrentalSchema);

module.exports = RemovedReservation;