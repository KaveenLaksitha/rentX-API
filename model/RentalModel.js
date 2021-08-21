const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rentalSchema = new Schema({

    id: {
        type: String,
        required: true,
        unique: true
    },

    from: {
        type: String,
        required: true
    },

    to: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Completed'],
        maxlength: 10,
        minlength: 7
    },

    payment: {
        type: String,
        required: true,
        enum: ['Cash payment', 'Card payment'],
        maxlength: 12,
        minlength: 12
    },

    vehicleType: {
        type: String,
        required: true,
        enum: ['Car', 'Van', 'Bus'],
        maxlength: 3,
        minlength: 3
    },

    model: {
        type: String,
        required: true,
    },

    pickAddress: {
        type: String,
        maxlength: 200
    },

    addPrice: {
        type: Number,

    },

    advPayment: {
        type: Number,
        required: true,
    },

    finalPrice: {
        type: Number,
        required: true,
    },

    customerName: {
        type: String,
        required: true,
        maxlength: 200

    },

    customerNIC: {
        type: String,
        required: true,

    },

    customerAdd: {
        type: String,
        maxlength: 200
    },

    contactNo: {
        type: Number,
        required: true,
        maxlength: 10,
        minlength: 10
    },

    NICcopy: {
        type: String,

    },
    penaltyDays: {
        type: Number,

    },

    penaltyCharges: {
        type: Number,
    },

    returnDate: {
        type: String,
    },

    lastPaid: {
        type: Number,
    },

})

const Rental = mongoose.model("Rental", rentalSchema);

module.exports = Rental;