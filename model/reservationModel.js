const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reservationSchema = new Schema({

    reservationid : {
        type : String,
        required : true,
    },
    
    customername : {
        type : String,
        required : true
    },

    contactnumber : {
        type : Number,
        required : true,
    },

    nic : {
        type : String   
    },

    customernic : {
        type : String,
        unique : true,
    },

    customeraddress : {
        type : String,
        required : true
    },

    packagename : {
        type : String,
        required : true
    },

    eventtype :{
        type : String,
        require : true
    },
    
    from : {
        type : String,
        required : true
    },

    to : {
        type : String,
        required : true
    },

    discount : {
        type : Number,
        required : true
    },
    advancedpayment : {
        type : Number,
        required : true
    },

    totalreservation : {
        type : Number,
        required : true
    },

    status : {
        type : String,
        required : true
    }
})

const reservation = mongoose.model("reservations",reservationSchema);
module.exports = reservation;